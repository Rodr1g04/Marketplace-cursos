// src/screens/HomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Lottie from 'lottie-react'; // Para web

import particles from '../../assets/animations/particles.json';

const categorias = [
  {
    nome: 'Negócios',
    imagem: 'https://via.placeholder.com/140x100.png?text=Neg%C3%B3cios',
    icone: 'business-center',
  },
  {
    nome: 'Design',
    imagem: 'https://via.placeholder.com/140x100.png?text=Design',
    icone: 'brush',
  },
  {
    nome: 'Saúde',
    imagem: 'https://via.placeholder.com/140x100.png?text=Sa%C3%BAde',
    icone: 'health-and-safety',
  },
  {
    nome: 'Todos',
    imagem: 'https://via.placeholder.com/140x100.png?text=Todos',
    icone: 'grid-view',
  },
];

export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const baseWidth = width < 768 ? width : 768;

  const cardWidth = baseWidth * 0.38;
  const cardHeight = baseWidth * 0.26;
  const iconSize = baseWidth * 0.07;
  const textFontSize = baseWidth * 0.045;
  const subtitleFontSize = baseWidth * 0.05;

  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCategoriaPress = (categoria) => {
    console.log("Categoria clicada:", categoria);
    navigation.navigate('Cursos', {
      screen: 'CursosFiltradosScreen',
      params: { categoria: categoria.toLowerCase() },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Lottie
        source={particles}
        autoPlay
        loop
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.contentContainer, { paddingBottom: height * 0.04 }]}>
        <Animated.Text
          style={[
            styles.subtitle,
            {
              fontSize: subtitleFontSize,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          Categorias
        </Animated.Text>

        <FlatList
          horizontal
          data={categorias}
          keyExtractor={(item) => item.nome}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryCard,
                {
                  width: cardWidth,
                  height: cardHeight,
                  marginRight: baseWidth * 0.03,
                },
              ]}
              onPress={() => handleCategoriaPress(item.nome)}
            >
              <ImageBackground
                source={{ uri: item.imagem }}
                style={styles.categoryImage}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.overlay}>
                  <MaterialIcons
                    name={item.icone}
                    size={iconSize}
                    color="#000"
                    style={{ marginBottom: 6 }}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      { fontSize: textFontSize, color: '#000' },
                    ]}
                  >
                    {item.nome}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  categoryCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  categoryText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
