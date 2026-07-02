import type { TocItem } from "@/components/TableOfContents";

/**
 * Parse the raw markdown content to extract the Table of Contents entries,
 * the main article body, and the reference/footnote entries.
 */
export interface ParsedArticle {
  title: string;
  tocItems: TocItem[];
  articleBody: string;
  references: ReferenceEntry[];
}

export interface ReferenceEntry {
  title: string;
  url: string;
}

// Known table structures in the document:
// Table 1: lines with headers "Tiêu chí", "An ủi thiêng liêng", "Sầu khổ thiêng liêng"
// followed by paired rows of criteria
// Table 2: lines with headers "Vấn đề", "Góc nhìn nhận thức", "Phương pháp thực hành"
// followed by triplet rows

const TABLE_1_HEADERS = ["Tiêu chí", "An ủi thiêng liêng (Consolation)", "Sầu khổ thiêng liêng (Desolation)"];
const TABLE_1_ROWS = [
  ["Chiều hướng di chuyển", "Hướng thượng (xuyên việt); linh hồn bị thu hút bởi các giá trị thiêng liêng, tình yêu siêu việt và khao khát sống trọn vẹn⁶", "Hướng hạ (quy ngã); linh hồn bị lôi kéo vào những đam mê trần tục, ích kỷ, và những lo âu tủn mủn⁶"],
  ["Trạng thái cảm xúc", "Bình an, niềm vui nội tâm sâu sắc, cảm nhận được tình yêu thương, đôi khi rơi lệ vì lòng cảm mến hay sự ăn năn êm ái⁸", "Tối tăm, bồn chồn, hoang mang, buồn bã, cô độc, khô khan và uể oải⁷"],
  ["Đức tin và Hy vọng", "Gia tăng lòng tin, sự cậy trông và đức mến; mọi sự kiện đều được nhìn dưới lăng kính ân sủng và sự quan phòng⁶", "Đánh mất niềm tin, rơi vào tuyệt vọng, nghi ngờ đường lối của bản thân và của Thiên Chúa; cảm thấy Thiên Chúa vắng mặt⁷"],
  ["Hành động hệ quả", "Thúc đẩy sự khao khát cống hiến, phục vụ tha nhân, quên mình và dấn thân vào các cam kết⁶", "Lười biếng, uể oải, muốn từ bỏ các cam kết đã định, tập trung vào sự thương hại bản thân (self-pity)⁷"],
];

const TABLE_2_HEADERS = ["Vấn đề", "Góc nhìn nhận thức", "Phương pháp thực hành (Tổng hợp)"];
const TABLE_2_ROWS = [
  [
    "Bế tắc trong các mối quan hệ / Hôn nhân",
    "Cảm giác khô khan, chán nản (sầu khổ) thường đẩy ta đến quyết định chia tay bốc đồng. Cần phân định giữa \"bình an đích thực\" và \"cảm xúc lo âu nhất thời\"⁴³",
    "**Quy tắc 5 & Stockdale:** Tuyệt đối không đưa ra quyết định chia tay lúc tâm trí bất ổn. Chấp nhận thực tại mâu thuẫn, giữ vững cam kết và chờ đợi sương mù tan đi⁸"
  ],
  [
    "Cạn kiệt năng lượng (Burnout) trong công việc",
    "Áp lực công việc khiến tâm hồn trở nên uể oải, phàn nàn triền miên. Đây là dấu hiệu của việc đánh mất ước muốn sâu xa, để cho các ngẫu tượng (tiền tài, danh vọng) kiểm soát¹¹",
    "**Maitri & Examen:** Dành thời gian thinh lặng (Phút hồi tâm) để đọc lại cảm xúc trong ngày. Tử tế với sự mệt mỏi của bản thân, không tự phán xét¹⁷"
  ],
  [
    "Đau khổ vì mất mát, biến cố cá nhân",
    "Nỗi sợ hãi và cảm giác thế giới sụp đổ. Xu hướng tự nhiên là đóng kín lòng mình, trốn tránh thực tại¹³",
    "**Agere Contra & Tonglen:** Chủ động đối diện với nỗi đau (\"tựa vào điểm sắc nhọn\"). Chuyển hóa đau khổ bằng cách phục vụ người khác, hít vào đau khổ chung và thở ra bình an¹⁹"
  ],
];

export function parseArticleContent(rawContent: string): ParsedArticle {
  const lines = rawContent.split("\n").map(l => l.replace(/\r$/, ""));

  // First line is the main title
  const title = lines[0]?.replace(/^#+\s*/, "").trim() || "";

  // Find where references start
  let referencesStartIndex = lines.length;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === "Nguồn trích dẫn") {
      referencesStartIndex = i;
      break;
    }
  }

  // Find disclaimer line
  let disclaimerIndex = referencesStartIndex;
  for (let i = referencesStartIndex - 1; i >= 0; i--) {
    const trimmed = lines[i].trim();
    if (
      trimmed.startsWith("This is for informational purposes") ||
      trimmed === ""
    ) {
      disclaimerIndex = i;
    } else {
      break;
    }
  }

  // Extract references
  const references: ReferenceEntry[] = [];
  for (let i = referencesStartIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const urlMatch = line.match(/^(.+?),?\s*(https?:\/\/\S+)\s*$/);
    if (urlMatch) {
      references.push({
        title: urlMatch[1].trim().replace(/,\s*$/, ""),
        url: urlMatch[2].trim(),
      });
    }
  }

  // Build the article body
  const bodyLines = lines.slice(1, disclaimerIndex); // Skip line 0 (title)
  const transformedBody = buildArticleBody(bodyLines);

  const articleBody = transformedBody;

  // Extract TOC items
  const tocItems = extractTocItems(articleBody);

  return {
    title,
    tocItems,
    articleBody,
    references,
  };
}

/**
 * Transform the raw body lines into proper markdown.
 * Handles: section headers, subsection headers, and the two known tables.
 */
function buildArticleBody(lines: string[]): string {
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    // Detect Table 1: starts with "Tiêu chí" on its own line
    if (trimmed === "Tiêu chí") {
      result.push("");
      result.push(buildMarkdownTable(TABLE_1_HEADERS, TABLE_1_ROWS));
      result.push("");
      // Skip all lines belonging to this table (through "Lười biếng..." line ending with a number + period pattern)
      i = skipTableLines(lines, i, "Hành động hệ quả");
      continue;
    }

    // Detect Table 2: starts with "Vấn đề" on its own line
    if (trimmed === "Vấn đề") {
      result.push("");
      result.push(buildMarkdownTable(TABLE_2_HEADERS, TABLE_2_ROWS));
      result.push("");
      i = skipTableLines(lines, i, "Đau khổ vì mất mát");
      continue;
    }

    // Detect main section headers: "N. Title" where N is 1-9
    const mainSectionMatch = trimmed.match(/^(\d)\.\s+(.+)$/);
    if (mainSectionMatch && !trimmed.match(/^\d\.\d/)) {
      const sectionText = mainSectionMatch[2];
      // Only treat as header if it's title-case-ish and not too long
      if (sectionText.length <= 120) {
        result.push("");
        result.push(`## ${trimmed}`);
        result.push("");
        i++;
        continue;
      }
    }

    // Detect subsection headers: "N.M. Title"
    const subSectionMatch = trimmed.match(/^(\d)\.(\d)\.\s+(.+)$/);
    if (subSectionMatch) {
      const subText = subSectionMatch[3];
      if (subText.length <= 120) {
        result.push("");
        result.push(`### ${trimmed}`);
        result.push("");
        i++;
        continue;
      }
    }

    // Detect bullet-like list items with specific patterns
    // e.g., "Đối diện sự thật: ..."
    const bulletMatch = trimmed.match(/^(Đối diện sự thật|Chọn cuộc sống|Kết nối|Hành động|Cho đi):\s*(.+)$/);
    if (bulletMatch) {
      result.push(`- **${bulletMatch[1]}:** ${bulletMatch[2]}`);
      i++;
      continue;
    }

    // Regular paragraph or empty line
    if (trimmed === "") {
      result.push("");
    } else {
      result.push(trimmed);
    }
    i++;
  }

  // Format footnotes: e.g. 'sụp đổ"1.' -> 'sụp đổ"<sup>1</sup>.'
  const joinedText = result.join("\n");
  return joinedText.replace(/([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF"'\)])(\d+)(?=[\.,;\s]|$)/g, '$1<sup class="footnote-ref">$2</sup>');
}

function skipTableLines(lines: string[], startIndex: number, lastRowKeyword: string): number {
  let j = startIndex + 1;
  let foundLast = false;
  while (j < lines.length) {
    const t = lines[j].trim();
    if (t.startsWith(lastRowKeyword)) {
      foundLast = true;
    }
    if (foundLast && (t === "" || t.match(/^(\d+\.|\d+\.\d+\.)\s/) || t.startsWith("Bảng"))) {
      break;
    }
    j++;
  }
  return j;
}

function buildMarkdownTable(headers: string[], rows: string[][]): string {
  const lines: string[] = [];
  // Header row
  lines.push(`| ${headers.join(" | ")} |`);
  // Separator
  lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
  // Data rows
  for (const row of rows) {
    lines.push(`| ${row.join(" | ")} |`);
  }
  return lines.join("\n");
}

/**
 * Extract Table of Contents items from the markdown text.
 */
function extractTocItems(text: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = text.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    // h2: "## text" (but not "### text")
    if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
      const text = trimmed.replace(/^##\s+/, "");
      items.push({ id: generateSlug(text), text, level: 2 });
      continue;
    }

    // h3: "### text"
    if (trimmed.startsWith("### ")) {
      const text = trimmed.replace(/^###\s+/, "");
      items.push({ id: generateSlug(text), text, level: 3 });
    }
  }

  return items;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}
