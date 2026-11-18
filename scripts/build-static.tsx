import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import sharp from "sharp";
import App from "../src/App";
import { PAGES, NOT_FOUND } from "../src/content/pages";
import { headHtml } from "../src/content/metadata";
import { discoveryFiles } from "./discovery";

const template = await fs.readFile("dist/index.html", "utf8");
const resources = [
  ...template.matchAll(
    /<script\b[^>]*src=[^>]*><\/script>|<link\b[^>]*rel="stylesheet"[^>]*>/g,
  ),
]
  .map((m) => m[0])
  .join("\n");
for (const page of [...PAGES, NOT_FOUND]) {
  const target =
    page.path === "/404"
      ? "dist/404.html"
      : path.join("dist", page.path, "index.html");
  await fs.mkdir(path.dirname(target), { recursive: true });
  const html = `<!doctype html>\n<html lang="en"><head><script>document.documentElement.classList.add("js")</script><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0a0a0b"><link rel="icon" type="image/svg+xml" href="/favicon.svg">\n${headHtml(page)}\n${resources}\n</head><body><div id="root">${renderToString(<App path={page.path} />)}</div></body></html>\n`;
  await fs.writeFile(target, html);
}
for (const [name, content] of discoveryFiles()) {
  const target = path.join("dist", name);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content);
}
await fs.mkdir("dist/assets/social", { recursive: true });
const logo = await fs.readFile("public/favicon.svg");
const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0a0a0b"/><rect x="70" y="72" width="6" height="55" fill="#fb923c"/><text x="95" y="115" font-family="sans-serif" font-size="42" font-weight="700" fill="#f8fafc">TIGRBL</text><text x="70" y="280" font-family="sans-serif" font-size="70" font-weight="700" fill="#f8fafc">Define your API once.</text><text x="70" y="375" font-family="sans-serif" font-size="70" font-weight="700" fill="#fb923c">Project everywhere.</text><text x="70" y="520" font-family="sans-serif" font-size="28" fill="#b5c0d1">Python · ASGI · Explicit contracts · tigrbl.com</text></svg>`,
);
await sharp(background)
  .composite([
    {
      input: await sharp(logo).resize(110, 110).png().toBuffer(),
      left: 1000,
      top: 70,
    },
  ])
  .png()
  .toFile("dist/assets/social/tigrbl.png");
console.log(
  `Rendered ${PAGES.length} public pages, 404, and generated discovery artifacts.`,
);
