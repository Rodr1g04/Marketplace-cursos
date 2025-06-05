import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQ_A-MpIq4IAaTG2wzbGeeHyTtKygMMLw",
  authDomain: "marketplacecursos-iesb.firebaseapp.com",
  projectId: "marketplacecursos-iesb",
  storageBucket: "marketplacecursos-iesb.appspot.com",
  messagingSenderId: "582265222784",
  appId: "1:582265222784:web:e3b3510977e10736e89865"
};

// ✅ Verifica se já tem app inicializado para evitar erro de duplicidade
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
