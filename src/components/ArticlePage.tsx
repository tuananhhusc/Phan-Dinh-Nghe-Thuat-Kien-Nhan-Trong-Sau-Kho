"use client";

import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TableOfContents from "./TableOfContents";
import ArticleRenderer from "./ArticleRenderer";
import ReadingProgress from "./ReadingProgress";
import BackToTop from "./BackToTop";
import CrossMotif from "./CrossMotif";
import SettingsPanel from "./SettingsPanel";
import type { ParsedArticle } from "@/lib/parseContent";

interface ArticlePageProps {
  parsed: ParsedArticle;
}

export default function ArticlePage({ parsed }: ArticlePageProps) {
  const { tocItems, articleBody, references } = parsed;
  const articleRef = useRef<HTMLDivElement>(null);

  // Apply drop cap to the first paragraph after the first heading
  useEffect(() => {
    if (articleRef.current) {
      // Find the first <p> tag inside the article content
      const firstH2 = articleRef.current.querySelector(
        ".article-content h2"
      );
      if (firstH2) {
        // Get the first <p> sibling after the first h2
        let sibling = firstH2.nextElementSibling;
        while (sibling) {
          if (sibling.tagName === "P") {
            sibling.classList.add("drop-cap");
            break;
          }
          sibling = sibling.nextElementSibling;
        }
      }
    }
  }, []);

  return (
    <>
      <ReadingProgress />
      <Header />

      <main className="relative z-10 flex-1">
        {/* Hero / Title Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center animate-fade-in-up">
          {/* Decorative cross */}
          <div className="flex justify-center mb-6">
            <CrossMotif size={32} />
          </div>

          {/* Category label */}
          <div className="mb-4">
            <span
              className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--burgundy)] bg-[rgba(114,47,55,0.06)] rounded-full border border-[rgba(114,47,55,0.1)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Báo Cáo Phân Tích Chuyên Sâu
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold leading-tight text-[var(--charcoal)] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-[var(--burgundy)]">Phân Định</span>
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-[2rem] font-normal text-[var(--charcoal-light)]">
              &ldquo;Khi Mọi Thứ Chùng Xuống&rdquo;
            </span>
          </h1>

          <p
            className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Nghệ Thuật Kiên Nhẫn Trong Sầu Khổ
          </p>

          {/* Golden ornament */}
          <div className="golden-divider max-w-xs mx-auto mt-8">
            <span className="golden-divider-icon">✦</span>
          </div>
        </section>

        {/* Content Area with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex gap-8 lg:gap-12">
            {/* Sidebar / TOC */}
            <TableOfContents items={tocItems} />

            {/* Main Article */}
            <article
              ref={articleRef}
              className="flex-1 max-w-3xl animate-fade-in-up delay-200"
              style={{ animationFillMode: "backwards" }}
            >


              {/* Main article body */}
              <ArticleRenderer content={articleBody} references={references} />

              {/* References Section */}
              {references.length > 0 && (
                <section className="references-section animate-fade-in">
                  <h2
                    id="nguon-trich-dan"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Nguồn Trích Dẫn
                  </h2>
                  <div className="space-y-2">
                    {references.map((ref, index) => (
                      <div key={index} className="reference-item">
                        <span
                          className="text-[var(--gold-muted)] font-semibold flex-shrink-0 w-8 text-right"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          [{index + 1}]
                        </span>
                        <div>
                          <span className="text-[var(--charcoal-light)]">
                            {ref.title}
                          </span>
                          <br />
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ref.url}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
      <SettingsPanel />
    </>
  );
}
