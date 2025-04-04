// utils/SyncService.js
import { getAllTransactions, markAsSynced } from './TransactionStorage';

export const syncOfflineTransactions = async () => {
  try {
    const transactions = await getAllTransactions();
    const unsynced = transactions.filter((tx) => !tx.synced);

    if (unsynced.length === 0) {
      console.log('✅ No offline transactions to sync.');
      return;
    }

    for (const tx of unsynced) {
      const response = await fetch('http://10.0.2.2:5000/api/transactions', { // also fix localhost here
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tx),
      });

      if (response.ok) {
        await markAsSynced(tx.timestamp);
        console.log('✅ Synced:', tx);
      } else {
        console.error('❌ Sync failed:', tx);
      }
    }
  } catch (err) {
    console.error('❌ Error syncing transactions:', err);
  }
};
