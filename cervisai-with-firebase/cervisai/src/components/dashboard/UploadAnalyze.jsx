// src/components/dashboard/UploadAnalyze.jsx
import { useState }       from "react";
import { ResultBadge }    from "../ui/Badge";
import ConfidenceBar      from "../ui/ConfidenceBar";
import Spinner            from "../ui/Spinner";
import { useAnalysis }    from "../../hooks/useAnalysis";

const ZONES = [
  {
    t:     "eye",
    cls:   "uz-eye",
    ico:   "👁️",
    title: "Fundus Eye Image",
    desc:  "Retinal and eye cancer screening.",
    fmts:  ["PNG", "JPEG", "BMP", "TIFF"],
    id:    "inp-eye",
  },
  {
    t:     "cer",
    cls:   "uz-cer",
    ico:   "🔬",
    title: "Cervical MRI Scan",
    desc:  "Cervical cancer detection and staging.",
    fmts:  ["DICOM", "PNG", "JPEG", "TIFF"],
    id:    "inp-cer",
  },
];

// uid is passed from Dashboard so useAnalysis can save to Firestore
export default function UploadAnalyze({ uid }) {
  const [file,     setFile]  = useState(null);
  const [scanType, setType]  = useState(null);
  const [drag,     setDrag]  = useState(null);

  const { analyzing, result, saveError, runAnalysis } = useAnalysis(uid);

  const pick = (f, t) => {
    if (!f) return;
    setFile(f);
    setType(t);
  };

  return (
    <div>
      <div className="sec-title">Upload Medical Scan</div>
      <div className="sec-sub">
        Select the scan type, upload your image, then run the AI analysis.
      </div>

      {/* ── Upload Zones ── */}
      <div className="upload-grid">
        {ZONES.map((z) => (
          <div
            key={z.t}
            className={`upload-zone ${z.cls} ${
              (scanType === z.t && file) || drag === z.t ? "uz-active" : ""
            }`}
            onClick={() => document.getElementById(z.id).click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(z.t); }}
            onDragLeave={() => setDrag(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(null);
              pick(e.dataTransfer.files[0], z.t);
            }}
          >
            <span className="uz-ico">{z.ico}</span>
            <div className="uz-title">{z.title}</div>
            <div className="uz-desc">{z.desc}</div>
            <div className="uz-fmts">
              {z.fmts.map((f) => (
                <span className="fmt-chip" key={f}>{f}</span>
              ))}
            </div>
            {scanType === z.t && file && (
              <div className="uz-chosen">✓ {file.name}</div>
            )}
            <input
              id={z.id}
              type="file"
              className="upload-inp"
              onChange={(e) => pick(e.target.files[0], z.t)}
            />
          </div>
        ))}
      </div>

      {/* ── Result Panel ── */}
      <div className="res-card">
        <div className="res-head">
          <div>
            <div className="res-head-t">AI Analysis Result</div>
            <div className="res-head-s">
              {result ? result.model : "No scan processed yet"}
            </div>
          </div>
          <ResultBadge status={result?.status} analyzing={analyzing} />
        </div>

        <div className="res-body">
          {/* Scan viewer */}
          <div className="scan-view">
            <div className="scan-grid-ov" />
            {result ? (
              <>
                <span className="scan-em">
                  {result.scanType.includes("Eye") ? "👁️" : "🔬"}
                </span>
                <div className="scan-wm">
                  CERVIS AI · {result.scanType.toUpperCase()}
                </div>
              </>
            ) : (
              <span className="scan-em" style={{ opacity: 0.22 }}>⬆</span>
            )}
          </div>

          {/* Confidence */}
          <ConfidenceBar value={result?.confidence ?? 0} analyzing={analyzing} />

          {/* Result metadata */}
          {result && (
            <div className="res-meta">
              <div>
                <div className="meta-k">Scan Type</div>
                <div className="meta-v">{result.scanType}</div>
              </div>
              <div>
                <div className="meta-k">Model</div>
                <div className="meta-v">{result.model}</div>
              </div>
              <div>
                <div className="meta-k">Regions Analyzed</div>
                <div className="meta-v" style={{ fontSize: 12 }}>
                  {result.regions}
                </div>
              </div>
              <div>
                <div className="meta-k">Processing Time</div>
                <div className="meta-v">{result.procTime}</div>
              </div>
            </div>
          )}

          {/* Firestore save error — non-blocking warning */}
          {saveError && (
            <div style={{
              marginTop: 12, padding: "8px 12px", borderRadius: 8,
              background: "#fffbeb", border: "1px solid #fde68a",
              color: "#b45309", fontSize: 12,
            }}>
              ⚠ {saveError}
            </div>
          )}

          {/* Result saved confirmation */}
          {result && !saveError && uid && (
            <div style={{
              marginTop: 12, padding: "8px 12px", borderRadius: 8,
              background: "#F1F8E9", border: "1px solid #a7f3d0",
              color: "#2E7D32", fontSize: 12,
            }}>
              ✓ Result saved to your patient history
            </div>
          )}

          {/* Analyze button */}
          <button
            className="analyze-btn"
            onClick={() => runAnalysis(file, scanType)}
            disabled={!file || analyzing}
          >
            {analyzing
              ? <><Spinner /> Running Analysis…</>
              : "▶ Run AI Analysis"}
          </button>
        </div>
      </div>
    </div>
  );
}
