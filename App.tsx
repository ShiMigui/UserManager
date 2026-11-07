import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { api } from './src/services/api';
import { User } from './src/types/user';
import Home from './src/screens/Home';
import UserForm from './src/screens/UserForm';

type Screen = 'home' | 'user-form';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const goHome = useCallback(() => {
    setScreen('home');
    setEditingUserId(null);
  }, []);

  const goAdd = useCallback(() => {
    setEditingUserId(null);
    setScreen('user-form');
  }, []);

  const goEdit = useCallback((user: User) => {
    setEditingUserId(user._id!);
    setScreen('user-form');
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await api.remove(id);
    goHome();
  }, [goHome]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screen === 'home' ? (
        <Home onAdd={goAdd} onEdit={goEdit} onDelete={handleDelete} />
      ) : (
        <UserForm
          userId={editingUserId}
          onBack={goHome}
          onSaved={goHome}
          onDeleted={goHome}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
