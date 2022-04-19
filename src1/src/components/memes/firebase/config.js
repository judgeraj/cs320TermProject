import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import '../comps/Auth';

// Your web app's Firebase configuration
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
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export default { firebaseConfig };

  export { projectFirestore, projectStorage, timestamp };