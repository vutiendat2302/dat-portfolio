"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/i18n/config";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface HeaderNavProps {
  items: NavItem[];
  locale: Locale;
  ariaLabel: string;
}

export function HeaderNav({ items, locale, ariaLabel }: HeaderNavProps) {
  const pathname = usePathname();

  function isItemActive(href: string): boolean {
    const homePath = `/${locale}`;

    // Trang chủ
    if (href === homePath || href === `${homePath}/`) {
      return pathname === homePath || pathname === `${homePath}/`;
    }

    // Hash link (ví dụ #contact)
    if (href.includes("#")) {
      return false;
    }

    // Các trang con (/projects, /blog, /about)
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
        {items.map((item) => {
          const active = isItemActive(item.href);

          if (item.external) {
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-all duration-200 hover:bg-surface-soft hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span>{item.label}</span>
                  <span
                    className="text-xs transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  active
                    ? "bg-accent-soft/80 font-semibold text-accent shadow-xs dark:bg-accent/15 dark:text-accent-hover"
                    : "text-muted hover:bg-surface-soft hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-2.5 -bottom-1 h-0.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
