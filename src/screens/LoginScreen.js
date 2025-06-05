// src/screens/LoginScreen.js
import React from 'react';
import AuthScreen from '../components/AuthScreen';

// Para Login, a prop isRegister deve ser false
export default function LoginScreen({ navigation }) {
  return <AuthScreen navigation={navigation} isRegister={false} />;
}
