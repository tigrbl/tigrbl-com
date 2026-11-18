import { FACADE } from "./site";
export const RELEASES = [...FACADE.publication.releases].sort(
  (a, b) =>
    b.publishedAt.localeCompare(a.publishedAt) ||
    b.version.localeCompare(a.version, "en", { numeric: true }),
);
export const LATEST_RELEASE = RELEASES.find(
  (r) => r.version === FACADE.publication.version,
)!;
export const isPrerelease = (version: string) =>
  /(?:a|b|rc|dev)\d/i.test(version);
