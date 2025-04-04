import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getAllTransactions } from '../storage/TransactionStorage';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTransactions();
      setTransactions(data.reverse());
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons
          name={item.type === 'paid' ? 'arrow-up-circle' : 'arrow-down-circle'}
          size={30}
          color={item.type === 'paid' ? '#ff4d4d' : '#28a745'}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.amount}>
          {item.type === 'paid' ? '-' : '+'} ₹{item.amount}
        </Text>
        <Text style={styles.note}>{item.note || 'No note'}</Text>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📜 Transaction History</Text>
      {transactions.length === 0 ? (
        <Text style={styles.empty}>No transactions yet.</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f7', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  empty: { marginTop: 30, fontSize: 16, color: '#777', textAlign: 'center' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: { marginRight: 12 },
  details: { flex: 1 },
  amount: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  note: { fontSize: 14, color: '#444' },
  timestamp: { fontSize: 12, color: '#888', marginTop: 6 },
});
