import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import useCursos from '../hooks/useCursos';
import CursoCard from '../components/CursoCard';

export default function ListaCursosScreen({ navigation, route }) {
  const { cursos } = useCursos();
  const { categoria } = route.params || {};

  const cursosFiltrados =
    categoria && categoria !== 'Todos'
      ? cursos.filter((c) => c.categoria?.toLowerCase() === categoria.toLowerCase())
      : cursos;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {categoria ? `Cursos de ${categoria}` : 'Cursos Disponíveis'}
      </Text>

      <FlatList
        data={cursosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CursoCard
            curso={item}
            onPress={() => navigation.navigate('Detalhes', { curso: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
});
