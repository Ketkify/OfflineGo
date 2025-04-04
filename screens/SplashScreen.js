import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkPin = async () => {
      const storedPin = await AsyncStorage.getItem('userPin');
      setTimeout(() => {
        if (storedPin) {
          navigation.replace('MainTabs'); 
        } else {
          navigation.replace('PinSetup');
        }
      }, 300);
    };

    checkPin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading OfflineGo...</Text>
      <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  text: { fontSize: 18, fontWeight: 'bold', color: '#333' },
});
