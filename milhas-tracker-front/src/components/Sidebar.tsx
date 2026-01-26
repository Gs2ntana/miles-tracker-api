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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-midnight-900 border-r border-slate-800 flex flex-col z-40">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white tracking-tighter">
          Milhas<span className="text-electric-500">App</span>.
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                ${isActive 
                  ? 'bg-electric-600 text-white shadow-lg shadow-electric-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;