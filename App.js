import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { useNetworkSync } from './utils/NetworkSyncListener'; 

export default function App() {
  useNetworkSync();

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
