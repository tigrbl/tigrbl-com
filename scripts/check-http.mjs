import assert from "node:assert/strict";
const origin = process.env.SITE_BASE_URL || "http://127.0.0.1:4187";
for (const [url, type, marker] of [
  ["/", "text/html", "Define your API once."],
  ["/examples", "text/html", "Small examples with visible sources."],
  ["/demos", "text/html", "Demo catalog"],
  ["/privacy", "text/html", "Website scope"],
  ["/terms", "text/html", "Public demonstrations"],
  ["/support", "text/html", "Ask the community"],
  ["/robots.txt", "text/plain", "Sitemap:"],
  ["/llms.txt", "text/plain", "# Tigrbl"],
  ["/llms-full.txt", "text/plain", "# Tigrbl website reference"],
  ["/sitemap.xml", "xml", "<sitemapindex"],
  ["/sitemaps/demos.xml", "xml", "<urlset"],
  ["/rss.xml", "application/rss+xml", "<rss"],
  ["/atom.xml", "application/atom+xml", "<feed"],
  ["/assets/social/tigrbl.png", "image/png", null],
]) {
  const response = await fetch(origin + url);
  assert.equal(response.status, 200, url);
  assert(
    response.headers.get("content-type")?.includes(type),
    `${url} content type`,
  );
  if (marker) assert((await response.text()).includes(marker), url);
}
for (const url of [
  "/not-a-page",
  "/feed.xml",
  "/assets/missing.js",
  "/demos/missing",
]) {
  const response = await fetch(origin + url);
  assert.equal(response.status, 404, url);
  assert((await response.text()).includes("This page does not exist."), url);
}
for (const [url, target] of [
  ["/full-llms.txt", "/llms-full.txt"],
  ["/examples/", "/examples"],
  ["/sitemap-home.xml", "/sitemaps/pages.xml"],
]) {
  const response = await fetch(origin + url, { redirect: "manual" });
  assert.equal(response.status, 308, url);
  assert.equal(
    new URL(response.headers.get("location"), origin).pathname,
    target,
  );
}
console.log(
  `HTTP routes, content types, redirects, and 404s passed at ${origin}.`,
);
