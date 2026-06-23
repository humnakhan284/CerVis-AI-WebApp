// src/components/dashboard/Education.jsx
import { useState } from "react";
import Modal from "../ui/Modal";
import { DiffTag } from "../ui/Badge";
import { EDU_CASES } from "../../constants/mockData";
import { getDiffClass } from "../../utils/helpers";

export default function Education() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="sec-title">Educational Case Library</div>
      <div className="sec-sub">
        Study real medical cases and understand how AI identifies disease patterns.
      </div>

      {/* ── Case Grid ── */}
      <div className="edu-grid">
        {EDU_CASES.map((c) => (
          <div className="edu-card" key={c.id}>
            <div className="edu-ban" style={{ background: c.accent }}>
              {c.icon}
            </div>
            <div className="edu-bd">
              <div className="edu-mod">{c.modality} · {c.id}</div>
              <div className="edu-ttl">{c.title}</div>
              <div className="edu-sum">{c.summary}</div>
              <div className="edu-tgs">
                <DiffTag difficulty={c.difficulty} />
                {c.tags.slice(0, 2).map((t) => (
                  <span className="edu-tg" key={t}>{t}</span>
                ))}
              </div>
              <button className="edu-btn" onClick={() => setSelected(c)}>
                Study This Case →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Case Modal ── */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          {/* Header */}
          <div className="modal-hd">
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 5 }}>
                {selected.title}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <DiffTag difficulty={selected.difficulty} />
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  {selected.modality} · {selected.id}
                </span>
              </div>
            </div>
            <button className="modal-x" onClick={() => setSelected(null)}>✕</button>
          </div>

          {/* Body */}
          <div className="modal-bd">
            <div className="info-blk">
              <div className="ib-t">Clinical Presentation</div>
              <div className="ib-p">{selected.summary}</div>
            </div>

            <div className="ai-blk">
              <div className="ib-t">🤖 AI Model Findings</div>
              <div className="ib-p">{selected.aiFindings}</div>
            </div>

            <div className="info-blk">
              <div className="ib-t">Key Learning Objectives</div>
              <ul className="learn-ul">
                {selected.keyLearning.map((l) => (
                  <li className="learn-li" key={l}>{l}</li>
                ))}
              </ul>
            </div>

            <div className="edu-tgs">
              {selected.tags.map((t) => (
                <span className="edu-tg" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
