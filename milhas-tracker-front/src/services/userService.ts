import api from './api';
import type { UsuarioResponse, UsuarioUpRequest, UpdateRequest } from '../types';

export const userService = {
  getMe: async (): Promise<UsuarioResponse> => {
    const { data } = await api.get('/usuario/me');
    return data;
  },

  updateMe: async (dados: UsuarioUpRequest): Promise<UsuarioResponse> => {
    const { data } = await api.put('/usuario/me', dados);
    return data;
  },

  updatePassword: async (dados: UpdateRequest): Promise<void> => {
    await api.put('/usuario/me/senha', dados);
  }
};