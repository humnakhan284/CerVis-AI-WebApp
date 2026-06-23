// src/components/auth/AuthLeft.jsx
import MicIcon from "../ui/MicIcon";

const FEATURES = [
  { ico: "🔬", t: "Cervical MRI Analysis",  d: "AI-assisted staging and lesion detection" },
  { ico: "👁️", t: "Fundus Eye Screening",    d: "Retinal pathology and cancer screening" },
  { ico: "📚", t: "Medical Education",        d: "Real case library for students" },
];

export default function AuthLeft() {
  return (
    <div className="auth-l">
      <div className="al-inner">
        <div className="al-icon">
          <MicIcon size={38} />
        </div>
        <div className="al-brand">CerVis AI</div>
        <div className="al-sub">AI-Powered Medical Imaging Platform</div>

        <div className="al-feats">
          {FEATURES.map((f) => (
            <div className="al-feat" key={f.t}>
              <div className="al-ficon">{f.ico}</div>
              <div>
                <div className="aft">{f.t}</div>
                <div className="afd">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
