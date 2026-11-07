import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { User } from '../types/user';
import Header from '../components/Header';
import UserList from '../components/UserList';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

interface HomeProps {
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function Home({ onAdd, onEdit, onDelete }: HomeProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getAll();
        if (mounted) {
          setUsers(data);
        }
      } catch (err: any) {
        if (mounted) {
          Alert.alert(
            'Erro',
            err.message || 'Não foi possível carregar os usuários',
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await api.remove(id);
        const data = await api.getAll();
        setUsers(data);
      } catch (err: any) {
        Alert.alert('Erro', err.message || 'Não foi possível excluir o usuário');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Meus Usuários" />
      {users.length === 0 ? (
        <EmptyState
          message="Nenhum usuário cadastrado. Toque em + Novo Usuário para adicionar."
        />
      ) : (
        <UserList users={users} onEdit={onEdit} onDelete={handleDelete} />
      )}
      <View style={styles.fabContainer}>
        <Button variant="primary" childs="+ Novo Usuário" onPress={onAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
});
