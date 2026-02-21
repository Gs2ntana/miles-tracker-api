import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Meus Cartões', path: '/cartoes' },
    { icon: Bell, label: 'Notificações', path: '/notificacoes' },
    { icon: User, label: 'Meu Perfil', path: '/perfil' },
  ];

  return (
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
  );
};

export default Sidebar;