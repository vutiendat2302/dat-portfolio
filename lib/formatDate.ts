const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}
