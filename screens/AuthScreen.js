// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState({});

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const sendOtp = async () => {
    if (!form.phone) return Alert.alert('Error', 'Enter your phone number');

    try {
      const res = await fetch('http://10.0.2.2:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'OTP sent successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to send OTP. Check if server is running and accessible.');
      console.error('sendOtp error:', err);
    }
  };

  const register = async () => {
    const { fullName, username, phone, email, password, otp } = form;
    if (!fullName || !username || !phone || !email || !password || !otp) {
      return Alert.alert('Error', 'All fields are required');
    }

    try {
      const res = await fetch('http://10.0.2.2:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'User registered successfully');
        // Optional: Navigate to next screen
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to register. Check network/server.');
      console.error('register error:', err);
    }
  };

  const login = () => {
    const { username, password } = form;
    if (!username || !password) {
      return Alert.alert('Error', 'Enter username and password');
    }

    Alert.alert('Success', `Logged in as ${username}`);
    // Add actual login logic here
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <Text
          style={[styles.tab, activeTab === 'login' && styles.activeTab]}
          onPress={() => setActiveTab('login')}
        >
          Login
        </Text>
        <Text
          style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
          onPress={() => setActiveTab('signup')}
        >
          Sign Up
        </Text>
      </View>

      {/* Form */}
      {activeTab === 'login' ? (
        <>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={val => handleChange('username', val)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={val => handleChange('password', val)}
          />
          <Button title="Login" onPress={login} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={val => handleChange('fullName', val)}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={val => handleChange('username', val)}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={val => handleChange('phone', val)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={val => handleChange('email', val)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            onChangeText={val => handleChange('password', val)}
          />
          <TextInput
            placeholder="OTP"
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={val => handleChange('otp', val)}
          />
          <Button title="Send OTP" onPress={sendOtp} />
          <Button title="Register" onPress={register} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    marginHorizontal: 20,
    fontSize: 18,
    color: '#888',
  },
  activeTab: {
    color: '#007AFF',
    borderBottomWidth: 2,
    borderColor: '#007AFF',
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  input: {
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
