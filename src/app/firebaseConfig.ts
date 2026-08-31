// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJBMkGTe7cDJJkrNfZtZimcqD7LbX35bk",
  authDomain: "trabalhoddmreceitas.firebaseapp.com",
  projectId: "trabalhoddmreceitas",
  storageBucket: "trabalhoddmreceitas.firebasestorage.app",
  messagingSenderId: "1071487539503",
  appId: "1:1071487539503:web:dd6a20ec0c4c79a35469da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Exporta os serviços de Autenticação e Banco de Dados para usarmos no app
export const auth = getAuth(app);
export const db = getFirestore(app);