import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const reports = [];
for (const file of (await walk("dist")).filter((f) =>
  /\.(js|css|wasm)$/.test(f),
)) {
  const data = await fs.readFile(file);
  reports.push({ file, bytes: data.length, gzipBytes: gzipSync(data).length });
  if (data.length > 262144) throw new Error(`${file} exceeds 256 KiB`);
}
const transfer = reports.reduce((n, r) => n + r.gzipBytes, 0);
if (transfer > 150 * 1024)
  throw new Error(
    `Total compressed scripts/styles exceed 150 KiB: ${transfer}`,
  );
await fs.mkdir(".reports", { recursive: true });
await fs.writeFile(
  ".reports/budgets.json",
  JSON.stringify(reports, null, 2) + "\n",
);
console.log(
  `Asset budgets passed: ${reports.length} chunks, ${transfer} bytes total gzip.`,
);
