import Link from "next/link";

import { Container } from "@/components/common/Container";
import { profile } from "@/data/profile";

const navigation = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Dự án", href: "/projects" },
  { label: "Bài viết", href: "/blog" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink/85 backdrop-blur-xl">
      <Container className="flex min-h-18 items-center justify-between gap-6 py-3">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label="Về trang chủ"
        >
          <span className="grid size-9 place-items-center rounded-xl border border-accent/35 bg-accent/10 font-mono text-sm font-semibold text-accent transition group-hover:bg-accent/15">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-white sm:inline">
            {profile.name}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <nav aria-label="Điều hướng chính">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-slate-300 sm:gap-x-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
