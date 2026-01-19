import AppLayout from '../layouts/AppLayout';
import CreditCard from '../components/ui/CreditCard';
import { ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Meus Cartões</h3>
              <button className="text-sm text-electric-400 hover:text-white font-medium transition-colors">Ver todos</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CreditCard variant="blue" saldo={12500} digitos="9876" nome="Black Infinite" />
              <CreditCard variant="dark" saldo={3450} digitos="5432" nome="Platinum" />
            </div>
          </div>

          <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800">
            <h3 className="text-xl font-semibold text-white mb-6">Atividade Semanal</h3>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
               {[40, 70, 35, 90, 25, 60, 80].map((h, i) => (
                 <div key={i} className="w-full bg-midnight-900 rounded-t-xl relative group">
                    <div 
                      style={{ height: `${h}%` }} 
                      className="absolute bottom-0 w-full bg-electric-500 rounded-t-xl transition-all hover:bg-electric-400"
                    ></div>
                    <div 
                      style={{ height: `${h/2}%` }} 
                      className="absolute bottom-0 w-full bg-cyan-400 rounded-t-xl translate-x-1.5 opacity-60"
                    ></div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between text-slate-500 text-sm mt-4 px-2">
              <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span>
            </div>
          </div>

        </div>

        <div className="space-y-8">
          
          <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800">
             <h3 className="text-xl font-semibold text-white mb-6">Últimas Transações</h3>
             
             <div className="space-y-6">
                {[
                  { desc: "Amazon Store", date: "28 Jan 2026", val: "-850 pts", type: "out", icon: "shopping" },
                  { desc: "Bônus Transferência", date: "25 Jan 2026", val: "+2,500 pts", type: "in", icon: "bonus" },
                  { desc: "Uber Trip", date: "21 Jan 2026", val: "-350 pts", type: "out", icon: "transport" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.type === 'in' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                         {item.type === 'in' ? <ArrowDownLeft className="w-6 h-6"/> : <ArrowUpRight className="w-6 h-6"/>}
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:text-electric-400 transition-colors">{item.desc}</p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${item.type === 'in' ? 'text-green-400' : 'text-orange-400'}`}>
                      {item.val}
                    </span>
                  </div>
                ))}
             </div>
          </div>

          {/* Estatística de Gastos (Pizza) */}
          <div className="bg-midnight-800 rounded-3xl p-6 border border-slate-800">
             <h3 className="text-xl font-semibold text-white mb-4">Distribuição</h3>
             <div className="h-48 w-full bg-midnight-900 rounded-full border-8 border-midnight-800 relative flex items-center justify-center">
                {/* Simulando gráfico de Pizza com CSS Conic Gradient */}
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#6366f1 0% 35%, #22d3ee 35% 65%, #f472b6 65% 100%)', opacity: 0.8 }}></div>
                <div className="absolute inset-4 bg-midnight-800 rounded-full flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-white">30%</span>
                   <span className="text-xs text-slate-400">Viagens</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

export default Dashboard;