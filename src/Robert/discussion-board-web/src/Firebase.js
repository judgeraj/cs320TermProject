import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAjSto5d7DXGMG0cJPCnh6fbNBkogds330",
    authDomain: "discussion-board-a2c32.firebaseapp.com",
    projectId: "discussion-board-a2c32",
    storageBucket: "discussion-board-a2c32.appspot.com",
    messagingSenderId: "457145349190",
    appId: "1:457145349190:web:82bb08a3bdd029fec54647",
    measurementId: "G-SDV75EC6QS"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const database = firebaseApp.firestore();
const authentication = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default database;
