// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYmFgUz9OK1d66ieWv8of_RO0He5LXaMQ",
  authDomain: "chat-decryption.firebaseapp.com",
  projectId: "chat-decryption",
  storageBucket: "chat-decryption.firebasestorage.app",
  messagingSenderId: "462915780204",
  appId: "1:462915780204:web:b7022acbbd878c51cc6249",
  measurementId: "G-G6LKR68001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db} ;


export default app;