import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase web config is safe to expose in client-side code (it's public by design).
// Env vars are used locally; fallback values ensure the hosted site works correctly.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCHgogC4R18tLcum5XnsAsLKCL27Rqre5k",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "votewiseai-fe973.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "votewiseai-fe973",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "votewiseai-fe973.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "880334773461",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:880334773461:web:41e052e1d37a97089cd65c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KE8YMDS7WF",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
