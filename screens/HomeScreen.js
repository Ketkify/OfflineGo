import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to <Text style={styles.bold}>OfflineGo</Text> 💸</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pay')}>
          <Ionicons name="qr-code-outline" size={36} color="#007bff" />
          <Text style={styles.cardText}>Scan & Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Receive')}>
          <Ionicons name="download-outline" size={36} color="#28a745" />
          <Text style={styles.cardText}>Receive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
          <Ionicons name="time-outline" size={36} color="#ffc107" />
          <Text style={styles.cardText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={36} color="#6c757d" />
          <Text style={styles.cardText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 24,
    color: '#212529',
  },
  bold: {
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#dee2e6',
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    width: '48%',
    marginBottom: 16,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
});
