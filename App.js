// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { useNetworkSync } from './utils/NetworkSyncListener'; // 👈 Custom hook

export default function App() {
  useNetworkSync(); // 🔄 Listens for network reconnection to trigger sync

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
