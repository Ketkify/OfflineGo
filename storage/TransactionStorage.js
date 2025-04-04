import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'offline_transactions';

export const saveTransaction = async (transaction) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const transactions = existing ? JSON.parse(existing) : [];
    transactions.push({ ...transaction, timestamp: new Date().toISOString() });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (e) {
    console.error('Failed to save transaction', e);
  }
};

export const getTransactions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load transactions', e);
    return [];
  }
};

export const clearTransactions = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear transactions', e);
  }
};
