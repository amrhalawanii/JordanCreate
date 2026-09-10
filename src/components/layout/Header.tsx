import Image from "next/image";
import Link from "next/link";
import { getDesktopNavItems, getMobileNavItems, getSiteSettings } from "@/content/repository";
import { MobileNav } from "./MobileNav";
import { GradientButton } from "@/components/shared/GradientButton";

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
                  className="font-body text-base leading-[1.2] tracking-[-0.64px] uppercase text-text-primary transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:text-brand-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <GradientButton href={settings.contactCta.href} className="px-6 py-2.5">
            {settings.contactCta.label}
          </GradientButton>
        </nav>

        <MobileNav navItems={mobileNavItems} contactCta={settings.contactCta} />
      </div>
    </header>
  );
}
