// utils/TransactionStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'transactions';

export const saveTransaction = async (transaction) => {
  const existing = await getAllTransactions();
  const newData = [...existing, { ...transaction, synced: false }];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const getAllTransactions = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const markAsSynced = async (timestamp) => {
  const transactions = await getAllTransactions();
  const updated = transactions.map((tx) =>
    tx.timestamp === timestamp ? { ...tx, synced: true } : tx
  );
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
