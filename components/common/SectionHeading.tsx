interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  level?: 1 | 2;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="max-w-3xl">
      <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-subtle sm:text-xs">
        {eyebrow}
      </p>
      <Heading className="text-balance text-3xl font-medium tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
