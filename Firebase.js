/* External Node */
import firebase from "firebase";

/* Internal File */
import "firebase/firebase-firestore";

/* Config api file */
var firebaseConfig = {
    apiKey: "AIzaSyB9fnPiR1VT-30sOuX609_Oi2uekIH89d4",
    authDomain: "hw2-firebasexsensor.firebaseapp.com",
    projectId: "hw2-firebasexsensor",
    storageBucket: "hw2-firebasexsensor.appspot.com",
    messagingSenderId: "952892788600",
    appId: "1:952892788600:web:926690383fe38cecee428d"
};

/* Initialize Firebase */
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

export default firestore;