
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALB6-2NrsaMKkKTJAqp4XIzVsAlMaZvHM",
  authDomain: "solcraft-bcd56.firebaseapp.com",
  projectId: "solcraft-bcd56",
  storageBucket: "solcraft-bcd56.firebasestorage.app",
  messagingSenderId: "902122750873",
  appId: "1:902122750873:web:d114b1a83f4e96bbc8c908",
  measurementId: "G-97SYRDPN33"
};

// Initialize Firebase App robustly
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use the existing app if already initialized
}

// Initialize Firebase services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Analytics is client-side only
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Failed to initialize Firebase Analytics", error);
  }
}

export { app, auth, db, storage, analytics, firebaseConfig };
