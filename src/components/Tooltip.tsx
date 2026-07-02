"use client";

import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => {
        e.preventDefault();
        setIsVisible(!isVisible);
      }}
    >
      {children}
      {isVisible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[var(--charcoal)] text-[var(--parchment)] text-sm rounded-lg shadow-[var(--shadow-lg)] animate-fade-in pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-[var(--charcoal)]" style={{ fontFamily: "var(--font-sans)", lineHeight: 1.4 }}>
          {content}
        </span>
      )}
    </span>
  );
}
