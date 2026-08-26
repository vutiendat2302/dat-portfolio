interface EmptyStateProps {
  children: string;
}

export function EmptyState({ children }: EmptyStateProps) {
  return (
    <p className="rounded-2xl border border-dashed border-white/15 bg-white/2 px-6 py-8 text-sm leading-6 text-slate-400">
      {children}
    </p>
  );
}
