import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { syncOfflineTransactions } from './SyncService';

export const useNetworkSync = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        console.log('🌐 Internet reconnected! Trying to sync...');
        syncOfflineTransactions();
      }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);
};
