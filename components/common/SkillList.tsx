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
    <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, index) => (
        <section
          key={group.category[locale]}
          className="border-b border-border py-6 sm:pr-8 sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:pl-8 lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(2n)]:pl-0 lg:border-r lg:last:border-r-0 lg:px-6 lg:first:pl-0"
          aria-labelledby={`skill-${index}`}
        >
          <h3
            id={`skill-${index}`}
            className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-subtle"
          >
            {group.category[locale]}
          </h3>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs font-medium text-foreground transition-all duration-150 hover:border-accent hover:text-accent sm:text-[13px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
