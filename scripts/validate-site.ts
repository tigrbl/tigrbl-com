import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { PAGES, NOT_FOUND } from "../src/content/pages";
import { DEMOS, DEMO_DISPOSITIONS } from "../src/content/demos";
import { SITE, PACKAGES } from "../src/content/site";
import { discoveryFiles } from "./discovery";
import { headHtml } from "../src/content/metadata";
import exclusions from "../src/content/demo-exclusions.json" with { type: "json" };
const parser = new XMLParser({
  ignoreAttributes: false,
  isArray: (tag) => ["sitemap", "url", "item", "entry"].includes(tag),
});
const artifacts = discoveryFiles();
const report = {
  pages: PAGES.length,
  demos: DEMOS.length,
  repositories: DEMO_DISPOSITIONS.length,
  packages: PACKAGES.length,
  partitions: {} as Record<string, number>,
};
assert.equal(
  new Set(PAGES.map((p) => p.path)).size,
  PAGES.length,
  "Duplicate routes",
);
assert.equal(
  new Set(DEMOS.map((d) => d.id)).size,
  DEMOS.length,
  "Duplicate demo IDs",
);
for (const disposition of DEMO_DISPOSITIONS)
  assert(disposition.demoIds.length, "Demo repository omitted from catalog");
for (const key of Object.keys(exclusions)) {
  assert(
    !DEMOS.some((demo) => demo.repositoryKey === key),
    "Excluded demo must stay out of the catalog",
  );
}
for (const demo of DEMOS) {
  if (demo.sourceVisibility === "public") {
    assert.match(demo.sourceRef!, /^[a-f0-9]{40}$/);
    assert(demo.documentationUrl!.includes(demo.sourceRef!));
  } else {
    assert(
      !demo.repositoryUrl && !demo.sourceRef && !demo.documentationUrl,
      "Private source links/revisions must not be emitted",
    );
  }
  assert(demo.steps.length && demo.evidenceScope && demo.localRunInstructions);
  if (demo.liveUrl) assert.equal(new URL(demo.liveUrl).protocol, "https:");
}
for (const [file, expected] of artifacts) {
  const actual = await fs.readFile(path.join("dist", file), "utf8");
  assert.equal(actual, expected, `Stale generated artifact: ${file}`);
  if (file.endsWith(".xml") || file.endsWith(".xsl"))
    assert.equal(XMLValidator.validate(actual), true, `Invalid XML: ${file}`);
}
const index = parser.parse(artifacts.get("sitemap.xml")!).sitemapindex;
const sitemapUrls: string[] = [];
for (const entry of index.sitemap) {
  const url = new URL(entry.loc);
  assert.equal(url.origin, SITE.origin);
  const child = parser.parse(artifacts.get(url.pathname.slice(1))!).urlset;
  assert(child, "Sitemap index must point to URL sitemaps");
  for (const record of child.url) {
    assert.equal(new URL(record.loc).origin, SITE.origin);
    sitemapUrls.push(record.loc);
  }
}
assert.deepEqual(
  sitemapUrls.sort(),
  PAGES.filter((p) => p.indexable)
    .map((p) => new URL(p.path, SITE.origin).href)
    .sort(),
);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length);
for (const page of [...PAGES, NOT_FOUND]) {
  const file =
    page.path === "/404"
      ? "dist/404.html"
      : path.join("dist", page.path, "index.html");
  const html = await fs.readFile(file, "utf8");
  assert(
    html.includes(headHtml(page)),
    `Incorrect initial metadata: ${page.path}`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `Expected one H1: ${page.path}`,
  );
  const scripts = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  assert.equal(scripts.length, 1, `Expected one graph: ${page.path}`);
  const graph = JSON.parse(scripts[0][1]);
  assert.equal(graph["@context"], "https://schema.org");
  const nodes = graph["@graph"];
  assert(Array.isArray(nodes));
  const ids = nodes.map((n) => n["@id"]).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length);
  assert(
    nodes.some(
      (n) => n["@type"] === "WebPage" || n["@type"] === "CollectionPage",
    ),
  );
  assert(
    nodes.some((n) => n["@type"] === "Organization" && n.name === "Tigrbl"),
  );
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const target = new URL(match[1], SITE.origin).pathname;
    const mapped = target === "/full-llms.txt" ? "/llms-full.txt" : target;
    if (PAGES.some((p) => p.path === mapped)) continue;
    await fs.access(path.join("dist", mapped));
  }
  if (page.indexable)
    report.partitions[page.family] = (report.partitions[page.family] || 0) + 1;
}
const rss = parser.parse(artifacts.get("rss.xml")!).rss.channel;
const atom = parser.parse(artifacts.get("atom.xml")!).feed;
assert.equal(rss.item.length, atom.entry.length);
assert.equal(new Set(atom.entry.map((e) => e.id)).size, atom.entry.length);
assert.equal(atom.id, `${SITE.origin}/atom.xml`);
assert(
  atom.link.some(
    (link) =>
      link["@_rel"] === "self" && link["@_href"] === `${SITE.origin}/atom.xml`,
  ),
);
for (const entry of atom.entry) {
  assert.equal(new URL(entry.id).origin, "https://pypi.org");
  assert(
    Number.isFinite(Date.parse(entry.updated)),
    "Atom entry requires a valid update timestamp",
  );
}
await fs.mkdir(".reports", { recursive: true });
await fs.writeFile(
  ".reports/discovery.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `Validated ${report.pages} pages, ${report.demos} demos, four sitemap partitions, RSS, Atom, JSON-LD, and internal links.`,
);
