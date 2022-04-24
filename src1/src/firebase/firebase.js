import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



//vivian's firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDIHrOzh32YdlSq-GH-z7SB2YPxznw7GUs",
//   authDomain: "sun-firegram.firebaseapp.com",
//   projectId: "sun-firegram",
//   storageBucket: "sun-firegram.appspot.com",
//   messagingSenderId: "937870564724",
//   appId: "1:937870564724:web:3b1a194732edcdc5782021"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCdT7CsCLgKsrqB07bfCG0qgw5fI4AIt60",
    authDomain: "karo-9c91e.firebaseapp.com",
    projectId: "karo-9c91e",
    storageBucket: "karo-9c91e.appspot.com",
    messagingSenderId: "1016393732142",
    appId: "1:1016393732142:web:8520547e11200b53fb8fbf",
    measurementId: "G-PN52417BZ0"
};

//robert
// const firebaseConfig = {
//     apiKey: "AIzaSyAjSto5d7DXGMG0cJPCnh6fbNBkogds330",
//     authDomain: "discussion-board-a2c32.firebaseapp.com",
//     projectId: "discussion-board-a2c32",
//     storageBucket: "discussion-board-a2c32.appspot.com",
//     messagingSenderId: "457145349190",
//     appId: "1:457145349190:web:82bb08a3bdd029fec54647",
//     measurementId: "G-SDV75EC6QS"
//   };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.firestore();
  const authenticate = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const projectStorage = firebase.storage();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default database;
export { authenticate, provider, projectStorage, timestamp };


