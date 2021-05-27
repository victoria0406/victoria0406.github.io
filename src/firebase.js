import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAq6XaWDEyfvlrQcao9lmbx1n-hx9mElX0",
  authDomain: "real-dp4.firebaseapp.com",
  projectId: "real-dp4",
  storageBucket: "real-dp4.appspot.com",
  messagingSenderId: "832408248349",
  appId: "1:832408248349:web:a27c36209f065c9200e6f4",
  measurementId: "G-G8N15LCVK8"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
export { db, firebaseApp, firebase ,storage};