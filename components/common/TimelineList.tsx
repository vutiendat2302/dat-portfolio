import { EmptyState } from "@/components/common/EmptyState";
import type { TimelineItem } from "@/data/types";
import type { Locale } from "@/i18n/config";

interface TimelineListProps {
  items: TimelineItem[];
  emptyMessage: string;
  locale: Locale;
}

export function TimelineList({ items, emptyMessage, locale }: TimelineListProps) {
  if (items.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <ol className="border-t border-border">
      {items.map((item) => (
        <li
          key={`${item.organization[locale]}-${item.period}`}
          className="grid gap-3 border-b border-border py-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
        >
          <p className="font-mono text-xs text-subtle">{item.period}</p>
          <div>
            <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title[locale]}</h3>
            <p className="mt-1 text-sm text-muted">{item.organization[locale]}</p>
            {item.description ? (
              <p className="mt-3 max-w-2xl leading-7 text-muted">{item.description[locale]}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
