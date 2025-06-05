import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { normalizeString } from '../utils';


export default function CursoScreen({ navigation }) {
  // Lista estática de categorias com nome e ícone (ícones do Feather)
  const categorias = [
    { nome: 'Negócios', icone: 'briefcase' },
    { nome: 'Design', icone: 'pen-tool' },
    { nome: 'Saúde', icone: 'heart' },
    { nome: 'Tecnologia', icone: 'cpu' },
  ];

  // Ao tocar em uma categoria, navega para a tela dos cursos filtrados
  const handleCategoriaPress = (categoria) => {
  const categoriaFormatada = normalizeString(categoria.nome);
  navigation.navigate('CursosFiltradosScreen', { categoria: categoriaFormatada });
};


  // Renderiza cada categoria com animação e botão
  const renderCategoria = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 200}
      style={styles.card}
    >
      <TouchableOpacity style={styles.button} onPress={() => handleCategoriaPress(item)}>
        <Feather name={item.icone} size={24} color="#333" style={styles.icon} />
        <Text style={styles.cardText}>{item.nome}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categorias}
        renderItem={renderCategoria}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333' 
  },
  list: { paddingBottom: 20 },
  card: { 
    marginBottom: 15, 
    borderRadius: 10, 
    overflow: 'hidden', 
    elevation: 2, 
    backgroundColor: '#fff' 
  },
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#facc15', 
    borderRadius: 10 
  },
  icon: { marginRight: 12 },
  cardText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
});
