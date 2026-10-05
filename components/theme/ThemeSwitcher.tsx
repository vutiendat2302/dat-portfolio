"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

interface ThemeSwitcherProps {
  labels: {
    label: string;
    light: string;
    dark: string;
    system: string;
  };
  compact?: boolean;
}

const themeValues = ["light", "dark", "system"] as const;
const subscribe = () => () => undefined;

export function ThemeSwitcher({ labels, compact = false }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const currentTheme = mounted && themeValues.some((value) => value === theme)
    ? theme
    : "system";
  const currentThemeLabel = currentTheme === "light"
    ? labels.light
    : currentTheme === "dark"
      ? labels.dark
      : labels.system;

  return (
    <label className={compact ? "block" : "grid gap-2"}>
      <span className={compact ? "sr-only" : "text-xs font-medium text-muted"}>
        {labels.label}
      </span>
      <select
        value={currentTheme}
        onChange={(event) => setTheme(event.target.value)}
        disabled={!mounted}
        aria-label={`${labels.label}: ${currentThemeLabel}`}
        className="h-11 min-w-24 rounded-md border border-border bg-surface px-3 text-sm text-foreground transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 md:h-9 md:min-w-20 md:text-xs"
      >
        <option value="light">☀ {labels.light}</option>
        <option value="dark">☾ {labels.dark}</option>
        <option value="system">◐ {labels.system}</option>
      </select>
    </label>
  );
}
