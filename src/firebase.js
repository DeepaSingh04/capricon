import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDevHL88llvDNQ0eIXQmOmhxYJV5LA9vPg",
  authDomain: "doctors-f1211.firebaseapp.com",
  projectId: "doctors-f1211",
  storageBucket: "doctors-f1211.firebasestorage.app",
  messagingSenderId: "202789585486",
  appId: "1:202789585486:web:51511a6ce9bc968e1af91f",
  measurementId: "G-ME57HTS2W2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 