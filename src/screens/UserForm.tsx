import { View, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { User, UserId } from '../types/user';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

interface UserFormProps {
  userId: UserId | null;
  onBack: () => void;
  onSaved: () => void;
  onDeleted: () => void;
}

export default function UserForm({
  userId,
  onBack,
  onSaved,
  onDeleted,
}: UserFormProps) {
  const [user, setUser] = useState<User>({
    nome: '',
    telefone: '',
    endereco: '',
  });
  const [loading, setLoading] = useState(Boolean(userId));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const data = await api.getById(userId);
        if (mounted) {
          setUser(data);
        }
      } catch (err: any) {
        if (mounted) {
          Alert.alert('Erro', err.message || 'Não foi possível carregar o usuário');
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
  }, [userId]);

  const handleSave = useCallback(async () => {
    if (!user.nome || !user.telefone || !user.endereco) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }
    try {
      setSaving(true);
      const payload = {
        nome: user.nome,
        telefone: user.telefone,
        endereco: user.endereco,
      };
      if (userId) {
        await api.update(userId, payload);
      } else {
        await api.create(payload);
      }
      onSaved();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível salvar o usuário');
    } finally {
      setSaving(false);
    }
  }, [userId, user, onSaved]);

  const handleDelete = useCallback(async () => {
    if (!userId) {
      return;
    }
    try {
      setSaving(true);
      await api.remove(userId);
      onDeleted();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Não foi possível excluir o usuário');
    } finally {
      setSaving(false);
    }
  }, [userId, onDeleted]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={userId ? 'Editar Usuário' : 'Novo Usuário'} />
      <KeyboardAvoidingView behavior="padding" style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Input
            label="Nome"
            value={user.nome}
            onChangeText={(text) => setUser({ ...user, nome: text })}
            autoCapitalize="words"
          />
          <Input
            label="Telefone"
            value={user.telefone}
            onChangeText={(text) => setUser({ ...user, telefone: text })}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
          <Input
            label="Endereço"
            value={user.endereco}
            onChangeText={(text) => setUser({ ...user, endereco: text })}
            autoCapitalize="words"
          />
          <Button
            variant="primary"
            childs={saving ? 'Salvando...' : 'Salvar'}
            onPress={handleSave}
            disabled={saving}
          />
          {userId && (
            <Button
              variant="danger"
              childs="Excluir Usuário"
              onPress={handleDelete}
              disabled={saving}
            />
          )}
          <Button variant="secondary" childs="Voltar" onPress={onBack} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    gap: 0,
  },
});
