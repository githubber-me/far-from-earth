"use client";

import type { ReactNode } from "react";

export function SpaceScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`scene scene-space ${className}`}>
      <div className="stars-layer" aria-hidden="true" />
      {children}
    </div>
  );
}

export function MarsScene({
  children,
  storm = false,
  className = "",
}: {
  children: ReactNode;
  storm?: boolean;
  className?: string;
}) {
  return (
    <div className={`scene scene-mars ${storm ? "scene-storm" : ""} ${className}`}>
      <div className="mars-sun" aria-hidden="true" />
      <div className="mars-hills" aria-hidden="true" />
      <div className="mars-ground" aria-hidden="true" />
      {storm && (
        <>
          <div className="storm-flash" aria-hidden="true" />
          <div className="dust dust-1" aria-hidden="true" />
          <div className="dust dust-2" aria-hidden="true" />
          <div className="dust dust-3" aria-hidden="true" />
        </>
      )}
      {!storm && (
        <>
          <div className="dust dust-soft dust-1" aria-hidden="true" />
          <div className="dust dust-soft dust-2" aria-hidden="true" />
        </>
      )}
      {children}
    </div>
  );
}
