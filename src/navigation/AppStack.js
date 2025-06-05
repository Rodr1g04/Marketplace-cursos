import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import CategoriasScreen from '../screens/CategoriasScreen';
import CursosFiltradosScreen from '../screens/CursosFiltradosScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CursosStack() {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.name === "Cursos") {
      navigation.reset({
        index: 0,
        routes: [{ name: "Categorias" }],
      });
    } else if (route?.params?.screen === "CursosFiltradosScreen") {
      navigation.navigate("CursosFiltradosScreen", { ...route.params.params });
    }
  }, [route]);

  return (
    <Stack.Navigator
      initialRouteName="Categorias"
      screenOptions={{
        headerStyle: { backgroundColor: "#fff", elevation: 0 },
        headerTitleAlign: "center",
        headerTintColor: "#333",
      }}
    >
      <Stack.Screen 
        name="Categorias" 
        component={CategoriasScreen} 
        options={{ title: "Categorias" }} 
      />
      <Stack.Screen 
        name="CursosFiltradosScreen" 
        component={CursosFiltradosScreen} 
        options={{ title: "Cursos Filtrados" }} 
      />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: "#facc15",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerLabel: "Início",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
<Drawer.Screen 
  name="Cursos" 
  component={CursosStack} 
  options={{
    drawerLabel: "Cursos",
    drawerIcon: ({ color, size }) => (
      <MaterialIcons name="menu-book" size={size} color={color} />
    ),
  }}
  listeners={({ navigation }) => ({
    focus: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Categorias" }],
      });
    },
  })}
/>

      <Drawer.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{
          drawerLabel: "Perfil",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
