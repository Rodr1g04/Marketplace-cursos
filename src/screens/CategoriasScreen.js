// src/screens/CategoriasScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { normalizeString } from '../utils';

const categorias = [
  { id: '1', nome: 'Programação', cor: '#60a5fa', icone: 'code' },
  { id: '2', nome: 'Design', cor: '#f472b6', icone: 'pen-tool' },
  { id: '3', nome: 'Marketing', cor: '#34d399', icone: 'trending-up' },
  { id: '4', nome: 'Negócios', cor: '#fbbf24', icone: 'briefcase' },
  { id: '5', nome: 'Saúde', cor: '#e11d48', icone: 'heart' },
];

export default function CategoriasScreen({ navigation }) {
  const abrirCategoria = (categoria) => {
    const categoriaFormatada = normalizeString(categoria);
    navigation.navigate('CursosFiltradosScreen', { categoria: categoriaFormatada });
  };

  return (
    <LinearGradient colors={['#4f46e5', '#60a5fa']} style={styles.container}>
      <Animatable.Text animation="fadeInDown" duration={1000} style={styles.titulo}>
        
      </Animatable.Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.card, { backgroundColor: item.cor }]}
              onPress={() => abrirCategoria(item.nome)}
            >
              <Feather name={item.icone} size={28} color="#fff" style={styles.icon} />
              <Text style={styles.nome}>{item.nome}</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
        contentContainerStyle={styles.lista}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 60, 
    paddingHorizontal: 16,
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#fff',
    textAlign: 'center',
  },
  lista: { 
    paddingBottom: 20,
  },
  cardWrapper: { 
    marginBottom: 12 
  },
  card: { 
    borderRadius: 12, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  nome: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#fff' 
  },
  icon: { 
    marginBottom: 8 
  },
});
