// src/components/splash/Splash.jsx
import { useState, useEffect } from "react";
import MicIcon from "../ui/MicIcon";

export default function Splash({ onDone }) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 2500);
    const t2 = setTimeout(onDone, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`splash ${out ? "splash-out" : ""}`}>
      <div className="sp-glow" />
      <div className="sp-inner">
        <div className="sp-icon">
          <MicIcon size={54} />
        </div>
        <div className="sp-name">CerVis AI</div>
        <div className="sp-sub">Eye &amp; Cervical Cancer Detection</div>
        <div className="sp-dot" />
      </div>
    </div>
  );
}
