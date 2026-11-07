import { TextInput, Text, View, StyleSheet } from 'react-native';
import React from 'react';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'phone-pad'
    | 'email-address'
    | 'url'
    | 'number-pad'
    | 'decimal-pad';
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
  autoFocus?: boolean;
}

export default function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoFocus = false,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        placeholderTextColor="#8E8E93"
      />
      {error && <Text style={styles.errorText}>Campo obrigatório</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    minHeight: 52,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});
