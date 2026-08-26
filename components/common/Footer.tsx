import { Container } from "@/components/common/Container";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8 text-sm text-slate-400">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getUTCFullYear()} {profile.name}. Built with Next.js.</p>
        <div className="flex flex-wrap gap-4">
          {profile.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
