import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const { phoneNumber, email } = route.params || {};

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP');
      return;
    }

    try {
      const response = await axios.post('https://offlinego-production.up.railway.app/api/auth/verify-otp', {
        phone: phoneNumber,
        email,
        otp,
        fullName: "Temp User",
        username: "tempuser",
        password: "temppass123",
      });

      if (response.data.success) {
        Alert.alert('✅ Success', 'OTP verified!');
        navigation.replace('SignupScreen', { phoneNumber, email });
      } else {
        Alert.alert('Error', response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('❌ OTP verification failed:', error.message);
      Alert.alert('Error', 'Server error during OTP verification.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP</Text>
      <Text style={styles.label}>Sent to {phoneNumber}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter 6-digit OTP"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
  },
  label: {
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
