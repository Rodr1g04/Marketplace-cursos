import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Adiciona um novo curso
export const adicionarCurso = async (curso) => {
  try {
    const docRef = await addDoc(collection(db, 'cursos'), curso);
    console.log('Curso adicionado com ID:', docRef.id);
  } catch (error) {
    console.error('Erro ao adicionar curso:', error);
  }
};

// Busca todos os cursos
export const buscarCursos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cursos'));
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    return lista;
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    return [];
  }
};
