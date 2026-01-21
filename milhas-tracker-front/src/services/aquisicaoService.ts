import api from './api';
import type { AquisicaoRequest, AquisicaoResponse } from '../types';

export const aquisicaoService = {
  novaAquisicao: async (dados: AquisicaoRequest, arquivo: File) => {
    const formData = new FormData();
    
    formData.append('valorCompra', dados.valorCompra);
    formData.append('descricao', dados.descricao);
    formData.append('dataCompra', dados.dataCompra);
    formData.append('diasParaCredito', String(dados.diasParaCredito));
    formData.append('cartaoId', String(dados.cartaoId));
    formData.append('comprovante', arquivo);

    const { data } = await api.post<AquisicaoResponse>('/aquisicoes', formData);
    return data;
  }
};