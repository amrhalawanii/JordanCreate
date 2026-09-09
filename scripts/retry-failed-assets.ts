import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const FAILED = [
  "https://framerusercontent.com/images/zSxlmbV4CfKAtWie7i4lG8YHE.png",
  "https://framerusercontent.com/images/bgSX5j7K3RbAtwo938Dup13Tc.png",
  "https://framerusercontent.com/images/5oS4YsfHfzxsJ9TUYMzZJUDeNo.png",
  "https://framerusercontent.com/images/Heq2IQzze6yL0wg2Eom9lgO00.png",
  "https://framerusercontent.com/images/rY0NBeriVq0sX0DQD8ioTHh1P0.png",
  "https://framerusercontent.com/images/DlZDtpZ7vcLi5jv5E4ME2WP5xas.png",
  "https://framerusercontent.com/images/cS0dIRVM2o58yES3Excy9TST8HY.png",
  "https://framerusercontent.com/images/vouzEpwg0RDB0ILpFJX25uWa4.png",
  "https://framerusercontent.com/images/xc1PsIOzeRAwiIZbbVD57ghR0A.png",
  "https://framerusercontent.com/images/5YqxM3QnXjSVMKXcWdqHVzGKM.png",
  "https://framerusercontent.com/images/uHPAtmKE7EscXfHcrprRfvaT5pk.png",
];

const OUT_DIR = path.resolve(__dirname, "..", "reference", "assets-original", "images");

async function downloadWithRetry(url: string, attempts = 5): Promise<Buffer> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      lastErr = e;
      console.log(`  attempt ${i + 1} failed for ${url}: ${(e as Error).message}`);
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
  throw lastErr;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let ok = 0;
  const stillFailed: string[] = [];
  for (const url of FAILED) {
    const filename = url.split("/").pop()!;
    try {
      const buf = await downloadWithRetry(url);
      await writeFile(path.join(OUT_DIR, filename), buf);
      console.log(`OK: ${filename} (${(buf.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`GAVE UP: ${filename} -> ${(e as Error).message}`);
      stillFailed.push(url);
    }
  }
  console.log(`\nRetried ${FAILED.length}, recovered ${ok}, still failing: ${stillFailed.length}`);
  if (stillFailed.length) console.log(JSON.stringify(stillFailed, null, 2));
}

main();
