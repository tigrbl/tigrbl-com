export interface PageRecord {
  path: string;
  title: string;
  description: string;
  family: "pages" | "demos" | "examples" | "releases";
  indexable: boolean;
  modifiedAt?: string;
}
export interface DemoRecord {
  id: string;
  title: string;
  summary: string;
  category:
    | "Engines"
    | "Realtime"
    | "Files and WebDAV"
    | "Identity and interoperability";
  protocols: string[];
  engines: string[];
  packageNames: string[];
  repositoryUrl: string;
  sourceRef: string;
  documentationUrl: string;
  liveUrl?: string;
  aliases: string[];
  browserRequirements: string[];
  steps: string[];
  evidenceScope: string;
  relatedExampleIds: string[];
  localRunInstructions: string;
}
export interface ExampleRecord {
  id: string;
  title: string;
  description: string;
  protocol: string;
  code: string;
  sourceUrl: string;
  evidence: string;
}
export interface Availability {
  url: string;
  checkedAt: string;
  status: "reachable" | "unavailable";
  httpStatus?: number;
  finalUrl?: string;
  error?: string;
  scope: string;
}
