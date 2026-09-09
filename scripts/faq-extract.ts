/**
 * Standalone pass to capture the 8 FAQ accordion answers verbatim.
 * The answers are not present in the initial DOM at all — Framer mounts them
 * lazily on first expand — so each row must be clicked and given time to render.
 */
import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const QUESTIONS = [
  "What is Jordan Create?",
  "Who should attend Jordan Create?",
  "What happens at Jordan Create?",
  "Is Jordan Create only for big creators?",
  "What are the three tracks at Jordan Create?",
  "Who speaks at Jordan Create?",
  "Who founded Jordan Create?",
  "What makes Jordan Create different from other events?",
];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } } as any);
  await page.goto("https://www.jordancreate.com/", { waitUntil: "networkidle" });

  // Scroll to the FAQ section (identified by its eyebrow label) so everything
  // is mounted/in-viewport before we start clicking.
  const faqEyebrow = page.locator("text=Your questions, answered with clarity").first();
  await faqEyebrow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const results: { question: string; answer: string }[] = [];

  for (const q of QUESTIONS) {
    // FAQ questions are unique within the FAQ section, but "What is Jordan Create?"
    // also appears in the "Get to know us" tab panel earlier on the page — so scope
    // to elements below the FAQ eyebrow's bounding box.
    const eyebrowBox = await faqEyebrow.boundingBox();
    const candidates = page.locator(`p:text-is("${q}")`);
    const count = await candidates.count();
    let target = candidates.first();
    if (count > 1 && eyebrowBox) {
      for (let i = 0; i < count; i++) {
        const box = await candidates.nth(i).boundingBox();
        if (box && box.y >= eyebrowBox.y - 50) {
          target = candidates.nth(i);
          break;
        }
      }
    }

    await target.scrollIntoViewIfNeeded();
    await target.click({ timeout: 5000 });
    await page.waitForTimeout(700);

    // Walk up from the question paragraph to the row wrapper and read its full text,
    // then strip the leading question to leave just the answer.
    const rowText = await target.evaluate((p) => {
      let node: HTMLElement | null = p as HTMLElement;
      for (let i = 0; i < 3 && node; i++) node = node.parentElement;
      return node ? (node.textContent || "").trim() : "";
    });
    const answer = rowText.startsWith(q) ? rowText.slice(q.length).trim() : rowText;
    results.push({ question: q, answer });
    console.log(`${q} -> ${answer ? answer.slice(0, 60) + "..." : "(EMPTY — capture failed)"}`);
  }

  const outDir = path.resolve(__dirname, "..", "reference");
  await writeFile(
    path.join(outDir, "faq-answers.json"),
    JSON.stringify(results, null, 2),
    "utf-8"
  );

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
