import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { User } from '../types/user';
import Button from './Button';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const handleEdit = () => onEdit(user);
  const handleDelete = () => onDelete(user._id!);

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>{user.nome.charAt(0).toUpperCase()}</View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.nome}</Text>
        <Text style={styles.detail}>📞 {user.telefone}</Text>
        <Text style={styles.detail}>📍 {user.endereco}</Text>
      </View>
      <View style={styles.actions}>
        <Button variant="outline" size="small" childs="Editar" onPress={handleEdit} />
        <Button variant="danger" size="small" childs="Excluir" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#007AFF',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#6E6E73',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
});
