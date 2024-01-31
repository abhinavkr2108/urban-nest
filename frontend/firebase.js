// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "urban-nest-d19b0.firebaseapp.com",
  projectId: "urban-nest-d19b0",
  storageBucket: "urban-nest-d19b0.appspot.com",
  messagingSenderId: "360112721089",
  appId: "1:360112721089:web:6f9caffa69782299de9840",
  measurementId: "G-1SDDRXDFJR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
