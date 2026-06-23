// src/firebase/firebaseConfig.js
// ─────────────────────────────────────────────────────────────────────────────
// Firebase project configuration.
// All values come from your .env file — never hardcode them here.
//
// HOW TO GET THESE VALUES:
//   1. Go to https://console.firebase.google.com
//   2. Open your project → Project Settings → General
//   3. Scroll to "Your apps" → click the web app (</>)
//   4. Copy the firebaseConfig object values into your .env file
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp }   from "firebase/app";
import { getAuth }         from "firebase/auth";
import { getFirestore }    from "firebase/firestore";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db   = getFirestore(app);

export default app;
