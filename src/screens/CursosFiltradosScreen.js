// src/screens/CursosFiltradosScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import useCursos from '../hooks/useCursos';
import CursoCard from '../components/CursoCard';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const normalizeString = (str = '') =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export default function CursosFiltradosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const { cursos } = useCursos();
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento

  useEffect(() => {
    setLoading(true); // Ativa o indicador antes de carregar os dados
    console.log("Cursos do Firebase:", cursos);

    if (categoria === 'todos') {
      setCursosFiltrados(cursos);
    } else {
      const filtrados = cursos.filter(
        (curso) =>
          normalizeString(curso.categoria) === categoria.toLowerCase().trim()
      );
      setCursosFiltrados(filtrados);
    }

    // Simulação de atraso no carregamento (pode ser removido quando os dados estiverem prontos)
    setTimeout(() => setLoading(false), 1000);
  }, [cursos, categoria]);

  return (
    <LinearGradient colors={['#ffffff', '#f9f9f9']} style={styles.container}>
      <CustomHeader title="Cursos Filtrados" navigation={navigation} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#facc15" />
          <Animatable.Text animation="fadeIn" style={styles.loadingText}>
            Carregando cursos...
          </Animatable.Text>
        </View>
      ) : (
        <FlatList
          data={cursosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CursoCard curso={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  list: { 
    padding: 20,
  },
});
