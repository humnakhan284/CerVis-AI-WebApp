// src/components/auth/Login.jsx
import { useState } from "react";
import AuthLeft from "./AuthLeft";
import Spinner  from "../ui/Spinner";
import { loginUser, resetPassword } from "../../firebase/authService";

// ─── Firebase error codes → human-readable messages ──────────────────────────
function parseFirebaseError(code) {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

export default function Login({ onLogin, onRegister }) {
  const [role,  setRole]  = useState(null);
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [show,  setShow]  = useState(false);
  const [err,   setErr]   = useState("");
  const [busy,  setBusy]  = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // ── Sign In ────────────────────────────────────────────────────────────────
  const submit = async () => {
    setErr("");

    // Client-side validation
    if (!role)  return setErr("Please select your role first.");
    if (!email) return setErr("Email address is required.");
    if (!pass)  return setErr("Password is required.");

    setBusy(true);
    try {
      const user = await loginUser(email, pass, role);
      onLogin(user); // passes user profile up to App.jsx
    } catch (error) {
      const msg = error.message?.startsWith("This account is registered")
        ? error.message                        // our custom role-mismatch message
        : parseFirebaseError(error.code);      // Firebase error code
      setErr(msg);
    } finally {
      setBusy(false);
    }
  };

  // ── Password Reset ─────────────────────────────────────────────────────────
  const handleForgotPassword = async () => {
    if (!email) return setErr("Enter your email address first, then click Forgot password.");
    setBusy(true);
    try {
      await resetPassword(email);
      setResetSent(true);
      setErr("");
    } catch (error) {
      setErr(parseFirebaseError(error.code));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <AuthLeft />

      <div className="auth-r">
        <div className="auth-form">
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in to your CerVis AI account</div>

          {/* ── Role selector ── */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", marginBottom: 8 }}>
            I am a
          </div>
          <div className="role-grid">
            {[
              { id: "doctor",  ico: "🩺", t: "Doctor",  d: "Upload scans & manage patients" },
              { id: "student", ico: "🎓", t: "Student", d: "Study cases & learn AI diagnostics" },
            ].map((r) => (
              <div
                key={r.id}
                className={`role-tile ${role === r.id ? "sel" : ""}`}
                onClick={() => setRole(r.id)}
              >
                <div className="rt-icon">{r.ico}</div>
                <div className="rt-title">{r.t}</div>
                <div className="rt-desc">{r.d}</div>
              </div>
            ))}
          </div>

          {/* ── Banners ── */}
          {err       && <div className="err-banner">⚠ {err}</div>}
          {resetSent && <div className="ok-banner">✓ Password reset email sent. Check your inbox.</div>}

          {/* ── Email ── */}
          <div className="fld">
            <label className="fld-lbl">Email Address</label>
            <input
              className="fld-inp"
              type="email"
              placeholder="you@hospital.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>

          {/* ── Password ── */}
          <div className="fld">
            <label className="fld-lbl">Password</label>
            <div className="pw-wrap">
              <input
                className="fld-inp"
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <button className="pw-toggle" onClick={() => setShow((p) => !p)}>
                {show ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* ── Forgot password ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
            <span
              style={{ fontSize: 13, color: "var(--ruby)", fontWeight: 700, cursor: "pointer" }}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </span>
          </div>

          {/* ── Submit ── */}
          <button className="btn-primary" onClick={submit} disabled={busy}>
            {busy ? <><Spinner /> Signing in…</> : "Sign In →"}
          </button>

          <div className="auth-switch">
            No account?{" "}
            <span className="auth-lnk" onClick={onRegister}>Create one</span>
          </div>
        </div>
      </div>
    </div>
  );
}
