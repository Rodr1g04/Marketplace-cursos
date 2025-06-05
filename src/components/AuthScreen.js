// src/components/AuthScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';

export default function AuthScreen({ navigation, isRegister }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Verifica se a senha é forte: pelo menos 8 caracteres, uma letra maiúscula e um número.
  const verificarSenhaForte = () => {
    return senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha);
  };

  const handleAuth = async () => {
    if (!email || !senha || (isRegister && (!nome || !confirmarSenha))) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    if (isRegister && senha !== confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem');
    }

    setLoading(true);

    try {
      const emailFormatado = email.trim().toLowerCase();
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, emailFormatado, senha);
        const userId = userCredential.user.uid;
        await setDoc(doc(db, 'usuarios', userId), { nome, email: emailFormatado });
        Alert.alert('Sucesso', 'Conta criada!');
      } else {
        await signInWithEmailAndPassword(auth, emailFormatado, senha);
      }
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? 'Criar Conta' : 'Entrar'}</Text>

      {isRegister && (
        <TextInput
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      {isRegister && (
        <>
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            style={styles.input}
            secureTextEntry
          />
          <Animatable.Text
            animation={verificarSenhaForte() ? 'pulse' : 'shake'}
            style={styles.passwordStrength}
          >
            {verificarSenhaForte() ? 'Senha Forte ✅' : 'Senha Fraca ❌'}
          </Animatable.Text>
        </>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#facc15" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isRegister ? 'Cadastrar' : 'Entrar'}</Text>
        </TouchableOpacity>
      )}

      <Text
        style={styles.link}
        onPress={() => navigation.navigate(isRegister ? 'Login' : 'Register')}
      >
        {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Criar conta'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  passwordStrength: { textAlign: 'center', fontWeight: 'bold', color: '#facc15', marginVertical: 5 },
  loader: { marginTop: 15 },
  button: { backgroundColor: '#facc15', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});
