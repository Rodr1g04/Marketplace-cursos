import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
