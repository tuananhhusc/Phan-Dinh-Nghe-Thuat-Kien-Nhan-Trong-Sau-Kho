import React from "react";
import CrossMotif from "./CrossMotif";

export default function Footer() {
  return (
    <footer className="site-footer relative z-10">
      {/* Golden divider at top */}
      <div className="golden-divider max-w-lg mx-auto px-8">
        <span className="golden-divider-icon">✦</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6">
          {/* Cross motif */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.3)]" />
            <CrossMotif size={28} />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.3)]" />
          </div>

          {/* Latin quote */}
          <blockquote
            className="italic text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;In omnibus respice finem.&rdquo;
            <br />
            <span className="text-xs text-[var(--gold-muted)] not-italic">
              — Trong mọi sự, hãy nhìn đến cùng đích
            </span>
          </blockquote>

          {/* Disclaimer */}
          <p
            className="text-xs text-[var(--text-secondary)] opacity-60 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Nội dung này chỉ mang tính chất tham khảo, nghiên cứu và suy niệm.
            Để được tư vấn y khoa hoặc chẩn đoán chuyên môn, xin tham khảo ý
            kiến chuyên gia.
          </p>

          {/* Bottom decoration */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <span className="text-[var(--gold-muted)] opacity-40 text-[10px]">
              ✦
            </span>
            <span className="text-[var(--gold-muted)] opacity-20 text-[8px]">
              ✦
            </span>
            <span className="text-[var(--gold-muted)] opacity-40 text-[10px]">
              ✦
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
