// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore'; // new version of firebase
import firebase from "firebase/compat/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfyDxbKz-ONSkk75lJt3ukTc5zjy1cFB4",
  authDomain: "chat-app-1a360.firebaseapp.com",
  projectId: "chat-app-1a360",
  storageBucket: "chat-app-1a360.appspot.com",
  messagingSenderId: "657186611079",
  appId: "1:657186611079:web:5b39d6eaed1f304b14fd22",
  measurementId: "G-6VMZX5FVWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }