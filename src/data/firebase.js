import firebase from "firebase/compat/app";
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyChql8L4Y8BuOsVHp_nkcc7YQndC8k-Mg8",
    authDomain: "adminpanel-4a5ec.firebaseapp.com",
    projectId: "adminpanel-4a5ec",
    storageBucket: "adminpanel-4a5ec.appspot.com",
    messagingSenderId: "631972098076",
    appId: "1:631972098076:web:c8e2ff857bf54fbb16efd9"
};

const fireDatabase = firebase.initializeApp(firebaseConfig);


export default fireDatabase.database().ref();