import Link from "next/link";

import { Container } from "@/components/common/Container";

export default function NotFoundPage() {
  return (
    <Container className="grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="font-mono text-sm text-accent">404 / NOT_FOUND</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Không tìm thấy trang
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-slate-400">
          Đường dẫn này không tồn tại hoặc nội dung chưa được xuất bản.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-bright focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Về trang chủ
        </Link>
      </div>
    </Container>
  );
}
