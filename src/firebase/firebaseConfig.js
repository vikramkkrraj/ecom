// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyC7ZIJCDKxmkQSzGQL0v9NIjLXDg-S-1XQ",
  authDomain: "ecom-68292.firebaseapp.com",
  projectId: "ecom-68292",
  storageBucket: "ecom-68292.appspot.com",
  messagingSenderId: "993643669400",
  appId: "1:993643669400:web:4c1fa5c92ecda18698aded",
  measurementId: "G-ZXJ124MY5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireBD = getFirestore(app);
const auth = getAuth(app);

export { fireBD , auth } ;




const analytics = getAnalytics(app);
