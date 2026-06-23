// ─── CerVis AI — Brand Color Tokens ──────────────────────────────────────────
// Single source of truth. Never hardcode hex values in components.

export const COLORS = {
  // Primary Brand
  ruby:        "#8B0000",   // sidebar, buttons, logo, nav active
  rubyHover:   "#a01010",
  rubyFaint:   "#fff0f0",
  rubyCard:    "rgba(139,0,0,0.06)",

  // Result Indicators
  malignant:   "#A32D2D",   // positive / high-risk result
  malBg:       "#FFF5F5",
  benign:      "#2E7D32",   // negative / low-risk result
  benignBg:    "#F1F8E9",

  // Secondary Actions
  teal:        "#1D3D3D",
  tealHover:   "#2a5252",

  // App Backgrounds
  snow:        "#FBFBFB",   // main app background
  surface:     "#ffffff",   // card / panel background
  border:      "#e8d5d5",
  border2:     "#d0b8b8",

  // Typography
  text:        "#1a0808",
  text2:       "#3d2020",
  muted:       "#7a5a5a",
  muted2:      "#b09090",

  // Module Accents
  eyeBg:       "#E3F2FD",   // fundus eye scan background
  eyeIcon:     "#1565C0",
  cerBg:       "#FCE4EC",   // cervical scan background
  cerIcon:     "#880E4F",
};
