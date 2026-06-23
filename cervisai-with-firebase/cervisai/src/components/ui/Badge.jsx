// src/components/ui/Badge.jsx

// Result badge — Positive / Negative / Analyzing / Pending
export function ResultBadge({ status, analyzing }) {
  if (analyzing) return <span className="rbadge rb-ana">⟳ Analyzing…</span>;
  if (!status)   return <span className="rbadge rb-pnd">● Awaiting Upload</span>;

  return status === "Positive"
    ? <span className="rbadge rb-pos">⚠ Positive</span>
    : <span className="rbadge rb-neg">✓ Negative</span>;
}

// Risk level tag — High / Moderate / Low
export function RiskTag({ risk }) {
  const cls = risk === "High" ? "rt-H" : risk === "Moderate" ? "rt-M" : "rt-L";
  return <span className={`rtag ${cls}`}>{risk}</span>;
}

// Difficulty tag — Beginner / Intermediate / Advanced
export function DiffTag({ difficulty }) {
  const cls = difficulty === "Beginner" ? "d-B" : difficulty === "Intermediate" ? "d-I" : "d-A";
  return <span className={`diff-tg ${cls}`}>{difficulty}</span>;
}
