// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
let analytics: Analytics | null = null;

// Ensure Firebase is initialized only on the client side
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
} else {
  // On the server side, initialize a minimal app instance if needed,
  // or handle as appropriate for your SSR/SSG strategy.
  // For now, we'll just initialize the app object for type consistency.
  app = initializeApp(firebaseConfig);
}


export { app, analytics, firebaseConfig };
