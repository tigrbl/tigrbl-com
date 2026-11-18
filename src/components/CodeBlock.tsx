import React, { useState } from "react";
import { SyntaxCode, type CodeLanguage } from "./SyntaxCode";
export function CodeBlock({
  code,
  language,
  label = "Python",
}: {
  code: string;
  language: CodeLanguage;
  label?: string;
}) {
  const [status, setStatus] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied");
    } catch {
      setStatus("Select code to copy");
    }
  }
  return (
    <div className="code-block">
      <div className="code-label">
        <span>{label}</span>
        <button onClick={copy} aria-label={`Copy ${label} code`}>
          {status}
        </button>
      </div>
      <pre tabIndex={0}>
        <SyntaxCode code={code} language={language} />
      </pre>
      <span className="sr-only" role="status">
        {status === "Copy" ? "" : status}
      </span>
    </div>
  );
}
