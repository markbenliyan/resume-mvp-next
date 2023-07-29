// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore'; // Import firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCrAggA8HLrMTZpIe71Im3g5z-pTLEdPE',
  authDomain: 'resume-mvp-next.firebaseapp.com',
  projectId: 'resume-mvp-next',
  storageBucket: 'resume-mvp-next.appspot.com',
  messagingSenderId: '814987965992',
  appId: '1:814987965992:web:4acdd1e2c4792a97eee71d',
  measurementId: 'G-4WRD0R7X3G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
const db = getFirestore(app); // Initialize firestore

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, db }; // Export firestore instance
