import api from './api';
import type { NotificacaoResponse } from '../types';

export const notificacaoService = {
  listar: async () => {
    const { data } = await api.get<NotificacaoResponse[]>('/notificacoes');
    return data;
  }
};