import { EmptyState } from "@/components/common/EmptyState";
import type { TimelineItem } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { formatPeriod } from "@/lib/formatDate";

interface TimelineListProps {
  items: TimelineItem[];
  emptyMessage: string;
  locale: Locale;
}

function resolveText(text: string | Record<Locale, string> | undefined, locale: Locale): string {
  if (!text) return "";
  if (typeof text === "string") return text;
  return text[locale] || text.vi || "";
}

export function TimelineList({ items, emptyMessage, locale }: TimelineListProps) {
  if (items.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <ol className="border-t border-border">
      {items.map((item, index) => {
        const itemLocation = resolveText(item.location, locale);

        return (
          <li
            key={`${item.organization[locale]}-${item.period}-${index}`}
            className="grid gap-3 border-b border-border py-8 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-10"
          >
            {/* Cột trái: Thời gian & Địa điểm */}
            <div className="space-y-1">
              <p className="font-mono text-xs font-medium text-subtle">
                {formatPeriod(item.period, locale)}
              </p>
              {itemLocation ? (
                <p className="text-xs text-muted flex items-center gap-1">
                  <span className="opacity-70">📍</span> {itemLocation}
                </p>
              ) : null}
            </div>

            {/* Cột phải: Chi tiết chức danh, tổ chức, dự án, công nghệ & gạch đầu dòng */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {item.title[locale]}
                </h3>
                {item.gpa ? (
                  <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent">
                    GPA: {item.gpa}
                  </span>
                ) : null}
              </div>

              <p className="text-sm font-medium text-muted">
                {item.organization[locale]}
              </p>

              {/* Dự án liên quan (nếu có) */}
              {item.projectName ? (
                <div className="rounded-lg border border-border/70 bg-surface-soft/40 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                      {locale === "vi" ? "Dự án:" : locale === "en" ? "Project:" : "專案:"}
                    </span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {item.projectName[locale]}
                    </span>
                    {item.projectUrl ? (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                      >
                        [GitHub ↗]
                      </a>
                    ) : null}
                  </div>

                  {/* Danh sách công nghệ sử dụng */}
                  {item.technologies && item.technologies.length > 0 ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-foreground/80 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Các kết quả / highlights cụ thể */}
                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{h[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}

              {/* Môn học liên quan trong học vấn */}
              {item.coursework ? (
                <div className="rounded-lg border border-border/70 bg-surface-soft/40 p-4 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                  <span className="font-semibold text-foreground">
                    {locale === "vi"
                      ? "Môn học tiêu biểu: "
                      : locale === "en"
                      ? "Key Coursework: "
                      : "核心修習課程："}
                  </span>
                  <span>
                    {typeof item.coursework === "string"
                      ? item.coursework
                      : item.coursework[locale]}
                  </span>
                </div>
              ) : null}

              {/* Mô tả tổng quan nếu không có project hay coursework */}
              {!item.projectName && !item.coursework && item.description ? (
                <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {item.description[locale]}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
