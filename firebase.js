import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS-u1W47xUY8ES7pGlUP1JV40LxQKjxgs",
  authDomain: "fb-react-clone-88199.firebaseapp.com",
  projectId: "fb-react-clone-88199",
  storageBucket: "fb-react-clone-88199.appspot.com",
  messagingSenderId: "655411710748",
  appId: "1:655411710748:web:46bb980dcb959aed2ac8d9",
  measurementId: "G-8LJYQNE9BJ",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// accessing and using the firestore
const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
