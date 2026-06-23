// src/components/layout/Sidebar.jsx
import MicIcon from "../ui/MicIcon";
import { DOCTOR_NAV, STUDENT_NAV, SHARED_NAV } from "../../constants/navConfig";
import { getInitials } from "../../utils/helpers";

export default function Sidebar({ user, activeNav, onNavChange, onLogout }) {
  const isDoc  = user.role === "doctor";
  const items  = isDoc ? DOCTOR_NAV : STUDENT_NAV;

  return (
    <aside className="sb">

      {/* ── Logo ── */}
      <div className="sb-logo">
        <div className="sb-li">
          <MicIcon size={20} />
        </div>
        <div>
          <div className="sb-ln">CerVis AI</div>
          <div className="sb-ls">Medical Platform</div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="sb-nav">
        <div className="sb-sec">{isDoc ? "Clinical Tools" : "Learning"}</div>

        {items.map((item) => (
          <button
            key={item.id}
            className={`sb-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => onNavChange(item.id)}
          >
            <span className="sb-ico">{item.icon}</span>
            {item.label}
            {activeNav === item.id && <span className="sb-dot" />}
          </button>
        ))}

        <div className="sb-sec" style={{ marginTop: 8 }}>General</div>

        {SHARED_NAV.map((item) => (
          <button
            key={item.id}
            className={`sb-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => onNavChange(item.id)}
          >
            <span className="sb-ico">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* ── User Footer ── */}
      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-av">{getInitials(user.name)}</div>
          <div>
            <div className="sb-un">{user.name}</div>
            <div className="sb-ur">{user.specialty}</div>
          </div>
        </div>
        <button className="sb-out" onClick={onLogout}>↩ Sign Out</button>
      </div>

    </aside>
  );
}
