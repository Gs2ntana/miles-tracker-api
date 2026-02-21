import { useState } from 'react';
import { User, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext'; 
import { notificacaoService } from '../services/notificacaoService';
import Sidebar from '../components/Sidebar'; 

const AppLayout = ({ children }: any) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: notificacoes = [] } = useQuery({
    queryKey: ['notificacoes'],
    queryFn: notificacaoService.listar,
    refetchInterval: 30000,
  });

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  const getPageTitle = (path: string) => {
    switch(path) {
        case '/dashboard': return 'Dashboard';
        case '/cartoes': return 'Meus Cartões';
        case '/notificacoes': return 'Notificações';
        case '/perfil': return 'Meu Perfil';
        case '/historico': return 'Extrato de Pontos';
        default: return 'MilhasApp';
    }
  };

  return (
    <div className="flex min-h-screen bg-midnight-900 text-slate-200 font-sans">
      
      <Sidebar />
      <main className="flex-1 flex flex-col md:ml-64">
        
        {/* HEADER */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-midnight-900/50 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-2xl font-semibold text-white">
            {getPageTitle(location.pathname)}
          </h2>
          
          <div className="flex items-center gap-6">

            {/* SINO */}
            <div className="relative">
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2.5 bg-midnight-800 rounded-full text-slate-400 hover:text-white hover:bg-electric-500/10 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {naoLidas > 0 && (
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-midnight-900"></span>
                  )}
                </button>

                {/* DROPDOWN */}
                {showNotifications && (
                    <div className="absolute right-0 top-12 w-80 bg-midnight-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-midnight-800">
                            <h3 className="font-bold text-white text-sm">Notificações</h3>
                            {naoLidas > 0 && (
                                <span className="text-[10px] bg-electric-500 text-white px-2 py-0.5 rounded-full">{naoLidas} novas</span>
                            )}
                        </div>
                        
                        <div className="max-h-[300px] overflow-y-auto">
                            {notificacoes.length === 0 ? (
                                <div className="p-6 text-center text-slate-500 text-sm">Nenhuma notificação</div>
                            ) : (
                                <ul className="divide-y divide-slate-800">
                                    {notificacoes.slice(0, 5).map((n) => (
                                        <li key={n.id} className="p-3 hover:bg-slate-800/50 text-sm text-slate-300">
                                            {n.mensagem}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="p-2 bg-midnight-800 border-t border-slate-700 text-center">
                            <Link 
                              to="/notificacoes" 
                              onClick={() => setShowNotifications(false)}
                              className="text-xs text-electric-400 hover:text-white font-medium block py-1"
                            >
                              Ver todas
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* PERFIL */}
            <Link to="/perfil">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-400 to-purple-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-midnight-900 flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </Link>

          </div>
        </header>

        {/* PÁGINAS */}
        <div className="p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;