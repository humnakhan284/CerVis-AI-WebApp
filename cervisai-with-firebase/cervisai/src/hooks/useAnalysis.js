// src/hooks/useAnalysis.js
// ─────────────────────────────────────────────────────────────────────────────
// Handles AI scan analysis logic.
// After a result is produced, it is saved to Firestore under:
//   /patients/{uid}/reports/{autoId}
//
// Swap the mock setTimeout block with a real fetch() to your ML backend.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useAnalysis(uid) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result,    setResult]    = useState(null);
  const [saveError, setSaveError] = useState(null);

  const runAnalysis = async (file, scanType) => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);
    setSaveError(null);

    // ── MOCK: replace this block with your real ML API call ──────────────────
    await new Promise((resolve) => setTimeout(resolve, 2800));

    const isPositive = Math.random() > 0.4;
    const isEye      = scanType === "eye";

    const analysisResult = {
      status:      isPositive ? "Positive" : "Negative",
      confidence:  +(75 + Math.random() * 22).toFixed(1),
      scanType:    isEye ? "Fundus Eye" : "MRI Cervical",
      model:       isEye ? "RetinaScope-v2" : "CervixNet-v3",
      procTime:    (1.1 + Math.random() * 0.9).toFixed(2) + "s",
      regions:     isEye
        ? "Optic disc, macula, periphery"
        : "Transformation zone, endocervical canal",
    };
    // ── END MOCK ──────────────────────────────────────────────────────────────

    // ── REAL API (uncomment when backend ready) ───────────────────────────────
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("type", scanType);
    //
    // const response  = await fetch("/api/analyze", { method: "POST", body: formData });
    // const analysisResult = await response.json();
    // ─────────────────────────────────────────────────────────────────────────

    setResult(analysisResult);
    setAnalyzing(false);

    // ── Save result to Firestore ──────────────────────────────────────────────
    // Only saves if a logged-in user's uid is passed in.
    if (uid) {
      try {
        await addDoc(collection(db, "patients", uid, "reports"), {
          ...analysisResult,
          fileName:  file.name,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        // Don't block the UI — just log the save error quietly
        console.error("Failed to save report to Firestore:", err);
        setSaveError("Result could not be saved to your history.");
      }
    }
  };

  const reset = () => {
    setResult(null);
    setSaveError(null);
  };

  return { analyzing, result, saveError, runAnalysis, reset };
}
