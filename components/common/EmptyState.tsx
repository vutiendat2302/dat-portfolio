interface EmptyStateProps {
  children: string;
}

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <p className="border-t border-border py-5 text-sm leading-6 text-subtle">
      {children}
    </p>
  );
}
