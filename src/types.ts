/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Feature {
  id: string;
  name: string;
  description: string;
  audienceValue: string;
  packageOwner: string;
  maturity: "Alpha" | "Beta" | "Stable" | "Experimental";
  versionScope: string;
  protocols: string[];
  engines: string[];
  docsUrl: string;
  sourceUrl: string;
  verifiedAt: string;
}

export interface Claim {
  id: string;
  claimText: string;
  allowedContexts: string[];
  evidenceLinks: string[];
  reviewer: string;
  approvalStatus: "Approved" | "Draft" | "Superseded" | "Failed";
  versionScope: string;
  expiryDate: string;
  reverificationDate: string;
}

export interface ProofItem {
  id: string;
  type: "Test" | "Example" | "Metadata" | "Docs" | "Artifact" | "Policy";
  title: string;
  description: string;
  url: string;
  verifiedAt: string;
}

export interface PackageRecord {
  distributionName: string;
  importRoot: string;
  group: string;
  audience: "application" | "extension" | "maintainer" | "testing";
  responsibility: string;
  sourcePath: string;
  pypiUrl?: string;
  installable: boolean;
  version?: string;
  pythonRange?: string;
  publicationStatus: string;
  evidence: EvidenceRef;
  installCmd?: string;
}

export interface ApplicationFixture {
  id: string;
  tigrblVersion: string;
  pythonVersion: string;
  generatedAt: string;
  sourceUrl: string;
  routers: string[];
  tables: string[];
  operations: string[];
  handlers: string[];
  schemas: string[];
  hooks: string[];
  bindings: string[];
  docs: any;
  diagnostics: any;
}

export interface EvidenceRef {
  sourceUrl: string;
  verifiedAt: string;
  versionScope?: string;
  evidenceKind: "source" | "test" | "docs" | "ssot" | "pypi" | "generated-fixture";
}

export interface ReleaseRecord {
  version: string;
  type: "stable" | "prerelease" | "package";
  publishedAt: string;
  pyRange: string;
  license: string;
  status: string;
  pypiUrl: string;
  githubUrl: string;
  changelogSummary: string[];
  isRecommended: boolean;
}

export interface ExampleRecord {
  id: string;
  name: string;
  audience: string;
  useCase: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  protocol: "REST" | "JSON-RPC" | "SSE" | "WebSocket" | "Multi-Protocol" | "None";
  engine: "Postgres" | "None" | "Generic";
  packageScope: string;
  testedStatus: "Passed" | "Untested" | "Deprecated";
  sourceLink: string;
  code: string;
  expectedOutput: string;
}

export interface CapabilityRow {
  capability: string;
  rest: string;
  jsonRpc: string;
  sse: string;
  websocket: string;
  webtransport: string;
}

export interface UserProfileHypothesis {
  profileName: string;
  questionToAnswer: string;
  requiredProof: string;
  primaryNextAction: string;
  features: string[];
}
