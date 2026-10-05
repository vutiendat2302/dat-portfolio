import { EmptyState } from "@/components/common/EmptyState";
import type { SkillGroup } from "@/data/types";
import type { Locale } from "@/i18n/config";

interface SkillListProps {
  groups: SkillGroup[];
  locale: Locale;
  emptyMessage: string;
}

export function SkillList({ groups, locale, emptyMessage }: SkillListProps) {
  if (groups.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <div className="grid border-t border-border sm:grid-cols-2">
      {groups.map((group, index) => (
        <section
          key={group.category[locale]}
          className="border-b border-border py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
          aria-labelledby={`skill-${index}`}
        >
          <h3
            id={`skill-${index}`}
            className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-subtle"
          >
            {group.category[locale]}
          </h3>
          <p className="mt-3 leading-7 text-foreground">{group.skills.join(" · ")}</p>
        </section>
      ))}
    </div>
  );
}
