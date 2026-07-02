"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for mobile TOC toggle
  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-toc", handleToggle);
    return () => window.removeEventListener("toggle-mobile-toc", handleToggle);
  }, []);

  // Close mobile TOC on link click
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Pick the one closest to top
          const closest = visibleEntries.reduce((prev, curr) => {
            return prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr;
          });
          setActiveId(closest.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      closeMobile();
    }
  };

  const tocContent = (
    <nav aria-label="Mục lục bài viết">
      <div className="mb-4 px-4">
        <h2
          className="text-xs font-semibold uppercase tracking-widest text-[var(--gold-muted)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Mục Lục
        </h2>
        <div className="mt-2 h-[1px] bg-gradient-to-r from-[var(--gold)] via-[rgba(212,175,55,0.3)] to-transparent opacity-50" />
      </div>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`toc-link ${item.level >= 3 ? "sub" : ""} ${
                activeId === item.id ? "active" : ""
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="toc-sidebar hidden lg:block w-[280px] flex-shrink-0 pr-8 animate-slide-in">
        {tocContent}
      </aside>

      {/* Mobile Overlay */}
      <div
        className={`mobile-toc-overlay lg:hidden ${mobileOpen ? "open" : ""}`}
        onClick={closeMobile}
      />

      {/* Mobile Panel */}
      <div
        className={`mobile-toc-panel lg:hidden ${mobileOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-sm font-semibold uppercase tracking-widest text-[var(--burgundy)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Mục Lục
            </h2>
            <button
              onClick={closeMobile}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--burgundy)] transition-colors"
              aria-label="Đóng mục lục"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {tocContent}
        </div>
      </div>
    </>
  );
}
