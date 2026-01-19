import { LayoutDashboard, Wallet, CreditCard as CardIcon, BarChart3, Settings, Bell, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AppLayout = ({ children }: any) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CardIcon, label: 'Meus Cartões', path: '/cartoes' },
    { icon: Wallet, label: 'Transações', path: '/transacoes' },
    { icon: BarChart3, label: 'Investimentos', path: '/investimentos' },
    { icon: Settings, label: 'Configurações', path: '/config' },
  ];

  return (
    <div className="flex min-h-screen bg-midnight-900 text-slate-200 font-sans">
      
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:flex flex-col">
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
      </aside>

      <main className="flex-1 flex flex-col">
        
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-midnight-900/50 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-2xl font-semibold text-white">Overview</h2>
          
          <div className="flex items-center gap-6">

            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar por algo..." 
                className="bg-midnight-800 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 w-64 text-slate-300 placeholder-slate-500"
              />
            </div>

            <button className="p-2.5 bg-midnight-800 rounded-full text-electric-500 hover:bg-electric-500/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-midnight-900"></span>
            </button>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric-400 to-purple-500 p-[2px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-midnight-900 flex items-center justify-center overflow-hidden">
                 <User className="w-6 h-6 text-slate-400" />
              </div>
            </div>
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