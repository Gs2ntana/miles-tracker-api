import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Pie, PieChart 
} from 'recharts';
import { 
  Wallet, TrendingUp, CreditCard, Plus, Download, ArrowRight
} from 'lucide-react';

import AppLayout from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { NovaAquisicaoModal } from '../components/ui/NovaAquisicaoModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: historico, isLoading: loadHist } = useQuery({
    queryKey: ['historico'],
    queryFn: dashboardService.getHistorico,
    initialData: [] 
  });

  const { data: mediaData } = useQuery({
    queryKey: ['mediaDias'],
    queryFn: dashboardService.getMediaDias
  });

  const { data: pontosCartao } = useQuery({
    queryKey: ['pontosCartao'],
    queryFn: dashboardService.getPontosPorCartao,
    initialData: []
  });

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          Olá, {user?.nome || 'Usuário'} 👋
        </h1>
        <p className="text-slate-400">Aqui está o resumo das suas milhas hoje.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-electric-600 to-electric-800 rounded-3xl p-6 text-white shadow-lg shadow-electric-900/20 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Wallet size={24} className="text-white" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-lg">
                  <TrendingUp size={12} /> +12%
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-electric-100 text-sm font-medium mb-1">Total Acumulado</p>
                <h3 className="text-3xl font-bold">
                  {historico.reduce((acc: number, item: any) => acc + item.pontos, 0).toLocaleString()} pts
                </h3>
              </div>
            </div>

            <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-colors group">
               <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
                  <TrendingUp size={24} className="text-orange-500" />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Média Dias p/ Crédito</p>
                <h3 className="text-3xl font-bold text-white">
                  {mediaData?.mediaDiasParaCredito?.toFixed(1) || 0} dias
                </h3>
              </div>
            </div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-midnight-800 rounded-3xl p-6 border border-slate-800 border-dashed hover:border-electric-500 hover:bg-electric-500/5 transition-all group flex flex-col items-center justify-center text-center cursor-pointer h-full"
            >
               <div className="p-4 bg-electric-500/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                 <Plus size={24} className="text-electric-500" />
               </div>
               <p className="text-white font-medium">Nova Aquisição</p>
            </button>
          </div>

          <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800 h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Evolução de Milhas</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => dashboardService.downloadHistoricoCsv()}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:bg-slate-800 px-3 py-1.5 rounded-lg"
                >
                  <Download size={16} /> CSV
                </button>
                
                <button 
                  onClick={() => dashboardService.downloadHistoricoPdf()}
                  className="flex items-center gap-2 text-sm text-electric-400 hover:text-white transition-colors border border-electric-500/30 hover:bg-electric-500/10 px-3 py-1.5 rounded-lg"
                >
                  <Download size={16} /> PDF
                </button>
              </div>
            </div>
            
            {loadHist ? (
               <div className="h-full flex items-center justify-center text-slate-500">Carregando gráfico...</div>
            ) : (
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={historico}>
                  <defs>
                    <linearGradient id="colorPontos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="data" stroke="#475569" tick={{fill: '#475569'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{fill: '#475569'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="pontos" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorPontos)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800">
             <h3 className="text-xl font-semibold text-white mb-6">Distribuição</h3>
             <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pontosCartao}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="totalPontos"
                      nameKey="nomeCartao"
                    >
                      {pontosCartao.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <span className="text-xs text-slate-500">Cartões</span>
                   <p className="text-xl font-bold text-white">{pontosCartao.length}</p>
                </div>
             </div>

             <div className="mt-4 space-y-3">
                {pontosCartao.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-slate-300">{item.nomeCartao}</span>
                    </div>
                    <span className="font-bold text-white">{item.totalPontos}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-6">Recentes</h3>
            <div className="space-y-6">
              {historico.slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                      ${item.status === 'APROVADO' ? 'bg-green-500/10 text-green-500' : 'bg-slate-700/30 text-slate-400'}
                    `}>
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-electric-400 transition-colors">{item.descricao}</p>
                      <p className="text-xs text-slate-500">{item.data}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">+{item.pontos}</span>
                </div>
              ))}
              {historico.length === 0 && (
                <p className="text-slate-500 text-center py-4">Nenhuma atividade recente.</p>
              )}
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800">
                <Link 
                  to="/historico" 
                  className="flex items-center justify-center gap-2 text-sm font-medium text-electric-400 hover:text-white transition-colors w-full p-2 rounded-xl hover:bg-electric-500/10"
                >
                  Ver Extrato Completo <ArrowRight size={16} />
                </Link>
            </div>
          </div>
        </div>
      </div>
      <NovaAquisicaoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
    </AppLayout>
  );
};

export default Dashboard;