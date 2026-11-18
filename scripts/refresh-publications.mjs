import fs from "node:fs/promises";
const path = new URL("../src/content/source-snapshot.json", import.meta.url);
const snapshot = JSON.parse(await fs.readFile(path, "utf8"));
const queue = [...snapshot.packages];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const record = queue.shift();
      const url = `https://pypi.org/pypi/${record.name}/json`;
      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          response = await fetch(url, { signal: AbortSignal.timeout(15000) });
          break;
        } catch (error) {
          if (attempt === 2) throw error;
        }
      }
      if (response.status === 404) {
        record.publication = {
          name: record.name,
          version: null,
          python: null,
          releases: [],
          sourceUrl: url,
        };
        continue;
      }
      if (!response.ok) throw new Error(`${url}: ${response.status}`);
      const { info, releases } = await response.json();
      record.publication = {
        name: info.name,
        version: info.version,
        python: info.requires_python || "See PyPI",
        classifiers: info.classifiers,
        sourceUrl: url,
        releases:
          record.name === "tigrbl"
            ? Object.entries(releases)
                .filter(([, files]) => files.length)
                .map(([version, files]) => ({
                  version,
                  publishedAt: files
                    .map((f) => f.upload_time_iso_8601.slice(0, 10))
                    .sort()[0],
                  publishedTimestamp: files
                    .map((f) => f.upload_time_iso_8601)
                    .sort()[0],
                  yanked: files.every((f) => f.yanked),
                }))
            : [],
      };
    }
  }),
);
snapshot.verifiedAt = new Date().toISOString().slice(0, 10);
await fs.writeFile(path, JSON.stringify(snapshot, null, 2) + "\n");
console.log(`Refreshed ${snapshot.packages.length} publication records.`);
