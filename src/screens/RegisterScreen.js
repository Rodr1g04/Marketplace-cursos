// src/screens/RegisterScreen.js
import React from 'react';
import AuthScreen from '../components/AuthScreen';

// Para Registro, isRegister é true
export default function RegisterScreen({ navigation }) {
  return <AuthScreen navigation={navigation} isRegister={true} />;
}
