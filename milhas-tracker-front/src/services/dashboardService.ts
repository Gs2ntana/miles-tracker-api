import api from './api';
import type { 
  HistoricoResponse, 
  PontosResponse, 
  DashboardResponse 
} from '../types';

export const dashboardService = {
  // (Gráfico de linha/barras)
  getHistorico: async () => {
    const { data } = await api.get<HistoricoResponse[]>('/dashboard/historico');
    return data;
  },

  getPontosPorCartao: async () => {
    const { data } = await api.get<PontosResponse[]>('/dashboard/pontos-por-cartao');
    return data;
  },

  // Média de dias (KPI)
  getMediaDias: async () => {
    const { data } = await api.get<DashboardResponse>('/dashboard/media-dias');
    return data;
  },

  // Exportação CSV (Download direto)
  downloadHistoricoCsv: async () => {
    const response = await api.get('/dashboard/export/csv', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'historico.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // Exportação PDF (Download direto)
  downloadHistoricoPdf: async () => {
    const response = await api.get('/dashboard/export/pdf', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'historico.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};