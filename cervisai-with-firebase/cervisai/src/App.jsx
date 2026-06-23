// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Root component. Wraps the app in AuthProvider so every component
// can access the Firebase session. Manages screen routing only.
// ─────────────────────────────────────────────────────────────────────────────

import { useState }       from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Splash    from "./components/splash/Splash";
import Login     from "./components/auth/Login";
import Register  from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";

// ─── Inner router — reads Firebase auth state ─────────────────────────────────
function AppRouter() {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState("splash");

  // While Firebase is checking the saved session — show nothing (avoid flash)
  if (loading) return null;

  // If Firebase says a user is already logged in (e.g. after page refresh),
  // skip straight to the dashboard.
  if (user && screen !== "dashboard") {
    return <Dashboard user={user} onLogout={() => setScreen("login")} />;
  }

  const handleLogin = (userData) => {
    // AuthContext already has the user from Firebase.
    // We just need to flip the screen.
    setScreen("dashboard");
  };

  return (
    <>
      {screen === "splash"    && <Splash onDone={() => setScreen("login")} />}
      {screen === "login"     && <Login  onLogin={handleLogin} onRegister={() => setScreen("register")} />}
      {screen === "register"  && <Register onLogin={() => setScreen("login")} />}
      {screen === "dashboard" && user && (
        <Dashboard user={user} onLogout={() => setScreen("login")} />
      )}
    </>
  );
}

// ─── Root — wraps everything in AuthProvider ──────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
