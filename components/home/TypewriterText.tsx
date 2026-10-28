"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface TypewriterTextProps {
  text: string;
  endIcon?: string;
  speed?: number;
  delay?: number;
  pauseBeforeRestart?: number;
  className?: string;
}

const emptySubscribe = () => () => {};

export function TypewriterText({
  text,
  endIcon,
  speed = 70,
  delay = 2000,
  pauseBeforeRestart = 500,
  className = "",
}: TypewriterTextProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const fullText = endIcon ? `${text}\u00A0${endIcon}` : text;
  const chars = Array.from(fullText);
  const totalChars = chars.length;

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!isMounted || !text) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setCharCount(totalChars);
      }, 0);
      return () => clearTimeout(timer);
    }

    let timer: NodeJS.Timeout;

    if (charCount < totalChars) {
      // Khi vừa xóa sạch (charCount === 0), chờ pauseBeforeRestart rồi mới bắt đầu gõ
      const nextDelay = charCount === 0 ? pauseBeforeRestart : speed;
      timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, nextDelay);
    } else {
      // Đã gõ xong toàn bộ: giữ nguyên hiển thị trong `delay` ms rồi xóa hết
      timer = setTimeout(() => {
        setCharCount(0);
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [charCount, totalChars, text, speed, delay, pauseBeforeRestart, isMounted]);

  if (!isMounted) {
    return (
      <span className={`inline ${className}`}>
        <span>{fullText}</span>
      </span>
    );
  }

  const displayText = chars.slice(0, charCount).join("");

  return (
    <span className={`inline ${className}`}>
      <span>{displayText}</span>
      <span
        className="inline-block w-[2.5px] h-[0.85em] ml-1 bg-accent align-middle motion-safe:animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
