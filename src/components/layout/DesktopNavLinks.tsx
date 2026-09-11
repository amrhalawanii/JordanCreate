"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/schemas/nav";

const linkBase =
  "font-body text-base leading-[1.2] tracking-[-0.64px] uppercase transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange";

export function DesktopNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6 xl:gap-8">
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`${linkBase} ${
                active ? "text-brand-orange" : "text-text-primary hover:text-brand-orange"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
