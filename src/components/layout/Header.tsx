import Image from "next/image";
import Link from "next/link";
import { getDesktopNavItems, getMobileNavItems, getSiteSettings } from "@/content/repository";
import { MobileNav } from "./MobileNav";
import { DesktopNavLinks } from "./DesktopNavLinks";
import { GradientButton } from "@/components/shared/GradientButton";

export async function Header() {
  const [navItems, mobileNavItems, settings] = await Promise.all([
    getDesktopNavItems(),
    getMobileNavItems(),
    getSiteSettings(),
  ]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-(--header-height) max-w-(--container-wide) items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          aria-label={settings.siteName}
          className="relative block h-9 w-32 shrink-0 rounded-(--radius-default)"
        >
          <Image
            src="/assets/brand/logo.png"
            alt={settings.siteName}
            fill
            sizes="128px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
          <DesktopNavLinks items={navItems} />
          <GradientButton href={settings.contactCta.href} className="px-6 py-2.5">
            {settings.contactCta.label}
          </GradientButton>
        </nav>

        <MobileNav navItems={mobileNavItems} contactCta={settings.contactCta} />
      </div>
    </header>
  );
}
