import { useQuery } from '@tanstack/react-query';
import { Bell, CheckCheck, MailOpen } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { notificacaoService } from '../services/notificacaoService';

const Notificacoes = () => {
  const { data: notificacoes = [], isLoading } = useQuery({
    queryKey: ['notificacoes'],
    queryFn: notificacaoService.listar,
  });

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white mb-1">Central de Notificações</h1>
           <p className="text-slate-400">Acompanhe as atualizações da sua conta.</p>
        </div>
        
        <button 
            onClick={() => alert("Funcionalidade em desenvolvimento no Backend")}
            className="text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
            <CheckCheck size={16} /> Marcar todas como lidas
        </button>
      </div>

      <div className="bg-midnight-800 rounded-3xl border border-slate-800 overflow-hidden">
         {isLoading ? (
             <div className="p-8 text-center text-slate-500">Carregando...</div>
         ) : notificacoes.length === 0 ? (
             <div className="p-12 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                     <Bell className="text-slate-500" size={32} />
                 </div>
                 <h3 className="text-white font-medium text-lg">Tudo limpo!</h3>
                 <p className="text-slate-500">Você não tem novas notificações.</p>
             </div>
         ) : (
             <div className="divide-y divide-slate-700/50">
                 {notificacoes.map((n) => (
                     <div key={n.id} className={`p-6 flex gap-4 transition-colors hover:bg-slate-700/20 ${!n.lida ? 'bg-electric-500/5' : ''}`}>
                         <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                             ${!n.lida ? 'bg-electric-500/20 text-electric-400' : 'bg-slate-700/50 text-slate-400'}`}>
                             {n.lida ? <MailOpen size={18} /> : <Bell size={18} />}
                         </div>

                         <div className="flex-1">
                             <div className="flex justify-between items-start mb-1">
                                 <h4 className={`font-medium ${!n.lida ? 'text-white' : 'text-slate-300'}`}>
                                     {n.mensagem}
                                 </h4>
                                 <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                                     {new Date(n.dataEnvio).toLocaleDateString()}
                                 </span>
                             </div>
                             
                             {n.aquisicaoDescricao && (
                                 <p className="text-sm text-slate-400 mb-2">
                                     Referente à aquisição: <span className="text-electric-300">{n.aquisicaoDescricao}</span>
                                 </p>
                             )}
                             {!n.lida && (
                                 <button 
                                    onClick={() => alert("Funcionalidade em desenvolvimento")}
                                    className="text-xs font-medium text-electric-400 hover:text-electric-300 mt-2"
                                 >
                                     Marcar como lida
                                 </button>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </AppLayout>
  );
};

export default Notificacoes;