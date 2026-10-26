import { simpleInterests } from "@/data/interests";
import type { Locale } from "@/i18n/config";

interface InterestListProps {
  locale: Locale;
}

export function InterestList({ locale }: InterestListProps) {
  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3">
      {simpleInterests.map((item) => (
        <span
          key={item.name[locale]}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-2xs transition-colors hover:border-accent hover:text-accent"
        >
          <span className="text-base select-none" aria-hidden="true">
            {item.emoji}
          </span>
          <span>{item.name[locale]}</span>
        </span>
      ))}
    </div>
  );
}
