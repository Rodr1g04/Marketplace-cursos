// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import AuthProvider, { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

function RootNavigator() {
  const { user, initializing } = useContext(AuthContext);

  if (initializing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#facc15" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { 
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' 
  },
  loadingText: { 
    fontSize: 16, color: '#333', marginTop: 10 
  },
});
