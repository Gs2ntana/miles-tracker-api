import api  from './api';

export interface NovaAquisicaoParams {
  valorCompra: string;
  descricao: string;
  dataCompra: string;
  cartaoId: number;
  comprovante: FileList;
}

export const aquisicaoService = {
  registrar: async (data: NovaAquisicaoParams) => {
    const formData = new FormData();

    formData.append('valorCompra', data.valorCompra);
    formData.append('descricao', data.descricao);
    formData.append('dataCompra', data.dataCompra);
    formData.append('cartaoId', data.cartaoId.toString());
    
    if (data.comprovante && data.comprovante.length > 0) {
      formData.append('comprovante', data.comprovante[0]);
    }

    const response = await api.post('/aquisicoes', formData);
    return response.data;
  }
};