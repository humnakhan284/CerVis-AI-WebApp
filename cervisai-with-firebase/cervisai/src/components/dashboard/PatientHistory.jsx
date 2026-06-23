// src/components/dashboard/PatientHistory.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Loads the current doctor's scan reports from Firestore in real time.
// Falls back to the mock PATIENTS list for students (no real history yet).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db }            from "../../firebase/firebaseConfig";
import { ResultBadge, RiskTag } from "../ui/Badge";
import { PATIENTS }      from "../../constants/mockData";

export default function PatientHistory({ uid }) {
  const [query_,   setQuery]   = useState("");
  const [reports,  setReports] = useState(null);  // null = loading
  const [error,    setError]   = useState("");

  // ── Load reports from Firestore in real time ───────────────────────────────
  useEffect(() => {
    if (!uid) {
      // No uid — fall back to mock data
      setReports(PATIENTS);
      return;
    }

    const reportsRef = collection(db, "patients", uid, "reports");
    const q          = query(reportsRef, orderBy("createdAt", "desc"));

    // onSnapshot gives us live updates whenever Firestore changes
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id:         doc.id,
          // Firestore report fields
          name:       "Current Patient",     // replace with real patient name when you add that field
          scan:       doc.data().scanType    ?? "—",
          date:       doc.data().createdAt
            ? new Date(doc.data().createdAt.toDate()).toISOString().split("T")[0]
            : "—",
          status:     doc.data().status      ?? "—",
          confidence: doc.data().confidence  ?? 0,
          risk:       doc.data().status === "Positive" ? "High" : "Low",
          fileName:   doc.data().fileName    ?? "—",
          model:      doc.data().model       ?? "—",
          ...doc.data(),
        }));

        // If no Firestore reports yet, show mock data as placeholder
        setReports(data.length > 0 ? data : PATIENTS);
        setError("");
      },
      (err) => {
        console.error("Firestore read error:", err);
        setError("Could not load reports. Showing sample data.");
        setReports(PATIENTS);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [uid]);

  // ── Filter by search query ─────────────────────────────────────────────────
  const rows = (reports ?? []).filter((p) => {
    const q = query_.toLowerCase();
    return (
      (p.name  ?? "").toLowerCase().includes(q) ||
      (p.id    ?? "").toLowerCase().includes(q) ||
      (p.scan  ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="sec-title">Patient Diagnostic History</div>
      <div className="sec-sub">
        Search and review your scan results and diagnostic records.
      </div>

      {/* Firestore error */}
      {error && (
        <div style={{
          marginBottom: 16, padding: "10px 14px", borderRadius: 8,
          background: "#fffbeb", border: "1px solid #fde68a",
          color: "#b45309", fontSize: 13,
        }}>
          ⚠ {error}
        </div>
      )}

      <div className="tbl-card">
        {/* Header */}
        <div className="tbl-hd">
          <div className="tbl-hd-t">
            {reports === null
              ? "Loading…"
              : `All Reports (${reports.length})`}
          </div>
          <div className="srch-wrap">
            <span className="srch-ico">🔍</span>
            <input
              className="srch-inp"
              placeholder="Search name or scan type…"
              value={query_}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Scan Type</th>
              <th>Date</th>
              <th>Result</th>
              <th>Confidence</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading state */}
            {reports === null && (
              <tr>
                <td colSpan={8}>
                  <div className="empty">
                    <div className="empty-ic">⏳</div>
                    <div className="empty-tx">Loading reports…</div>
                  </div>
                </td>
              </tr>
            )}

            {/* Rows */}
            {reports !== null && rows.length > 0 && rows.map((p, i) => (
              <tr key={p.id ?? i}>
                <td className="mono">{p.id ?? `R-${String(i + 1).padStart(4, "0")}`}</td>
                <td style={{ fontWeight: 700, color: "var(--text)" }}>
                  {p.name ?? "—"}
                </td>
                <td>{p.age ?? "—"}</td>
                <td>{p.scan ?? p.scanType ?? "—"}</td>
                <td className="mono">{p.date ?? "—"}</td>
                <td>
                  <ResultBadge status={p.status} analyzing={false} />
                </td>
                <td style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12, fontWeight: 600,
                }}>
                  {p.confidence}%
                </td>
                <td>
                  <RiskTag risk={p.risk ?? "Low"} />
                </td>
              </tr>
            ))}

            {/* Empty search result */}
            {reports !== null && rows.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <div className="empty">
                    <div className="empty-ic">🔍</div>
                    <div className="empty-tx">No results for "{query_}"</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
