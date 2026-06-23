// src/components/auth/Register.jsx
import { useState } from "react";
import AuthLeft from "./AuthLeft";
import Spinner  from "../ui/Spinner";
import { registerUser } from "../../firebase/authService";

const DOC_SPECS  = ["Radiology", "Oncology", "Gynecology", "Ophthalmology", "Pathology", "General Medicine"];
const STU_YEARS  = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Intern / Resident", "Research Fellow"];

// ─── Firebase error codes → human-readable messages ──────────────────────────
function parseFirebaseError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 8 characters.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";
    default:
      return "Account creation failed. Please try again.";
  }
}

export default function Register({ onLogin }) {
  const [role, setRole]  = useState(null);
  const [f, setF]        = useState({ fn: "", ln: "", email: "", inst: "", spec: "", pw: "", cpw: "" });
  const [show, setShow]  = useState(false);
  const [agreed, setAgr] = useState(false);
  const [errs, setErrs]  = useState({});
  const [busy, setBusy]  = useState(false);
  const [done, setDone]  = useState(false);
  const [fireErr, setFireErr] = useState("");

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  // ── Client-side validation ─────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!role)                   e.role  = "Select a role.";
    if (!f.fn)                   e.fn    = "Required";
    if (!f.ln)                   e.ln    = "Required";
    if (!f.email.includes("@")) e.email = "Valid email required";
    if (!f.inst)                 e.inst  = "Required";
    if (f.pw.length < 8)         e.pw    = "Minimum 8 characters";
    if (f.pw !== f.cpw)          e.cpw   = "Passwords do not match";
    if (!agreed)                 e.agr   = "Please accept the terms.";
    return e;
  };

  // ── Submit to Firebase ─────────────────────────────────────────────────────
  const submit = async () => {
    setFireErr("");
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    try {
      await registerUser({
        firstName:   f.fn,
        lastName:    f.ln,
        email:       f.email,
        password:    f.pw,
        role,
        institution: f.inst,
        specialty:   f.spec,
      });
      setDone(true);
    } catch (error) {
      setFireErr(parseFirebaseError(error.code));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <AuthLeft />

      <div className="auth-r" style={{ alignItems: "flex-start", paddingTop: 36 }}>
        <div className="auth-form" style={{ paddingBottom: 44 }}>
          <div className="auth-title">Create account</div>
          <div className="auth-sub">Join CerVis AI — free to get started</div>

          {/* ── Success state ── */}
          {done ? (
            <>
              <div className="ok-banner">
                ✓ Account created! You can now sign in.
              </div>
              <button className="btn-primary" onClick={onLogin}>
                Go to Sign In →
              </button>
            </>
          ) : (
            <>
              {/* ── Firebase-level error banner ── */}
              {fireErr && <div className="err-banner">⚠ {fireErr}</div>}

              {/* ── Role ── */}
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", marginBottom: 8 }}>
                I am a
              </div>
              <div className="role-grid" style={{ marginBottom: errs.role ? 6 : 20 }}>
                {[
                  { id: "doctor",  ico: "🩺", t: "Doctor",  d: "Clinician or radiologist" },
                  { id: "student", ico: "🎓", t: "Student", d: "Medical student or trainee" },
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
              {errs.role && <div className="fld-err" style={{ marginBottom: 10 }}>⚠ {errs.role}</div>}

              {/* ── Name ── */}
              <div className="fld-row">
                <div className="fld">
                  <label className="fld-lbl">First Name</label>
                  <input
                    className={`fld-inp ${errs.fn ? "err" : ""}`}
                    placeholder="Sarah"
                    value={f.fn}
                    onChange={(e) => set("fn", e.target.value)}
                  />
                  {errs.fn && <div className="fld-err">{errs.fn}</div>}
                </div>
                <div className="fld">
                  <label className="fld-lbl">Last Name</label>
                  <input
                    className={`fld-inp ${errs.ln ? "err" : ""}`}
                    placeholder="Al-Rashid"
                    value={f.ln}
                    onChange={(e) => set("ln", e.target.value)}
                  />
                  {errs.ln && <div className="fld-err">{errs.ln}</div>}
                </div>
              </div>

              {/* ── Email ── */}
              <div className="fld">
                <label className="fld-lbl">Email Address</label>
                <input
                  className={`fld-inp ${errs.email ? "err" : ""}`}
                  type="email"
                  placeholder="you@hospital.org"
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                {errs.email && <div className="fld-err">{errs.email}</div>}
              </div>

              {/* ── Institution ── */}
              <div className="fld">
                <label className="fld-lbl">
                  {role === "student" ? "University / Medical School" : "Hospital / Institution"}
                </label>
                <input
                  className={`fld-inp ${errs.inst ? "err" : ""}`}
                  placeholder={role === "student" ? "e.g. University of Khartoum" : "e.g. King Faisal Hospital"}
                  value={f.inst}
                  onChange={(e) => set("inst", e.target.value)}
                />
                {errs.inst && <div className="fld-err">{errs.inst}</div>}
              </div>

              {/* ── Specialty / Year ── */}
              <div className="fld">
                <label className="fld-lbl">
                  {role === "student" ? "Year of Study" : "Specialty"}
                </label>
                <select
                  className="fld-sel"
                  value={f.spec}
                  onChange={(e) => set("spec", e.target.value)}
                >
                  <option value="">Select…</option>
                  {(role === "student" ? STU_YEARS : DOC_SPECS).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* ── Password ── */}
              <div className="fld">
                <label className="fld-lbl">Password</label>
                <div className="pw-wrap">
                  <input
                    className={`fld-inp ${errs.pw ? "err" : ""}`}
                    type={show ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={f.pw}
                    onChange={(e) => set("pw", e.target.value)}
                  />
                  <button className="pw-toggle" onClick={() => setShow((p) => !p)}>
                    {show ? "🙈" : "👁"}
                  </button>
                </div>
                {errs.pw && <div className="fld-err">{errs.pw}</div>}
              </div>

              {/* ── Confirm password ── */}
              <div className="fld">
                <label className="fld-lbl">Confirm Password</label>
                <input
                  className={`fld-inp ${errs.cpw ? "err" : ""}`}
                  type="password"
                  placeholder="Repeat password"
                  value={f.cpw}
                  onChange={(e) => set("cpw", e.target.value)}
                />
                {errs.cpw && <div className="fld-err">{errs.cpw}</div>}
              </div>

              {/* ── Terms ── */}
              <div className="check-row">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgr(e.target.checked)}
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <span style={{ color: "var(--ruby)", fontWeight: 700 }}>Terms of Service</span>{" "}
                  and{" "}
                  <span style={{ color: "var(--ruby)", fontWeight: 700 }}>Privacy Policy</span>.
                  Patient data handled per HIPAA &amp; GDPR.
                </label>
              </div>
              {errs.agr && (
                <div className="fld-err" style={{ marginBottom: 8 }}>⚠ {errs.agr}</div>
              )}

              {/* ── Submit ── */}
              <button className="btn-primary" onClick={submit} disabled={busy}>
                {busy ? <><Spinner /> Creating account…</> : "Create Account →"}
              </button>

              <div className="auth-switch">
                Already have an account?{" "}
                <span className="auth-lnk" onClick={onLogin}>Sign in</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
