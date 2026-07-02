"use client";

import React from "react";

export default function CrossMotif({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cross-motif ${className}`}
      aria-hidden="true"
    >
      {/* Ornate Celtic-inspired cross */}
      <path
        d="M12 2 L12 10 M12 14 L12 22 M2 12 L10 12 M14 12 L22 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Center circle */}
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Small decorative dots at ends */}
      <circle cx="12" cy="2" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="22" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="2" cy="12" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="22" cy="12" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
