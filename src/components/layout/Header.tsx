import Image from "next/image";
import Link from "next/link";
import { getDesktopNavItems, getMobileNavItems, getSiteSettings } from "@/content/repository";
import { MobileNav } from "./MobileNav";
import { DesktopNavLinks } from "./DesktopNavLinks";
import { GradientButton } from "@/components/shared/GradientButton";

/**
 * Matched to live jordancreate.com nav:
 * Desktop — logo | centered links | Contact us
 * Mobile  — logo | Menu (Contact lives inside the drawer)
 *
 * Desktop CTA is wrapped in `hidden lg:block` so GradientButton's
 * base `inline-flex` can't override display:none on small screens.
 */
export async function Header() {
  const [navItems, mobileNavItems, settings] = await Promise.all([
    getDesktopNavItems(),
    getMobileNavItems(),
    getSiteSettings(),
  ]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f0f0f]">
      <div className="mx-auto flex h-(--header-height) w-full max-w-[1920px] items-center px-5 md:px-10">
        <div className="flex min-w-0 flex-1 items-center">
          <Link
            href="/"
            aria-label={settings.siteName}
            className="relative block h-[36px] w-[120px] shrink-0 sm:h-[42px] sm:w-[142px]"
          >
            <Image
              src="/assets/brand/logo.png"
              alt={settings.siteName}
              fill
              sizes="142px"
              className="object-contain object-left"
              priority
            />
          </Link>
        </div>

        <nav
          className="hidden min-w-0 flex-none items-center justify-center lg:flex"
          aria-label="Primary"
        >
          <DesktopNavLinks items={navItems} />
        </nav>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <div className="hidden lg:block">
            <GradientButton
              href={settings.contactCta.href}
              className="h-9 border-0 px-3 py-3 text-xs font-normal leading-none"
            >
              {settings.contactCta.label}
            </GradientButton>
          </div>
          <MobileNav navItems={mobileNavItems} contactCta={settings.contactCta} />
        </div>
      </div>
    </header>
  );
}
