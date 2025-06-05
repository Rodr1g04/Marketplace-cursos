// src/components/CustomHeader.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomHeader({ title, navigation }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
});
