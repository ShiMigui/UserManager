import { User } from '../types/user';

const API_URL = process.env.EXPO_PUBLIC_API_URL as string | undefined;

const resourceUrl = (id?: string) =>
  id ? `${API_URL}/${id}` : `${API_URL ?? ''}`;

export const api = {
  async getAll(): Promise<User[]> {
    const response = await fetch(resourceUrl());
    if (!response.ok) {
      throw new Error('Erro ao listar usuários');
    }
    return response.json();
  },

  async getById(id: string): Promise<User> {
    const response = await fetch(resourceUrl(id));
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }
    return response.json();
  },

  async create(data: Omit<User, '_id'>): Promise<User> {
    const response = await fetch(resourceUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar usuário');
    }
    return response.json();
  },

  async update(id: string, data: Omit<User, '_id'>): Promise<User> {
    const response = await fetch(resourceUrl(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar usuário');
    }
    return response.json();
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(resourceUrl(id), { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Erro ao excluir usuário');
    }
  },
};
