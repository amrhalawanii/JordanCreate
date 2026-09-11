"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { CTA, NavItem } from "@/content/schemas/nav";
import { GradientButton } from "@/components/shared/GradientButton";

export function MobileNav({
  navItems,
  contactCta,
}: {
  navItems: NavItem[];
  contactCta: CTA;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)
        : [];

    // Move focus into the dialog once it mounts.
    requestAnimationFrame(() => {
      focusables()[0]?.focus();
    });

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-(--radius-default) font-body text-base leading-[1.2] tracking-[-0.64px] uppercase text-text-primary transition-colors duration-100 hover:text-brand-orange"
      >
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0, 0, 1, 1] }}
            className="fixed inset-x-0 bottom-0 top-(--header-height) z-40 flex flex-col border-t border-border-subtle bg-canvas"
          >
            <ul className="flex flex-1 flex-col items-start gap-5 overflow-y-auto px-5 pt-10 pb-6 sm:gap-6">
              {navItems.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <motion.li
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      delay: reduceMotion ? 0 : 0.05 + i * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`font-display text-3xl italic transition-colors duration-150 sm:text-4xl ${
                        active ? "text-brand-orange" : "text-text-primary hover:text-brand-orange"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="border-t border-border-subtle px-5 py-8">
              <GradientButton href={contactCta.href} className="w-full">
                {contactCta.label}
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
