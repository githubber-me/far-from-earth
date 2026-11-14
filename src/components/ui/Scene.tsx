"use client";

import type { ReactNode } from "react";

export function SpaceScene({
  children,
  className = "",
  bg,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <div className={`scene scene-space ${className}`}>
      {bg ? (
        <div
          className="scene-bg"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden="true"
        />
      ) : (
        <div className="stars-layer" aria-hidden="true" />
      )}
      {bg && <div className="scene-scrim" aria-hidden="true" />}
      {children}
    </div>
  );
}

export function MarsScene({
  children,
  storm = false,
  className = "",
  bg,
}: {
  children: ReactNode;
  storm?: boolean;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      className={`scene scene-mars ${storm ? "scene-storm" : ""} ${className}`}
    >
      {bg && (
        <div
          className="scene-bg"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden="true"
        />
      )}
      {!bg && <div className="mars-sun" aria-hidden="true" />}
      {!bg && <div className="mars-hills" aria-hidden="true" />}
      {!bg && <div className="mars-ground" aria-hidden="true" />}
      {bg && <div className="scene-scrim" aria-hidden="true" />}
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
