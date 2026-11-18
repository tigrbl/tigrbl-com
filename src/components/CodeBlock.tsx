import React, { useState } from "react";
export function CodeBlock({
  code,
  label = "Python",
}: {
  code: string;
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
        <code>{code}</code>
      </pre>
      <span className="sr-only" role="status">
        {status === "Copy" ? "" : status}
      </span>
    </div>
  );
}
