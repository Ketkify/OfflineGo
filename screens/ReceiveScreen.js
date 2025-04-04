import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ReceiveScreen() {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {
    if (!amount) return;
    setShowQR(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>💰 Receive Payment</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Enter Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Add a Note (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter note or purpose"
          value={note}
          onChangeText={setNote}
        />

        <TouchableOpacity style={styles.button} onPress={generateQR}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
      </View>

      {showQR && (
        <View style={styles.qrSection}>
          <Text style={styles.qrText}>Scan to Pay</Text>
          <View style={styles.qrBox}>
            <QRCode value={JSON.stringify({ amount, note })} size={180} />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f3f6', padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: { fontSize: 16, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  qrSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  qrBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
});
