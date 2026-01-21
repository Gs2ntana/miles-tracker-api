import api from './api';
import type { CartaoRequest, CartaoResponse } from '../types';

export const cartaoService = {
  listar: async () => {
    const { data } = await api.get<CartaoResponse[]>('/cartoes');
    return data;
  },

  cadastrar: async (novoCartao: CartaoRequest) => {
    const { data } = await api.post<CartaoResponse>('/cartoes', novoCartao);
    return data;
  }
};