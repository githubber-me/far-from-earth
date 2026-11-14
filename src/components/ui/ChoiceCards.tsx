"use client";

import type { ReactNode } from "react";

export function ChoiceCard({
  title,
  desc,
  icon,
  onClick,
  active = false,
  disabled = false,
}: {
  title: string;
  desc?: string;
  icon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`choice-card ${active ? "choice-active" : ""}`}
    >
      {icon && <span className="choice-icon">{icon}</span>}
      <span className="choice-title">{title}</span>
      {desc && <span className="choice-desc">{desc}</span>}
    </button>
  );
}

export function ContinueButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="btn-continue">
      {label} <span aria-hidden="true">&#9654;</span>
    </button>
  );
}
