import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBCCUuAXzkR0MMpZcm2OmqM-lsdt2CatWs",
    authDomain: "chat-app-7ffb5.firebaseapp.com",
    projectId: "chat-app-7ffb5",
    storageBucket: "chat-app-7ffb5.appspot.com",
    messagingSenderId: "857779485164",
    appId: "1:857779485164:web:a2f179da794acec70e68c9",
    measurementId: "G-WKHKDS27KT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080')
}

export { db, auth }
export default firebase