// hooks/useAuth.js
import { useState } from 'react';
import { auth } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = async (email, senha) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      setUser(userCredential.user);
      setError('');
    } catch (e) {
      setError('Email ou senha inválidos.');
    }
  };

  const cadastrar = async (email, senha) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      setUser(userCredential.user);
      setError('');
    } catch (e) {
      setError('Erro ao cadastrar. Verifique o email.');
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, login, cadastrar, logout, error };
}
