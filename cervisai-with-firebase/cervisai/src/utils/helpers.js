// ─── CerVis AI — Utility Helpers ─────────────────────────────────────────────

// Get initials from full name (e.g. "Dr. Sarah Al-Rashid" → "SA")
export function getInitials(name) {
  return name
    .split(" ")
    .filter(w => !w.includes("."))
    .map(w => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Get confidence bar color based on score
export function getConfidenceColor(value) {
  if (value >= 90) return "#2E7D32"; // benign green
  if (value >= 75) return "#b45309"; // warning amber
  return "#A32D2D";                  // malignant red
}

// Format date string
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// Difficulty tag CSS class
export function getDiffClass(difficulty) {
  return difficulty === "Beginner"
    ? "d-B"
    : difficulty === "Intermediate"
    ? "d-I"
    : "d-A";
}

// Risk tag CSS class
export function getRiskClass(risk) {
  return risk === "High" ? "rt-H" : risk === "Moderate" ? "rt-M" : "rt-L";
}
