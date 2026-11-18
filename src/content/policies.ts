import { SITE } from "./site";
export interface PolicySection {
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
}
export const POLICIES: Record<string, PolicySection[]> = {
  "/support": [
    {
      title: "Start with the documentation",
      paragraphs: [
        "Use the installation guide, code examples, and package documentation for the version you installed. Demo pages link to the source revision and local setup instructions.",
      ],
      links: [
        { label: "Documentation", href: SITE.docs },
        { label: "Code examples", href: "/examples" },
        { label: "Demo catalog", href: "/demos" },
      ],
    },
    {
      title: "Ask the community",
      paragraphs: [
        "The project Discord is a place to discuss usage and ask questions. Community participation does not establish a support contract or response-time commitment.",
      ],
      links: [{ label: "Join the Discord community", href: SITE.discord }],
    },
    {
      title: "Report a reproducible bug",
      paragraphs: [
        "Include the package and Python versions, operating system, a minimal reproduction, expected behavior, and actual behavior. Remove tokens, credentials, personal data, and private application content before posting.",
      ],
      links: [
        { label: "Open a framework issue", href: SITE.issues },
        {
          label: "Report a website problem",
          href: "https://github.com/tigrbl/tigrbl-com/issues",
        },
      ],
    },
    {
      title: "Security reports",
      paragraphs: [
        "Report suspected vulnerabilities through the project security policy. Do not publish exploit details in an ordinary issue.",
      ],
      links: [{ label: "Security reporting", href: "/security" }],
    },
  ],
  "/security": [
    {
      title: "Report privately",
      paragraphs: [
        "Follow the Tigrbl repository security policy and use the hosting platform’s private vulnerability-reporting or security-advisory workflow. Do not open a public issue for a suspected vulnerability.",
      ],
      links: [
        {
          label: "Read the authoritative security policy",
          href: SITE.security,
        },
        {
          label: "GitHub private reporting",
          href: "https://github.com/tigrbl/tigrbl/security/advisories/new",
        },
      ],
    },
    {
      title: "What to include",
      paragraphs: [
        "Identify affected packages and versions, describe the impact, and provide safe reproduction steps and relevant environment assumptions. Keep credentials and unrelated private data out of the report.",
      ],
    },
    {
      title: "Support scope",
      paragraphs: [
        "The project policy describes a pre-certification checkpoint and does not declare formal long-term support windows or response SLAs. Check the current policy for changes.",
      ],
    },
  ],
  "/privacy": [
    {
      title: "Website scope",
      paragraphs: [
        "This notice covers the Tigrbl product website. The website is maintained through the tigrbl/tigrbl-com repository. Linked demonstration applications, GitHub, PyPI, documentation hosting, and Discord have their own operating environments and data handling.",
      ],
      links: [
        {
          label: "Website repository",
          href: "https://github.com/tigrbl/tigrbl-com",
        },
      ],
    },
    {
      title: "Browser interactions",
      paragraphs: [
        "The website application does not include analytics or advertising scripts, account registration, contact forms, or application cookies. Catalog search and filtering run in your browser and are not submitted to a search service. Copy buttons write only the selected code or command to your clipboard when activated. The site uses system fonts and serves its assets from the website.",
      ],
    },
    {
      title: "Requests and hosting logs",
      paragraphs: [
        "Loading this site sends requests to the hosting infrastructure. Connections necessarily expose network information such as your IP address to that infrastructure. The website server’s access-log format records the request method, path without query parameters, status, and response size; it excludes IP addresses, referrers, cookies, and user-agent strings. Edge proxies and hosting services can maintain additional operational logs. No fixed infrastructure-wide retention period is promised by this notice.",
      ],
    },
    {
      title: "External services and demonstrations",
      paragraphs: [
        "External links send you to the destination service. Voice, video, identity, and file demonstrations can require permissions or handle information beyond this website. Read their source and instructions before using them. Use test data and avoid uploading secrets, personal records, or sensitive files to public demonstrations.",
      ],
    },
    {
      title: "Privacy questions",
      paragraphs: [
        "Contact the project maintainers through the community or repository channels listed on the support page. Describe the concern without posting sensitive information publicly. Suspected security vulnerabilities should use private security reporting.",
      ],
      links: [
        { label: "Support channels", href: "/support" },
        { label: "Private security reporting", href: "/security" },
      ],
    },
  ],
  "/terms": [
    {
      title: "Website information",
      paragraphs: [
        "This website introduces the Tigrbl open-source project and links to code, packages, documentation, and demonstrations. Content and public demo availability can change. Check the source revision and installed package version before relying on an example in your application.",
      ],
    },
    {
      title: "Software licensing",
      paragraphs: [
        "Software use, modification, and distribution are governed by the license accompanying the specific repository or package. These website terms do not replace or expand those licenses.",
      ],
      links: [{ label: "Tigrbl framework license", href: SITE.license }],
    },
    {
      title: "Public demonstrations",
      paragraphs: [
        "Public demos are evaluation environments. Use synthetic test data, respect shared capacity, and follow the instructions for each application. Do not attempt unauthorized access, interfere with other users, or upload unlawful content. Data may be reset and availability is not guaranteed. A demo’s presence in the catalog does not establish production readiness or a service-level commitment.",
      ],
    },
    {
      title: "External destinations and support",
      paragraphs: [
        "External services operate under their own terms. Community help does not create a paid support agreement or a guaranteed response time. Direct website questions to the project channels on the support page.",
      ],
      links: [
        { label: "Support and community", href: "/support" },
        { label: "Privacy notice", href: "/privacy" },
      ],
    },
  ],
};
