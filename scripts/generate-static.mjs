import fs from "node:fs";

const canonicalUrl = "https://tigrbl.com/";
const verifiedAt = "2026-07-11";

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${canonicalUrl}sitemap.xml\n`);
fs.writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${canonicalUrl}</loc></url>\n</urlset>\n`,
);
fs.writeFileSync(
  "dist/llms.txt",
  `# Tigrbl\n\nTigrbl is a schema-first Python ASGI framework for REST, JSON-RPC, streaming, SSE, WebSocket, runtime plans, hooks, diagnostics, and engine plugins.\n\n- Website: ${canonicalUrl}\n- Documentation: https://github.com/tigrbl/tigrbl\n- Package: https://pypi.org/project/tigrbl/\n- Community: https://discord.gg/K4YTAPapjR\n- Verified: ${verifiedAt}\n`,
);
