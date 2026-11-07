import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'Nenhum contato encontrado.' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📭</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 48,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    fontWeight: '600',
  },
});
