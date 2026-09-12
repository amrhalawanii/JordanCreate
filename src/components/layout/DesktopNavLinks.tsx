"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/schemas/nav";

const linkBase =
  "font-body text-xs font-normal leading-none tracking-normal uppercase whitespace-nowrap transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange";

export function DesktopNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex list-none items-center gap-6 p-0">
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.id} className="m-0">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`${linkBase} ${
                active ? "text-brand-orange" : "text-white hover:text-brand-orange"
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
