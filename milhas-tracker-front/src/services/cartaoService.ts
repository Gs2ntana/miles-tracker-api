import api from './api';
import type { CartaoRequest, CartaoResponse } from '../types';

export const cartaoService = {
  listar: async () => {
    const { data } = await api.get<CartaoResponse[]>('/cartoes');
    return data;
  },

  cadastrar: async (novoCartao: CartaoRequest) => {
    const payload = {
        ...novoCartao,
        bandeiraId: Number(novoCartao.bandeiraId),
        programaPadraoId: Number(novoCartao.programaPadraoId)
    };

    const { data } = await api.post<CartaoResponse>('/cartoes', payload);
    return data;
  }
};