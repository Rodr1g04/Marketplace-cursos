import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function adicionarCurso(curso) {
  try {
    const docRef = await addDoc(collection(db, "cursos"), curso);
    console.log("Curso adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar curso: ", e);
  }
}

export async function listarCursos() {
  try {
    const querySnapshot = await getDocs(collection(db, "cursos"));
    let cursos = [];
    querySnapshot.forEach((doc) => {
      cursos.push({ id: doc.id, ...doc.data() });
    });
    return cursos;
  } catch (e) {
    console.error("Erro ao listar cursos: ", e);
    return [];
  }
}
