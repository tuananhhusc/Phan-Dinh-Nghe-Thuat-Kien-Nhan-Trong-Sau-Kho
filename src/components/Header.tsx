"use client";

import React, { useState, useEffect } from "react";
import CrossMotif from "./CrossMotif";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 text-[var(--gold-muted)] hover:text-[var(--burgundy)] transition-colors"
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-mobile-toc"))}
            aria-label="Toggle navigation"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Left decoration */}
          <div className="hidden sm:flex items-center gap-3">
            <CrossMotif size={20} />
            <div className="h-6 w-[1px] bg-[rgba(212,175,55,0.2)]" />
          </div>

          {/* Title */}
          <div className="flex-1 text-center">
            <h1
              className="font-[var(--font-heading)] text-base sm:text-lg tracking-wide text-[var(--charcoal)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-[var(--burgundy)] font-bold">
                Phân Định
              </span>
              <span className="hidden sm:inline text-[var(--gold-muted)] mx-2 opacity-60">
                ✦
              </span>
              <span className="hidden sm:inline text-[var(--text-secondary)] font-normal text-sm tracking-normal">
                Nghệ Thuật Kiên Nhẫn Trong Sầu Khổ
              </span>
            </h1>
          </div>

          {/* Right decoration */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="h-6 w-[1px] bg-[rgba(212,175,55,0.2)]" />
            <CrossMotif size={20} />
          </div>

          {/* Spacer for mobile */}
          <div className="w-10 lg:hidden" />
        </div>
      </div>
      <div className="header-divider" />
    </header>
  );
}
