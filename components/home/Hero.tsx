import Link from "next/link";

import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute left-1/2 top-8 -z-10 size-96 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />
      <div className="max-w-4xl">
        <p className="mb-6 flex items-center gap-3 font-mono text-sm text-accent">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_18px_var(--color-accent)]" />
          {profile.role}
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
          Xin chào, mình là {profile.name}.
          <span className="block text-slate-500">Mình biến ý tưởng thành sản phẩm.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
          {profile.introduction}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Xem dự án
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Đọc bài viết
          </Link>
        </div>
      </div>
    </section>
  );
}
