import type { CSSProperties } from "react";

export function IconBolt({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

export function IconAir({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M3 9h9a3 3 0 1 0-3-3M3 13h14a3 3 0 1 1-3 3M3 17h7" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconLeaf({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M5 20c0-9 5-14 15-15-1 10-6 15-15 15zm2-2c2-2 3-4 5-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconDose({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 3a9 9 0 0 1 7.8 4.5l-4.1 2.4a3.5 3.5 0 0 0-3.7-1.5zM4.2 7.5A9 9 0 0 0 3 16.8l4.1-2.4a3.5 3.5 0 0 0-1-3.6zM16.7 20.2a9 9 0 0 0 4.9-3.6l-4.1-2.4a3.5 3.5 0 0 0-1.7 3.6z" />
    </svg>
  );
}
