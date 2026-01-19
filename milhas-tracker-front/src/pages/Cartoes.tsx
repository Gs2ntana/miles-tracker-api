import AppLayout from '../layouts/AppLayout';
import CreditCard from '../components/ui/CreditCard';
import { Plus } from 'lucide-react';

const Cartoes = () => {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Carteira de Ativos</h2>
          <p className="text-slate-400">Gerencie seus cartões e programas de fidelidade</p>
        </div>
        
        <button className="bg-electric-500 hover:bg-electric-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-electric-500/20 transition-all hover:scale-105 active:scale-95">
          <Plus className="w-5 h-5" />
          Novo Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Cartão 1 */}
        <CreditCard 
          variant="blue" 
          nome="Visa Infinite" 
          saldo={15430} 
          digitos="8876" 
          validade="08/29" 
        />
        
        {/* Cartão 2 */}
        <CreditCard 
          variant="dark" 
          nome="Mastercard Black" 
          saldo={5200} 
          digitos="1122" 
          validade="05/27" 
        />

        {/* Cartão 3 */}
        <CreditCard 
          variant="dark" 
          nome="Elo Nanquim" 
          saldo={1200} 
          digitos="3344" 
          validade="01/26" 
        />

        <div className="h-56 rounded-3xl border-2 border-dashed border-slate-700 bg-midnight-800/30 flex flex-col items-center justify-center text-slate-500 hover:border-electric-500 hover:text-electric-400 cursor-pointer transition-all hover:bg-midnight-800">
           <div className="w-12 h-12 rounded-full bg-midnight-900 flex items-center justify-center mb-3">
             <Plus className="w-6 h-6" />
           </div>
           <span className="font-medium">Adicionar outro cartão</span>
        </div>

      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold text-white mb-6">Saldos em Programas</h3>
        <div className="bg-midnight-800 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-midnight-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="p-4 font-semibold">Programa</th>
                <th className="p-4 font-semibold">Cartão Vinculado</th>
                <th className="p-4 font-semibold">Última Atualização</th>
                <th className="p-4 font-semibold text-right">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr className="hover:bg-midnight-900/30 transition-colors">
                <td className="p-4 flex items-center gap-3 text-white font-medium">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> Smiles
                </td>
                <td className="p-4 text-slate-300">Visa Infinite</td>
                <td className="p-4 text-slate-500 text-sm">Hoje, 10:30</td>
                <td className="p-4 text-right font-bold text-white">15,430</td>
              </tr>
              <tr className="hover:bg-midnight-900/30 transition-colors">
                <td className="p-4 flex items-center gap-3 text-white font-medium">
                   <span className="w-2 h-2 rounded-full bg-blue-500"></span> TudoAzul
                </td>
                <td className="p-4 text-slate-300">Elo Nanquim</td>
                <td className="p-4 text-slate-500 text-sm">Ontem</td>
                <td className="p-4 text-right font-bold text-white">1,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Cartoes;