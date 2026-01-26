import { useState } from 'react';
import { 
  LayoutDashboard, CreditCard as CardIcon, User, LogOut, Bell, 
} from 'lucide-react'; //Quando tiver com saco volte o search
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { notificacaoService } from '../services/notificacaoService';

const AppLayout = ({ children }: any) => {
  const location = useLocation();
  const { signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: notificacoes = [] } = useQuery({
    queryKey: ['notificacoes'],
    queryFn: notificacaoService.listar,
    refetchInterval: 30000,
  });

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CardIcon, label: 'Meus Cartões', path: '/cartoes' },
    { icon: Bell, label: 'Notificações', path: '/notificacoes' },
    { icon: User, label: 'Meu Perfil', path: '/perfil' },
  ];

  return (
    <div className="flex min-h-screen bg-midnight-900 text-slate-200 font-sans">
      
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:flex flex-col fixed h-full z-30 bg-midnight-900">
        <div className="mb-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-electric-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <h1 className="text-2xl font-bold text-white">Milhas<span className="text-electric-500">.</span></h1>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link 
                key={item.label} 
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  active 
                    ? 'text-electric-400 bg-midnight-800 border-l-4 border-electric-500 shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-midnight-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800 mt-auto">
            <button 
              onClick={signOut}
              className="flex items-center gap-4 p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col md:ml-64">
        
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-midnight-900/50 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-2xl font-semibold text-white">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h2>
          
          <div className="flex items-center gap-6">
            {/*
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar por algo..." 
                className="bg-midnight-800 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 w-64 text-slate-300 placeholder-slate-500"
              />
            </div>*/}

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

            <Link to="/perfil">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-400 to-purple-500 p-[2px] cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-midnight-900 flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-slate-400" />
                </div>
              </div>
            </Link>

          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;