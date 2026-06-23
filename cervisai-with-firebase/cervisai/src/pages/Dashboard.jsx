// src/pages/Dashboard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Main dashboard shell. Reads the live Firebase user from AuthContext.
// Logout calls Firebase signOut through authService.
// ─────────────────────────────────────────────────────────────────────────────

import { useState }    from "react";
import Sidebar         from "../components/layout/Sidebar";
import Topbar          from "../components/layout/Topbar";
import StatCards       from "../components/dashboard/StatCards";
import UploadAnalyze   from "../components/dashboard/UploadAnalyze";
import PatientHistory  from "../components/dashboard/PatientHistory";
import Education       from "../components/dashboard/Education";
import { logoutUser }  from "../firebase/authService";
import { useAuth }     from "../hooks/useAuth";

export default function Dashboard({ onLogout }) {
  // Pull user from Firebase AuthContext — always fresh, never stale
  const { user, logout } = useAuth();
  const isDoc = user?.role === "doctor";

  const [activeNav, setActiveNav] = useState(isDoc ? "upload" : "education");

  const handleLogout = async () => {
    try {
      await logoutUser();   // sign out from Firebase
      logout();             // clear user from AuthContext
      onLogout();           // tell App.jsx to go to login screen
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleNewScan = () => setActiveNav("upload");

  if (!user) return null;

  return (
    <div className="app">

      {/* ── Sidebar ── */}
      <Sidebar
        user={user}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onLogout={handleLogout}
      />

      {/* ── Main Area ── */}
      <main className="main">

        <Topbar
          activeNav={activeNav}
          isDoctor={isDoc}
          onNewScan={handleNewScan}
        />

        <div className="content">

          {/* Stat cards — shown to doctors on non-history/education views */}
          {isDoc && !["history", "education"].includes(activeNav) && (
            <StatCards />
          )}

          {/* ── Views ── */}
          {activeNav === "upload"    && isDoc  && <UploadAnalyze uid={user.uid} />}
          {activeNav === "history"             && <PatientHistory uid={user.uid} />}
          {activeNav === "education"           && <Education />}

          {/* ── Coming soon ── */}
          {["reports", "settings", "help"].includes(activeNav) && (
            <div className="empty">
              <div className="empty-ic">
                {activeNav === "reports"  ? "📊"
                : activeNav === "settings" ? "⚙️"
                : "📖"}
              </div>
              <div className="empty-tx">
                {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} — coming soon.
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
