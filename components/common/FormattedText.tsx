import React from "react";

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className }: FormattedTextProps) {
  if (!text.includes("[") || !text.includes("](") || !text.includes(")")) {
    return <span className={className}>{text}</span>;
  }

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  for (const match of text.matchAll(regex)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      elements.push(text.slice(lastIndex, matchIndex));
    }

    const label = match[1];
    const href = match[2];

    elements.push(
      <a
        key={`${href}-${matchIndex}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
      >
        {label}
      </a>
    );

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <span className={className}>{elements}</span>;
}
