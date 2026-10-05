interface LocaleTemplateProps {
  children: React.ReactNode;
}

export default function LocaleTemplate({ children }: LocaleTemplateProps) {
  return <div className="page-enter">{children}</div>;
}
