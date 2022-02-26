// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCdT7CsCLgKsrqB07bfCG0qgw5fI4AIt60",
  authDomain: "karo-9c91e.firebaseapp.com",
  projectId: "karo-9c91e",
  storageBucket: "karo-9c91e.appspot.com",
  messagingSenderId: "1016393732142",
  appId: "1:1016393732142:web:8520547e11200b53fb8fbf",
  measurementId: "G-PN52417BZ0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = app.firestore();
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const authenticate = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export default database;