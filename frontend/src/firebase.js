import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyArbhIOgKhmevGMsw13A8dzjxRgqaQTJRc",
    authDomain: "athwela-f5a3d.firebaseapp.com",
    projectId: "athwela-f5a3d",
    storageBucket: "athwela-f5a3d.appspot.com",
    messagingSenderId: "746481070180",
    appId: "1:746481070180:web:b3fa23bb1a02944398af71",
    measurementId: "G-R4RHZPMN99"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db , storage };