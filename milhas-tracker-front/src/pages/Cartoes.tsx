import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Plus, Loader2 } from 'lucide-react';

import AppLayout from '../layouts/AppLayout';
import { cartaoService } from '../services/cartaoService';
import type { CartaoRequest } from '../types';
import CreditCard from '../components/ui/CreditCard';
import { useAuth } from '../context/AuthContext';

const Cartoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: cartoes, isLoading } = useQuery({
    queryKey: ['cartoes'],
    queryFn: cartaoService.listar,
    initialData: []
  });

  const { register, handleSubmit, reset } = useForm<CartaoRequest>();

  const createCartaoMutation = useMutation({
    mutationFn: cartaoService.cadastrar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartoes'] });
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => {
      alert('Erro ao cadastrar cartão. Verifique se o backend está rodando.');
      console.error(error);
    }
  });

  const onSubmit = (data: CartaoRequest) => {
    createCartaoMutation.mutate(data);
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Meus Cartões</h1>
          <p className="text-slate-400">Gerencie seus ativos e programas de fidelidade.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-electric-600 hover:bg-electric-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-lg shadow-electric-900/20"
        >
          <Plus size={20} /> Novo Cartão
        </button>
      </div>

      {isLoading ? (
        <div className="text-white flex items-center gap-2">
            <Loader2 className="animate-spin" /> Carregando cartões...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          
          {cartoes.map((cartao, index) => (
            <CreditCard 
                key={cartao.id}
                nome={cartao.nome}
                digitos={cartao.digitos}
                bandeira={cartao.nomeBandeira}
                programa={cartao.nomePrograma}
                titular={user?.nome || "USUÁRIO"}
                variant={index % 2 === 0 ? 'blue' : 'black'}
            />
          ))}

          <button 
             onClick={() => setIsModalOpen(true)}
             className="border-2 border-dashed border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-electric-400 hover:border-electric-500/50 hover:bg-electric-500/5 transition-all min-h-[224px]"
          >
            <Plus size={40} className="mb-2 opacity-50" />
            <span className="font-medium">Adicionar Cartão</span>
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-midnight-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-white mb-6">Novo Cartão</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-1">Apelido do Cartão</label>
                <input {...register("nome", { required: true })} placeholder="Ex: Nubank Ultravioleta" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-slate-400 text-sm mb-1">Últimos 4 Dígitos</label>
                   <input {...register("digitos", { required: true, maxLength: 4 })} maxLength={4} placeholder="1234" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors" />
                </div>
                
                <div>
                   <label className="block text-slate-400 text-sm mb-1">Bandeira</label>
                   <select 
                     {...register("bandeiraId", { required: true })} 
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors appearance-none"
                     defaultValue=""
                   >
                      <option value="" disabled>Selecione...</option>
                      <option value="1">Visa</option>
                      <option value="2">Mastercard</option>
                      <option value="3">Elo</option>
                      <option value="4">Amex</option>
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-1">Programa de Fidelidade</label>
                <select 
                  {...register("programaPadraoId", { required: true })} 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors appearance-none"
                  defaultValue=""
                >
                   <option value="" disabled>Selecione...</option>
                   <option value="1">Livelo</option>
                   <option value="2">Esfera</option>
                   <option value="3">Smiles</option>
                   <option value="4">Latam Pass</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-300 hover:text-white transition-colors font-medium border border-transparent hover:border-slate-700 rounded-xl">Cancelar</button>
                <button 
                  type="submit" 
                  disabled={createCartaoMutation.isPending}
                  className="flex-1 bg-electric-600 hover:bg-electric-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-electric-900/20 transition-all flex items-center justify-center gap-2"
                >
                  {createCartaoMutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "Salvar Cartão"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Cartoes;