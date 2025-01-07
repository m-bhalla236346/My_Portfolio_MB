// firebaseConfig.js

// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBtTHx6s40aQwp7QyoCb6atsqOTzNZqis",
  authDomain: "myportfolio-mb.firebaseapp.com",
  projectId: "myportfolio-mb",
  storageBucket: "myportfolio-mb.appspot.com",
  messagingSenderId: "54476683528",
  appId: "1:54476683528:web:3cf948d59b21eda56d94bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance
export { db };
