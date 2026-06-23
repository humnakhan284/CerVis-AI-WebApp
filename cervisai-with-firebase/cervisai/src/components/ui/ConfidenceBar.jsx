// src/components/ui/ConfidenceBar.jsx
import { getConfidenceColor } from "../../utils/helpers";

export default function ConfidenceBar({ value, analyzing }) {
  const color = getConfidenceColor(value);

  return (
    <div className="conf-blk">
      <div className="conf-top">
        <span>Confidence Score</span>
        <span style={{ color: analyzing ? "var(--muted)" : color, fontWeight: 800 }}>
          {analyzing ? "—" : value ? `${value}%` : "—"}
        </span>
      </div>
      <div className="conf-trk">
        {analyzing ? (
          <div className="shimmer" style={{ width: "100%" }} />
        ) : (
          <div
            className="conf-fill"
            style={{
              width:      value ? `${value}%` : "0%",
              background: value ? color : "var(--border)",
            }}
          />
        )}
      </div>
    </div>
  );
}
