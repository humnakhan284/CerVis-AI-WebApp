// src/firebase/authService.js
// ─────────────────────────────────────────────────────────────────────────────
// All Firebase Authentication + Firestore user logic lives here.
// Components never call Firebase directly — they call these functions.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebaseConfig";

// ─── REGISTER ────────────────────────────────────────────────────────────────
// Creates a Firebase Auth account, then saves the user profile
// (role, name, specialty, institution) to Firestore under /users/{uid}

export async function registerUser({ firstName, lastName, email, password, role, institution, specialty }) {
  // 1. Create Firebase Auth account
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const uid        = credential.user.uid;

  // 2. Build display name
  const name = `${role === "doctor" ? "Dr. " : ""}${firstName} ${lastName}`;

  // 3. Save profile to Firestore
  await setDoc(doc(db, "users", uid), {
    uid,
    name,
    email,
    role,
    institution,
    specialty: specialty || institution,
    createdAt: serverTimestamp(),
  });

  // 4. Return the user profile object (same shape used by the app)
  return { uid, name, email, role, specialty: specialty || institution };
}


// ─── LOGIN ───────────────────────────────────────────────────────────────────
// Signs in with Firebase Auth, then fetches the Firestore profile to get
// the user's role and specialty (Firebase Auth doesn't store custom fields).

export async function loginUser(email, password, selectedRole) {
  // 1. Authenticate with Firebase
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const uid        = credential.user.uid;

  // 2. Fetch the user profile from Firestore
  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) {
    throw new Error("User profile not found. Please contact support.");
  }

  const profile = snap.data();

  // 3. Check that the selected role matches the stored role
  if (profile.role !== selectedRole) {
    await signOut(auth); // sign out immediately
    throw new Error(`This account is registered as a ${profile.role}, not a ${selectedRole}.`);
  }

  // 4. Return the full profile
  return {
    uid:       profile.uid,
    name:      profile.name,
    email:     profile.email,
    role:      profile.role,
    specialty: profile.specialty,
  };
}


// ─── LOGOUT ──────────────────────────────────────────────────────────────────
export async function logoutUser() {
  await signOut(auth);
}


// ─── PASSWORD RESET ──────────────────────────────────────────────────────────
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}


// ─── AUTH STATE LISTENER ─────────────────────────────────────────────────────
// Use this in AuthContext to listen for Firebase session changes
// (handles page refresh, tab close, etc.)

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}


// ─── GET USER PROFILE FROM FIRESTORE ─────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}
