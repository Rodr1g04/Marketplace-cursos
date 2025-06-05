// src/components/CursoCard.js
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function CursoCard({ curso, onPress }) {
  const imagemPadrao = "https://via.placeholder.com/100";
  return (
    <Animatable.View animation="fadeInUp" duration={500} delay={100} useNativeDriver>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: curso.imagem || imagemPadrao }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{curso.title}</Text>
          <Text style={styles.prof}>com {curso.professor}</Text>
          <Text style={styles.description}>{curso.descricao}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>R$ {curso.preco ? curso.preco.toFixed(2) : "Indisponível"}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: { 
    width: 100, 
    height: '100%' 
  },
  info: { 
    flex: 1, 
    padding: 12, 
    justifyContent: 'space-between' 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4 
  },
  prof: { 
    fontSize: 13, 
    color: '#777', 
    marginBottom: 4 
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  price: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#facc15' 
  },
});
