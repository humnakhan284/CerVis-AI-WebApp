// src/firebase/firestoreService.js
// ─────────────────────────────────────────────────────────────────────────────
// All Firestore read/write operations.
// Components never call Firestore directly — they use these functions.
//
// Firestore data structure:
//   /users/{uid}                    ← user profile (name, role, specialty)
//   /patients/{uid}/reports/{id}    ← scan reports for this user
// ─────────────────────────────────────────────────────────────────────────────

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

// ─── USER PROFILE ─────────────────────────────────────────────────────────────

// Get a user's profile by UID
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// Update a user's profile fields
export async function updateUserProfile(uid, fields) {
  await updateDoc(doc(db, "users", uid), {
    ...fields,
    updatedAt: serverTimestamp(),
  });
}

// ─── REPORTS ─────────────────────────────────────────────────────────────────

// Save a new scan report for a user
export async function saveReport(uid, reportData) {
  const ref = await addDoc(collection(db, "patients", uid, "reports"), {
    ...reportData,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// Get all reports for a user (one-time fetch, sorted newest first)
export async function getReports(uid, maxResults = 50) {
  const q    = query(
    collection(db, "patients", uid, "reports"),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Real-time listener for a user's reports
// Returns the unsubscribe function — call it to stop listening
export function listenToReports(uid, onChange, onError) {
  const q = query(
    collection(db, "patients", uid, "reports"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    onChange(data);
  }, onError);
}

// Delete a specific report
export async function deleteReport(uid, reportId) {
  await deleteDoc(doc(db, "patients", uid, "reports", reportId));
}
