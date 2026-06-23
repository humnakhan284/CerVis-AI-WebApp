// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ── Styles (order matters) ────────────────────────────────────────────────────
import "./styles/globals.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/components.css";
import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
