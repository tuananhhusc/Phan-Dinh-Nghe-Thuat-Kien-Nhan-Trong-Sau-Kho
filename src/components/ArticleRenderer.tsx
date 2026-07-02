"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import Tooltip from "./Tooltip";
import type { ReferenceEntry } from "@/lib/parseContent";

interface ArticleRendererProps {
  content: string;
  references?: ReferenceEntry[];
}

const BlockquoteWithCopy = ({ children, ...props }: React.ComponentPropsWithoutRef<'blockquote'>) => {
  const [copied, setCopied] = useState(false);
  const text = extractText(children);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group my-6">
      <blockquote {...props}>{children}</blockquote>
      <button 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity bg-[var(--parchment)] border border-[rgba(212,175,55,0.3)] text-[var(--burgundy)] p-1.5 rounded-md shadow-sm hover:bg-[rgba(114,47,55,0.05)] print:hidden"
        title={copied ? "Đã sao chép!" : "Sao chép trích dẫn"}
        onClick={handleCopy}
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
    </div>
  );
};



export default function ArticleRenderer({ content, references = [] }: ArticleRendererProps) {
  const components: Components = {
    h1: ({ children, ...props }) => {
      const id = generateId(children);
      return (
        <h1 id={id} {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }) => {
      const id = generateId(children);
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = generateId(children);
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto">
        <table {...props}>{children}</table>
      </div>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    sup: ({ children, className, ...props }) => {
      if (className === "footnote-ref") {
        const refIndex = parseInt(children?.toString() || "0", 10) - 1;
        const ref = references[refIndex];
        if (ref) {
          return (
            <Tooltip content={ref.title}>
              <sup className={className} {...props}>
                {children}
              </sup>
            </Tooltip>
          );
        }
      }
      return <sup className={className} {...props}>{children}</sup>;
    },
    blockquote: BlockquoteWithCopy,
  };

  return (
    <div className="article-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]} 
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function generateId(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node) && node.props) {
    return extractText(
      (node.props as { children?: React.ReactNode }).children
    );
  }
  return "";
}
