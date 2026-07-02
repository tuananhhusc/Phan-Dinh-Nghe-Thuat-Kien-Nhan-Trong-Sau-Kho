"use client";

import React, { useState, useEffect } from "react";

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");
  const [mounted, setMounted] = useState(false);

  function applyTheme(t: "light" | "dark") {
    setTheme(t);
    localStorage.setItem("theme", t);
    if (t === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  function applyFontSize(size: "sm" | "md" | "lg") {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
    document.documentElement.classList.remove("text-size-sm", "text-size-md", "text-size-lg");
    document.documentElement.classList.add(`text-size-${size}`);
  }

  function applyFontFamily(family: "serif" | "sans") {
    setFontFamily(family);
    localStorage.setItem("fontFamily", family);
    document.documentElement.classList.remove("font-family-serif", "font-family-sans");
    document.documentElement.classList.add(`font-family-${family}`);
  }

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    const savedSize = (localStorage.getItem("fontSize") as "sm" | "md" | "lg") || "md";
    const savedFamily = (localStorage.getItem("fontFamily") as "serif" | "sans") || "serif";

    // eslint-disable-next-line
    applyTheme(savedTheme);
    // eslint-disable-next-line
    applyFontSize(savedSize);
    // eslint-disable-next-line
    applyFontFamily(savedFamily);
    
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 settings-panel animate-fade-in-up">
      {isOpen && (
        <div className="absolute bottom-14 left-0 mb-2 w-64 bg-[var(--parchment)] border border-[rgba(212,175,55,0.3)] shadow-[var(--shadow-lg)] rounded-xl p-4 flex flex-col gap-4 text-[var(--charcoal)]" style={{ fontFamily: "var(--font-sans)" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--burgundy)] mb-1">Cài Đặt Đọc</h3>
          
          {/* Theme Toggle */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)] mb-2 block">Giao Diện</label>
            <div className="flex gap-2">
              <button onClick={() => applyTheme("light")} className={`flex-1 py-2 rounded-md text-sm border transition-colors ${theme === "light" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-[var(--burgundy)]" : "border-[rgba(212,175,55,0.3)] hover:bg-[rgba(114,47,55,0.05)]"}`}>Sáng</button>
              <button onClick={() => applyTheme("dark")} className={`flex-1 py-2 rounded-md text-sm border transition-colors ${theme === "dark" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-[var(--burgundy)]" : "border-[rgba(212,175,55,0.3)] hover:bg-[rgba(114,47,55,0.05)]"}`}>Tối</button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)] mb-2 block">Cỡ Chữ</label>
            <div className="flex gap-2">
              <button onClick={() => applyFontSize("sm")} className={`flex-1 py-1.5 text-sm border transition-colors rounded-md ${fontSize === "sm" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-transparent" : "border-[rgba(212,175,55,0.3)]"}`}>A-</button>
              <button onClick={() => applyFontSize("md")} className={`flex-1 py-1.5 text-base border transition-colors rounded-md ${fontSize === "md" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-transparent" : "border-[rgba(212,175,55,0.3)]"}`}>A</button>
              <button onClick={() => applyFontSize("lg")} className={`flex-1 py-1.5 text-lg border transition-colors rounded-md ${fontSize === "lg" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-transparent" : "border-[rgba(212,175,55,0.3)]"}`}>A+</button>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)] mb-2 block">Phông Chữ</label>
            <div className="flex gap-2">
              <button onClick={() => applyFontFamily("serif")} className={`flex-1 py-2 rounded-md text-sm border transition-colors font-serif ${fontFamily === "serif" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-transparent" : "border-[rgba(212,175,55,0.3)]"}`}>Lora</button>
              <button onClick={() => applyFontFamily("sans")} className={`flex-1 py-2 rounded-md text-sm border transition-colors font-sans ${fontFamily === "sans" ? "bg-[var(--burgundy)] text-[var(--parchment)] border-transparent" : "border-[rgba(212,175,55,0.3)]"}`}>Inter</button>
            </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--parchment)] border border-[rgba(212,175,55,0.3)] shadow-[var(--shadow-md)] text-[var(--burgundy)] hover:bg-[rgba(114,47,55,0.05)] transition-all"
        aria-label="Cài đặt đọc"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
    </div>
  );
}
