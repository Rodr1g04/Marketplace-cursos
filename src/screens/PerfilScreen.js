// src/screens/PerfilScreen.js
import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, Image, StyleSheet, Alert,
  TouchableOpacity, ActivityIndicator, useColorScheme, ScrollView,
  useWindowDimensions, SafeAreaView
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../firebaseConfig.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

export default function PerfilScreen() {
  const { user, logout } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [editando, setEditando] = useState(false);
  const [loadingPerfil, setLoadingPerfil] = useState(true);
  
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!user?.uid) {
      Alert.alert('Erro', 'Usuário não encontrado');
      setLoadingPerfil(false);
      return;
    }
    const userRef = doc(db, 'usuarios', user.uid);
    const carregarDados = async () => {
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome || '');
          setFotoUrl(data.fotoUrl || '');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados');
      }
      setLoadingPerfil(false);
    };
    carregarDados();
  }, [user]);

  const salvarPerfil = async () => {
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      await setDoc(userRef, {
        nome,
        fotoUrl,
        email: user.email,
      });
      Alert.alert('Sucesso', 'Perfil atualizado!');
      setEditando(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const selecionarImagem = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Permita acesso à galeria para escolher uma foto.");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!pickerResult.canceled) {
      setFotoUrl(pickerResult.assets[0].uri);
    }
  };

  if (loadingPerfil) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#555'} />
        <Text style={[styles.loadingText, { color: isDark ? '#fff' : '#333' }]}>Carregando perfil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#333', fontSize: width * 0.06 }]}>Meu Perfil</Text>
        {fotoUrl ? (
          <Image source={{ uri: fotoUrl }} style={[styles.avatar, { width: width * 0.4, height: width * 0.4, borderRadius: (width * 0.4) / 2 }]} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder, { width: width * 0.4, height: width * 0.4, borderRadius: (width * 0.4) / 2 }]}>
            <Feather name="user" size={48} color={isDark ? '#aaa' : '#999'} />
          </View>
        )}
        {editando ? (
          <>
            <TouchableOpacity style={styles.selectButton} onPress={selecionarImagem}>
              <Text style={styles.selectButtonText}>Selecionar Foto do Dispositivo</Text>
            </TouchableOpacity>
            <Text style={[styles.label, { color: isDark ? '#ddd' : '#555' }]}>Nome</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
              placeholderTextColor={isDark ? '#777' : '#aaa'}
              style={[styles.input, { backgroundColor: isDark ? '#222' : '#fafafa', color: isDark ? '#fff' : '#000', width: width * 0.9 }]}
            />
            <TouchableOpacity style={styles.button} onPress={salvarPerfil}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.nomeContainer}>
            <Text style={[styles.nome, { color: isDark ? '#fff' : '#333', fontSize: width * 0.05 }]}>{nome || 'Sem nome'}</Text>
            <TouchableOpacity onPress={() => setEditando(true)}>
              <Feather name="edit-2" size={20} color={isDark ? '#fff' : '#555'} />
            </TouchableOpacity>
          </View>
        )}
        <Text style={[styles.email, { color: isDark ? '#aaa' : '#666' }]}>{user.email}</Text>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontWeight: '600', marginBottom: 30 },
  avatar: { backgroundColor: '#eee', marginBottom: 20 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  label: { alignSelf: 'flex-start', marginTop: 10, marginBottom: 5, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  nomeContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  nome: { fontWeight: '500' },
  email: { marginVertical: 10, fontStyle: 'italic' },
  button: { backgroundColor: '#555', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginTop: 10, alignItems: 'center', width: '90%' },
  logoutButton: { backgroundColor: '#999' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  selectButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginBottom: 10 },
  selectButtonText: { color: '#fff', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16 },
});
