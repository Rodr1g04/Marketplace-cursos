// src/hooks/useCursos.js
import { useState, useEffect } from 'react';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

export default function useCursos() {
  const [cursos, setCursos] = useState([]);

  const exemplos = [
    { id: '1', title: 'Marketing Digital', professor: 'João Silva', preco: 120, descricao: 'Curso de marketing', categoria: 'negócios', imagem: 'https://via.placeholder.com/100' },
    { id: '2', title: 'Gestão de Projetos', professor: 'Maria Souza', preco: 150, descricao: 'Curso de projetos', categoria: 'negócios', imagem: 'https://via.placeholder.com/100' },
    { id: '3', title: 'Design Gráfico', professor: 'Ana Costa', preco: 130, descricao: 'Curso de design', categoria: 'design', imagem: 'https://via.placeholder.com/100' },
    { id: '4', title: 'UX/UI Design', professor: 'Pedro Lima', preco: 140, descricao: 'Curso de UX/UI', categoria: 'design', imagem: 'https://via.placeholder.com/100' },
    { id: '5', title: 'Nutrição Básica', professor: 'Carla Mendes', preco: 110, descricao: 'Curso de nutrição', categoria: 'saúde', imagem: 'https://via.placeholder.com/100' },
    { id: '6', title: 'Treinamento Funcional', professor: 'Rafael Rocha', preco: 125, descricao: 'Curso de fitness', categoria: 'saúde', imagem: 'https://via.placeholder.com/100' },
    // Novo curso para a categoria "saúde"
    { id: '8', title: 'Enfermagem Básica', professor: 'Dr. Silva', preco: 150, descricao: 'Curso de Enfermagem', categoria: 'saúde', imagem: 'https://via.placeholder.com/100' },
  ].map(curso => ({ ...curso, categoria: curso.categoria.trim().toLowerCase() }));

  const carregarCursos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'cursos'));
      if (!snapshot.empty) {
        const cursosFirebase = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          categoria: doc.data().categoria?.trim().toLowerCase() || 'desconhecido',
        }));
        setCursos(cursosFirebase);
      } else {
        setCursos(exemplos);
      }
    } catch (error) {
      setCursos(exemplos);
    }
  };

  useEffect(() => {
    carregarCursos();

    const unsubscribe = onSnapshot(collection(db, 'cursos'), (snapshot) => {
      const cursosRealtime = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        categoria: doc.data().categoria?.trim().toLowerCase() || 'desconhecido',
      }));
      setCursos(cursosRealtime);
    });

    return () => unsubscribe();
  }, []);

  return { cursos, carregarCursos };
}
