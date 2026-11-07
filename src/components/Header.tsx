import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
  },
});
