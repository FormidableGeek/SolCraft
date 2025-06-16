// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
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

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

// Ensure Firebase is initialized only on the client side for services like Analytics
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  analytics = getAnalytics(app);
} else {
  // On the server side, initialize app for other services if needed,
  // but Analytics should only be on client.
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { app, auth, db, storage, analytics, firebaseConfig };
