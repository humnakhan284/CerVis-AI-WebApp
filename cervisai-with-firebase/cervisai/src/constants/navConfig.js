// ─── CerVis AI — Sidebar Navigation Config ───────────────────────────────────

export const DOCTOR_NAV = [
  { id: "upload",  icon: "⬆",  label: "Upload & Analyze" },
  { id: "history", icon: "📋", label: "Patient History" },
  { id: "reports", icon: "📊", label: "Reports" },
];

export const STUDENT_NAV = [
  { id: "education", icon: "📚", label: "Case Library" },
  { id: "history",   icon: "🕐", label: "Study History" },
];

export const SHARED_NAV = [
  { id: "settings", icon: "⚙",  label: "Settings" },
  { id: "help",     icon: "❓", label: "Help & Docs" },
];

export const PAGE_TITLES = {
  upload:    { title: "Upload & Analyze",  sub: "Submit a scan for AI-powered cancer detection" },
  history:   { title: "Patient History",   sub: "Browse and search diagnostic records" },
  reports:   { title: "Reports",           sub: "Aggregate analytics and summaries" },
  education: { title: "Case Library",      sub: "Study real medical cases and AI diagnostics" },
  settings:  { title: "Settings",          sub: "Account and platform preferences" },
  help:      { title: "Help & Docs",       sub: "Documentation and support" },
};
