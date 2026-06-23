// src/components/layout/Topbar.jsx
import { PAGE_TITLES } from "../../constants/navConfig";

export default function Topbar({ activeNav, isDoctor, onNewScan }) {
  const { title, sub } = PAGE_TITLES[activeNav] ?? { title: "Dashboard", sub: "" };

  return (
    <div className="topbar">
      <div>
        <div className="pg-title">{title}</div>
        <div className="pg-sub">{sub}</div>
      </div>

      <div className="tb-r">
        <div className="notif-btn">
          🔔
          <span className="notif-dot" />
        </div>

        <button className="tb-btn">📤 Export</button>

        {isDoctor && (
          <button className="tb-btn ruby" onClick={onNewScan}>
            + New Scan
          </button>
        )}
      </div>
    </div>
  );
}
