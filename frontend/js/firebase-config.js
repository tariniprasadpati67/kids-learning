/**
 * Odia Medium Learning Games - Firebase Configuration & Initialization
 */

const firebaseConfig = {
  apiKey: "AIzaSyAeofVQyLr62IstcdilP5pQc2NpMagXXAc",
  authDomain: "kids-learning-cddd1.firebaseapp.com",
  projectId: "kids-learning-cddd1",
  storageBucket: "kids-learning-cddd1.firebasestorage.app",
  messagingSenderId: "741453917700",
  appId: "1:741453917700:web:cdbde4eb2b4bc102f90f51"
};

// Initialize Firebase
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

if (typeof firebase !== 'undefined') {
  try {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }

    if (firebase.auth) {
      firebaseAuth = firebase.auth();
    }

    if (firebase.firestore) {
      firebaseDb = firebase.firestore();
    }

    console.log("⚡ [Firebase] Connected successfully to project: kids-learning-cddd1");
  } catch (err) {
    console.error("❌ [Firebase] Initialization failed:", err);
  }
} else {
  console.warn("⚠️ [Firebase] SDK not found on window object. Ensure Firebase script tags are included.");
}

// Make globally accessible
window.firebaseConfig = firebaseConfig;
window.firebaseApp = firebaseApp;
window.firebaseAuth = firebaseAuth;
window.firebaseDb = firebaseDb;
