// Local production-artifact server. Docker/Nginx is the deployment authority.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("dist");
const redirects = {
  "/full-llms.txt": "/llms-full.txt",
  "/sitemap-home.xml": "/sitemaps/pages.xml",
  "/sitemap-how-it-works.xml": "/sitemaps/pages.xml",
  "/sitemap-ecosystem.xml": "/sitemaps/pages.xml",
  "/sitemap-get-started.xml": "/sitemaps/pages.xml",
  "/sitemap-examples.xml": "/sitemaps/examples.xml",
  "/sitemap-releases.xml": "/sitemaps/releases.xml",
};
const mime = {
  ".html": "text/html; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".xsl": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (redirects[pathname] || (pathname !== "/" && pathname.endsWith("/"))) {
      res
        .writeHead(308, {
          Location:
            (redirects[pathname] || pathname.replace(/\/+$/, "")) + url.search,
        })
        .end();
      return;
    }
    const candidate = path.resolve(root, "." + pathname);
    if (candidate !== root && !candidate.startsWith(root + path.sep)) {
      res.writeHead(400).end();
      return;
    }
    let target;
    try {
      const stat = await fs.stat(candidate);
      target = stat.isDirectory()
        ? path.join(candidate, "index.html")
        : candidate;
      await fs.access(target);
    } catch {
      target = path.join(root, "404.html");
      res.statusCode = 404;
    }
    const body = await fs.readFile(target);
    const type =
      pathname === "/rss.xml"
        ? "application/rss+xml; charset=utf-8"
        : pathname === "/atom.xml"
          ? "application/atom+xml; charset=utf-8"
          : mime[path.extname(target)] || "application/octet-stream";
    res.setHeader("Content-Type", type);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    if (req.method === "HEAD") res.end();
    else res.end(body);
  } catch {
    res.writeHead(400).end();
  }
});
server.listen(Number(process.env.PORT || 4187), "127.0.0.1", () =>
  console.log(`Built site: http://127.0.0.1:${process.env.PORT || 4187}`),
);
