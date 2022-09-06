import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyC8pKiLbI5Ykh5RNB7Tqk02L-uDLs2jO1s",
  authDomain: "auth-development-6d839.firebaseapp.com",
  databaseURL: "http://auth-development-6d839.firabaseio.com",
  projectId: "auth-development-6d839",
  storageBucket: "auth-development-6d839.appspot.com",
  messagingSenderId: "998189105264",
  appId: "1:998189105264:web:a043c1b0454886a5c374b5",
};
//initialize firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const methods = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
export default app