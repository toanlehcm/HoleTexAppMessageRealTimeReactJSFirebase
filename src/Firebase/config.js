// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; //FacebookAuthProvider
import { getFirestore } from "firebase/firestore";
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
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
// const fbProvider = new FacebookAuthProvider();

// Adding necessary scopes (permissions)
// fbProvider.addScope('email');
// fbProvider.addScope('public_profile');

export { auth, db, analytics } //fbProvider
export default firebaseApp