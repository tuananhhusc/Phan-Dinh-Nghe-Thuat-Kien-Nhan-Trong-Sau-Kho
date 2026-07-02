import fs from "fs";
import path from "path";
import { parseArticleContent } from "@/lib/parseContent";
import ArticlePage from "@/components/ArticlePage";

export default function Home() {
  // Read the markdown file at build time (Server Component)
  const filePath = path.join(process.cwd(), "src", "content", "article.md");
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = parseArticleContent(rawContent);

  return <ArticlePage parsed={parsed} />;
}
