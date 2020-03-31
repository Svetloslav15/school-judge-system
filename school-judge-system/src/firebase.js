import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAuWz5piHdKe8msmdZDjQIHlozk6ukpgv0",
    authDomain: "school-judge-system.firebaseapp.com",
    databaseURL: "https://school-judge-system.firebaseio.com",
    projectId: "school-judge-system",
    storageBucket: "school-judge-system.appspot.com",
    messagingSenderId: "99119094965",
    appId: "1:99119094965:web:b2318313ef6b89fc8a32fc",
    measurementId: "G-XC48LF2HR5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;