import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { View } from "../src/components/Views";
import { PAGES } from "../src/content/pages";
import { SITE } from "../src/content/site";
import { RELEASES } from "../src/content/releases";
import { DEMO_DISPOSITIONS } from "../src/content/demos";
import { escapeHtml as xml } from "../src/content/metadata";

export function discoveryFiles(): Map<string, string> {
  const files = new Map<string, string>();
  const pages = PAGES.filter((p) => p.indexable).sort((a, b) =>
    a.path.localeCompare(b.path, "en"),
  );
  const canonical = (path: string) => new URL(path, SITE.origin).href;
  const header =
    '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  const families = [...new Set(pages.map((p) => p.family))].sort();
  files.set(
    "sitemap.xml",
    header +
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      families
        .map(
          (f) =>
            `  <sitemap><loc>${SITE.origin}/sitemaps/${f}.xml</loc></sitemap>`,
        )
        .join("\n") +
      "\n</sitemapindex>\n",
  );
  for (const family of families)
    files.set(
      `sitemaps/${family}.xml`,
      header +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        pages
          .filter((p) => p.family === family)
          .map(
            (p) =>
              `  <url><loc>${xml(canonical(p.path))}</loc>${p.modifiedAt ? `<lastmod>${xml(p.modifiedAt)}</lastmod>` : ""}</url>`,
          )
          .join("\n") +
        "\n</urlset>\n",
    );
  files.set(
    "sitemap.xsl",
    `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8"/><xsl:template match="/"><html lang="en"><head><title>Tigrbl sitemap</title><style>body{font:16px system-ui;max-width:1000px;margin:3rem auto;padding:1rem}li{margin:1rem 0}</style></head><body><h1>Tigrbl sitemap</h1><p>Canonical public pages and section sitemaps.</p><ul><xsl:for-each select="s:sitemapindex/s:sitemap/s:loc | s:urlset/s:url/s:loc"><li><a href="{.}"><xsl:value-of select="."/></a></li></xsl:for-each></ul></body></html></xsl:template></xsl:stylesheet>\n`,
  );
  files.set(
    "robots.txt",
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`,
  );
  files.set(
    "llms.txt",
    `# Tigrbl\n\n> ${SITE.description}\n\n## Start here\n\n- [Documentation](${SITE.docs})\n- [Source](${SITE.repository})\n- [Full website reference](${SITE.origin}/llms-full.txt)\n\n## Public pages\n\n${pages.map((p) => `- [${p.title}](${canonical(p.path)}): ${p.description}`).join("\n")}\n\n## Interpretation\n\nTigrbl is classified Alpha. A demo landing-page HTTP observation is not a protocol or backend conformance result. Source revisions and setup instructions appear on individual demo pages.\n`,
  );
  const markdown = (html: string) =>
    html
      .replace(/<button\b[^>]*>[\s\S]*?<\/button>/g, "")
      .replace(
        /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g,
        (_, level, text) => `\n\n${"#".repeat(Number(level))} ${text}\n\n`,
      )
      .replace(
        /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
        (_, href, text) =>
          `[${text}](${href.startsWith("/") ? canonical(href) : href})`,
      )
      .replace(/<pre\b[^>]*>/g, "\n\n```\n")
      .replace(/<\/pre>/g, "\n```\n\n")
      .replace(/<li\b[^>]*>/g, "\n- ")
      .replace(/<\/(?:p|div|section|article)>/g, "\n\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  files.set(
    "llms-full.txt",
    `# Tigrbl website reference\n\nPublic website content; source attribution is included per page.\n\n${pages.map((p) => `# ${p.title}\n\nSource: ${canonical(p.path)}\n\n${markdown(renderToStaticMarkup(React.createElement(View, { page: p })))}\n`).join("\n---\n\n")}\n`,
  );
  const entries = RELEASES.filter((r) => !r.yanked).map((r) => ({
    id: `${SITE.pypi}${r.version}/`,
    title: `Tigrbl ${r.version}`,
    date: r.publishedTimestamp,
    summary: `Facade publication on PyPI. Consult version metadata for requirements and repository release notes for changes.`,
  }));
  const updated = entries
    .map((e) => e.date)
    .sort()
    .at(-1)!;
  files.set(
    "rss.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Tigrbl releases</title><link>${SITE.origin}/releases</link><description>Tigrbl facade publications from PyPI.</description><language>en</language><atom:link href="${SITE.origin}/rss.xml" rel="self" type="application/rss+xml"/>${entries.map((e) => `<item><title>${xml(e.title)}</title><link>${xml(e.id)}</link><guid isPermaLink="true">${xml(e.id)}</guid><pubDate>${new Date(e.date).toUTCString()}</pubDate><description>${xml(e.summary)}</description></item>`).join("")}</channel></rss>\n`,
  );
  files.set(
    "atom.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><id>${SITE.origin}/atom.xml</id><title>Tigrbl releases</title><updated>${xml(updated)}</updated><link href="${SITE.origin}/atom.xml" rel="self"/><link href="${SITE.origin}/releases"/><author><name>Tigrbl project</name></author>${entries.map((e) => `<entry><id>${xml(e.id)}</id><title>${xml(e.title)}</title><link href="${xml(e.id)}"/><updated>${xml(e.date)}</updated><published>${xml(e.date)}</published><summary>${xml(e.summary)}</summary></entry>`).join("")}</feed>\n`,
  );
  // Audit inventory is generated alongside the build, outside the public output.
  files.set(
    "../.reports/demo-dispositions.json",
    JSON.stringify(DEMO_DISPOSITIONS, null, 2) + "\n",
  );
  return files;
}
