// src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Global auth state. Listens to Firebase session so the user stays
// logged in after a page refresh — no more getting kicked to login.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthChange, getUserProfile } from "../firebase/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // true while Firebase checks session

  // Listen to Firebase auth state on mount.
  // If the user already has a valid session (e.g. after page refresh),
  // fetch their Firestore profile and restore it automatically.
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUser(profile ?? null);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const login  = (userData) => setUser(userData);
  const logout = ()         => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
