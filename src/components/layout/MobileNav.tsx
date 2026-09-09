"use client";

import { useState } from "react";
import Link from "next/link";
import type { CTA, NavItem } from "@/content/schemas/nav";

export function MobileNav({
  navItems,
  contactCta,
}: {
  navItems: NavItem[];
  contactCta: CTA;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="font-label text-xs uppercase tracking-wide text-text-primary"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 flex flex-col bg-canvas">
          <ul className="flex flex-1 flex-col items-start gap-6 px-5 pt-10">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl italic text-text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-10">
            <a
              href={contactCta.href}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-(--radius-pill-lg) bg-brand-orange px-6 py-3 text-center font-label text-xs font-medium text-on-orange"
            >
              {contactCta.label}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
