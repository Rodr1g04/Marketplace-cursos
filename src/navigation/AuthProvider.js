// src/navigation/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export const AuthContext = createContext({
  user: null,
  initializing: true,
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth não inicializado.");
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, initializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
