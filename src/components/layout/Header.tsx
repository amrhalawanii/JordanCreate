import Image from "next/image";
import Link from "next/link";
import { getDesktopNavItems, getMobileNavItems, getSiteSettings } from "@/content/repository";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const [navItems, mobileNavItems, settings] = await Promise.all([
    getDesktopNavItems(),
    getMobileNavItems(),
    getSiteSettings(),
  ]);

  return (
    <header className="sticky top-0 z-50 w-full bg-canvas">
      <div className="mx-auto flex max-w-(--container-wide) items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" aria-label={settings.siteName} className="relative block h-9 w-32">
          <Image
            src="/assets/brand/logo.png"
            alt={settings.siteName}
            fill
            sizes="128px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="font-label text-xs uppercase tracking-wide text-text-primary transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:text-brand-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={settings.contactCta.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-(--radius-pill-lg) bg-brand-orange px-6 py-2.5 font-label text-xs font-medium text-on-orange transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:bg-brand-orange-hot"
          >
            {settings.contactCta.label}
          </a>
        </nav>

        <MobileNav navItems={mobileNavItems} contactCta={settings.contactCta} />
      </div>
    </header>
  );
}
