// src/hooks/useAuth.js
// ─────────────────────────────────────────────────────────────────────────────
// Re-exports useAuth from AuthContext so components can import from hooks/
// instead of reaching into context/ directly.
//
// Usage in any component:
//   import { useAuth } from "../hooks/useAuth";
//   const { user, loading, logout } = useAuth();
// ─────────────────────────────────────────────────────────────────────────────

export { useAuth } from "../context/AuthContext";
