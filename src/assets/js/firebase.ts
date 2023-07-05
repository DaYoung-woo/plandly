import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const app = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "plandly-net.firebaseapp.com",
    projectId: "plandly-net",
    storageBucket: "plandly-net.appspot.com",
    messagingSenderId: "360026086439",
    appId: import.meta.env.VITE_FIREBASE_API_ID,
    measurementId: "G-LHL3N7K8CG"
});

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
