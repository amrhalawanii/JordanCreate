"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="font-body text-base leading-[1.2] tracking-[-0.64px] uppercase text-text-primary"
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
            <GradientButton href={contactCta.href} className="w-full">
              {contactCta.label}
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  );
}
