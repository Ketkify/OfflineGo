// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const handleResetPin = async () => {
    await AsyncStorage.removeItem('userPin');
    navigation.replace('PinSetup');
  };

  const handleClearTransactions = async () => {
    await AsyncStorage.removeItem('transactions');
    Alert.alert('Done', 'All transaction history cleared.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚙️ Settings</Text>

      <TouchableOpacity style={styles.card} onPress={handleResetPin}>
        <Ionicons name="key-outline" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.text}>Reset PIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleClearTransactions}>
        <Ionicons name="trash-outline" size={24} color="#dc3545" style={styles.icon} />
        <Text style={[styles.text, { color: '#dc3545' }]}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: { marginRight: 16 },
  text: { fontSize: 18, fontWeight: '600' },
});
