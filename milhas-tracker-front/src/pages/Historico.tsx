import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Download, Filter, Search, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft 
} from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { dashboardService } from '../services/dashboardService';

const Historico = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('TODOS');

  const { data: historico = [], isLoading } = useQuery({
    queryKey: ['historicoCompleto'],
    queryFn: dashboardService.getHistorico, 
  });

  const itensFiltrados = historico.filter((item: any) => {
    const matchText = item.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = 
      typeFilter === 'TODOS' ? true :
      typeFilter === 'ENTRADA' ? item.pontos > 0 :
      item.pontos < 0; 
    
    return matchText && matchType;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Extrato de Pontos</h1>
          <p className="text-slate-400">Histórico completo de acúmulo e uso.</p>
        </div>
        
        <div className="flex gap-3">
            <button 
                onClick={() => dashboardService.downloadHistoricoCsv()}
                className="flex items-center gap-2 bg-midnight-800 hover:bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 rounded-xl transition-colors text-sm font-medium"
            >
            <Download size={18} /> CSV
            </button>
            <button 
                onClick={() => dashboardService.downloadHistoricoPdf()}
                className="flex items-center gap-2 bg-electric-600 hover:bg-electric-700 text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium shadow-lg shadow-electric-900/20"
            >
            <Download size={18} /> PDF
            </button>
        </div>
      </div>

      <div className="bg-midnight-800 p-4 rounded-t-3xl border border-slate-800 border-b-0 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar transação..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-midnight-900 border border-slate-700 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-slate-500 w-5 h-5" />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-midnight-900 border border-slate-700 text-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-electric-500 cursor-pointer appearance-none"
          >
            <option value="TODOS">Todas as transações</option>
            <option value="ENTRADA">Acúmulo (Entradas)</option>
            <option value="SAIDA">Uso (Saídas)</option>
          </select>
        </div>
      </div>

      <div className="bg-midnight-800 border border-slate-800 rounded-b-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold">Descrição</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Pontos</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-800">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Carregando...</td></tr>
              ) : itensFiltrados.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Nenhuma transação encontrada.</td></tr>
              ) : (
                itensFiltrados.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="p-4 text-slate-300 whitespace-nowrap">
                        {new Date(item.data).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-white font-medium">{item.descricao}</td>
                    <td className="p-4">
                        {item.pontos > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                <ArrowDownLeft size={12} /> Acúmulo
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                <ArrowUpRight size={12} /> Uso
                            </span>
                        )}
                    </td>
                    <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded border ${
                            item.status === 'APROVADO' 
                            ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' 
                            : 'border-slate-600 text-slate-400 bg-slate-700/30'
                        }`}>
                            {item.status || 'PROCESSANDO'}
                        </span>
                    </td>
                    <td className={`p-4 text-right font-bold ${item.pontos > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.pontos > 0 ? '+' : ''}{item.pontos.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-800 flex justify-between items-center bg-midnight-900/30">
          <span className="text-xs text-slate-500">
            Mostrando {itensFiltrados.length} transações
          </span>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-slate-700 text-slate-600 hover:bg-slate-800 cursor-not-allowed" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Historico;