// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa1qbnZbpHJzD8EVQMbdEfi6otzfO8lig",
  authDomain: "problemsolver-geekconvert.firebaseapp.com",
  projectId: "problemsolver-geekconvert",
  storageBucket: "problemsolver-geekconvert.firebasestorage.app",
  messagingSenderId: "791491875311",
  appId: "1:791491875311:web:bcf670d4294fa43736a61a",
  measurementId: "G-N8EQEW9ZPC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.languageCode = "it";

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  login_hint: "user@example.com",
});

const analytics = getAnalytics(app);
