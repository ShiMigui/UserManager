import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { User } from '../types/user';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={users}
      keyExtractor={(item) => item._id || item.nome}
      renderItem={({ item }) => (
        <UserCard user={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
  },
});
