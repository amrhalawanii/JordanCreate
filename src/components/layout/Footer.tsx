import Image from "next/image";
import Link from "next/link";
import { getFooterNavItems, getSiteSettings } from "@/content/repository";

export async function Footer() {
  const [navItems, settings] = await Promise.all([getFooterNavItems(), getSiteSettings()]);

  return (
    <footer className="w-full bg-canvas">
      <div className="mx-auto flex max-w-(--container-wide) flex-col gap-10 px-5 py-16 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="flex flex-col gap-4">
          <div className="relative h-9 w-32">
            <Image
              src="/assets/brand/logo.png"
              alt={settings.siteName}
              fill
              sizes="128px"
              className="object-contain object-left"
            />
          </div>
          <p className="max-w-xs font-label text-sm leading-[1.3] text-text-gray-muted">
            {settings.tagline}
          </p>
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-label text-sm leading-[1.3] text-text-gray-muted transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:text-brand-orange"
          >
            Instagram
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="font-label text-sm leading-[1.3] font-medium text-footer-nav-label">
            Navigation
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="font-label text-sm leading-[1.3] text-text-primary transition-colors duration-100 ease-[cubic-bezier(0,0,1,1)] hover:text-brand-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
