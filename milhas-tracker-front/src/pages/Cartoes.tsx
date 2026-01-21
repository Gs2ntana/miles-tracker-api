import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Plus, CreditCard, Loader2 } from 'lucide-react';

import AppLayout from '../layouts/AppLayout';
import { cartaoService } from '../services/cartaoService';
import type { CartaoRequest } from '../types';

const Cartoes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

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
      alert('Erro ao cadastrar cartão. Verifique o console.');
      console.error(error);
    }
  });

  const onSubmit = (data: CartaoRequest) => {
    createCartaoMutation.mutate(data);
  };

  return (
    <AppLayout>
      {/* HEADER ESPECÍFICO DA PÁGINA CARTÕES */}
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

      {/* GRID DE CARTÕES */}
      {isLoading ? (
        <div className="text-white">Carregando cartões...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          
          {cartoes.map((cartao) => (
            <div key={cartao.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 relative overflow-hidden group hover:border-electric-500/50 transition-all shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="flex justify-between items-start mb-8">
                <CreditCard className="text-electric-400" size={32} />
                <span className="bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded font-mono border border-slate-600">
                  {cartao.nomeBandeira}
                </span>
              </div>
              
              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-semibold text-white tracking-wide">{cartao.nome}</h3>
                <p className="text-slate-500 font-mono">•••• •••• •••• {cartao.digitos}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                 <div>
                    <p className="text-xs text-slate-500">Programa</p>
                    <p className="text-sm font-medium text-electric-300">{cartao.nomePrograma}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs text-slate-500">Vencimento</p>
                    <p className="text-sm text-white">Dia 10</p>
                 </div>
              </div>
            </div>
          ))}

          {/* Botão Card "Adicionar" */}
          <button 
             onClick={() => setIsModalOpen(true)}
             className="border-2 border-dashed border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-electric-400 hover:border-electric-500/50 hover:bg-electric-500/5 transition-all min-h-[220px]"
          >
            <Plus size={40} className="mb-2 opacity-50" />
            <span className="font-medium">Adicionar Cartão</span>
          </button>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-midnight-900 border border-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <h2 className="text-2xl font-bold text-white mb-6">Novo Cartão</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-1">Nome do Cartão</label>
                <input {...register("nome")} placeholder="Ex: Nubank Ultravioleta" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-slate-400 text-sm mb-1">Últimos 4 Dígitos</label>
                   <input {...register("digitos")} maxLength={4} placeholder="1234" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors" required />
                </div>
                
                <div>
                   <label className="block text-slate-400 text-sm mb-1">Bandeira</label>
                   <select 
                     {...register("bandeiraId")} 
                     className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors appearance-none"
                     required
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
                  {...register("programaPadraoId")} 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-electric-500 transition-colors appearance-none"
                  required
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-300 hover:text-white transition-colors font-medium">Cancelar</button>
                <button 
                  type="submit" 
                  disabled={createCartaoMutation.isPending}
                  className="flex-1 bg-electric-600 hover:bg-electric-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-electric-900/20 transition-all flex justify-center"
                >
                  {createCartaoMutation.isPending ? <Loader2 className="animate-spin" /> : "Salvar Cartão"}
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