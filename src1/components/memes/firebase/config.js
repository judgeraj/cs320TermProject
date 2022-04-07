import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import '../comps/Auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIHrOzh32YdlSq-GH-z7SB2YPxznw7GUs",
    authDomain: "sun-firegram.firebaseapp.com",
    projectId: "sun-firegram",
    storageBucket: "sun-firegram.appspot.com",
    messagingSenderId: "937870564724",
    appId: "1:937870564724:web:3b1a194732edcdc5782021"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export default { firebaseConfig };

  export { projectFirestore, projectStorage, timestamp };