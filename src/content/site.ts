import snapshot from "./source-snapshot.json" with { type: "json" };

export const SITE = {
  name: "Tigrbl",
  origin: "https://tigrbl.com",
  description:
    "Define Python API operations once and connect contracts, protocol bindings, lifecycle hooks, and execution engines.",
  repository: "https://github.com/tigrbl/tigrbl",
  organization: "https://github.com/tigrbl",
  docs: "https://docs.tigrbl.com/",
  discord: "https://discord.gg/K4YTAPapjR",
  issues: "https://github.com/tigrbl/tigrbl/issues",
  security: "https://github.com/tigrbl/tigrbl/security/policy",
  pypi: "https://pypi.org/project/tigrbl/",
  license: "https://github.com/tigrbl/tigrbl/blob/master/LICENSE",
  socialImage: "/assets/social/tigrbl.png",
  socialImageAlt: "Tigrbl — Define your API once. Project everywhere.",
} as const;
export const VERIFIED_AT = snapshot.verifiedAt;
export const FACADE = snapshot.packages.find((p) => p.name === "tigrbl")!;
export const FRAMEWORK_SOURCE = `${SITE.repository}/tree/${snapshot.frameworkRef}`;
export const PACKAGES = snapshot.packages;
export const NAV = [
  { path: "/get-started", label: "Get started" },
  { path: "/how-it-works", label: "Architecture" },
  { path: "/ecosystem", label: "Ecosystem" },
  { path: "/examples", label: "Examples" },
  { path: "/demos", label: "Demos" },
  { path: "/releases", label: "Releases" },
];
