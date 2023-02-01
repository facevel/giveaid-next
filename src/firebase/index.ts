// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAjXdmWPPlXnG-5PZF0kxPIxkrzEOLUBMg",
    authDomain: "giveaid-3780a.firebaseapp.com",
    projectId: "giveaid-3780a",
    storageBucket: "giveaid-3780a.appspot.com",
    messagingSenderId: "384796660980",
    appId: "1:384796660980:web:75aedf74ffd8a73789baa1",
};

// Initialize Firebase
if (getApps().length === 0) initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();