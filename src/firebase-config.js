import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyApKU1ShV8BSmIiT80A5R0j-nD9Uy1zosQ',
  authDomain: 'calu-f1f83.firebaseapp.com',
  projectId: 'calu-f1f83',
  storageBucket: 'calu-f1f83.appspot.com',
  messagingSenderId: '438340692271',
  appId: '1:438340692271:web:2c2ac73c9ac1b57c3559da',
  measurementId: 'G-DQE7303QW7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configura la persistencia de autenticación a 'LOCAL'
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistencia de autenticación configurada correctamente.');
  })
  .catch((error) => {
    console.error('Error al configurar la persistencia de autenticación:', error);
  });

const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage };
