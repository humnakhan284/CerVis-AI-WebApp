// src/components/dashboard/StatCards.jsx
import { STATS } from "../../constants/mockData";

export default function StatCards() {
  return (
    <div className="stat-grid">
      {STATS.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-lbl">{s.label}</div>
          <div className="stat-val">{s.value}</div>
          <span className={`stat-dlt ${s.up ? "up" : "down"}`}>
            {s.up ? "↑" : "↓"} {s.delta}
          </span>
        </div>
      ))}
    </div>
  );
}
