import { useForm } from 'react-hook-form';
import { X, Upload, Loader2, Save, DollarSign } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aquisicaoService, type NovaAquisicaoParams } from '../../services/aquisicaoService';
import { cartaoService } from '../../services/cartaoService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovaAquisicaoModal({ isOpen, onClose }: ModalProps) {
  const queryClient = useQueryClient();
  
  const { data: cartoes = [], isLoading: loadingCartoes } = useQuery({
    queryKey: ['cartoes'],
    queryFn: cartaoService.listar,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NovaAquisicaoParams>();

  const mutation = useMutation({
    mutationFn: aquisicaoService.registrar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historico'] });
      queryClient.invalidateQueries({ queryKey: ['pontosCartao'] });
      
      reset();
      onClose();
      alert('Aquisição registrada com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      alert('Erro ao registrar. Verifique o console.');
    }
  });

  const onSubmit = (data: NovaAquisicaoParams) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-midnight-800 w-full max-w-lg rounded-3xl border border-slate-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-midnight-900/50">
          <h2 className="text-xl font-bold text-white">Nova Aquisição</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Valor (R$)</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-500">
                  <DollarSign size={16} />
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  {...register('valorCompra', { required: 'Valor obrigatório' })}
                  className="w-full pl-9 pr-3 py-2.5 bg-midnight-900 border border-slate-700 rounded-xl text-white focus:border-electric-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">Data da Compra</label>
              <input
                type="date"
                {...register('dataCompra', { required: 'Data obrigatória' })}
                className="w-full px-3 py-2.5 bg-midnight-900 border border-slate-700 rounded-xl text-white focus:border-electric-500 focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Descrição</label>
            <input
              type="text"
              placeholder="Ex: Compra de Notebook"
              {...register('descricao', { required: 'Descrição obrigatória' })}
              className="w-full px-3 py-2.5 bg-midnight-900 border border-slate-700 rounded-xl text-white focus:border-electric-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Cartão Utilizado</label>
            <select
              {...register('cartaoId', { required: 'Selecione um cartão' })}
              className="w-full px-3 py-2.5 bg-midnight-900 border border-slate-700 rounded-xl text-white focus:border-electric-500 focus:outline-none appearance-none"
              disabled={loadingCartoes}
            >
              <option value="">
                {loadingCartoes ? 'Carregando cartões...' : 'Selecione...'}
              </option>
              
              {cartoes.map((cartao: any) => (
                <option key={cartao.id} value={cartao.id}>
                  {cartao.nome} (final {cartao.digitos})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Comprovante (PDF/Imagem)</label>
            <div className="relative group cursor-pointer">
              <input
                type="file"
                id="file-upload"
                accept="image/*,.pdf"
                {...register('comprovante', { required: 'Comprovante obrigatório' })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 group-hover:border-electric-500 group-hover:text-electric-400 transition-colors bg-midnight-900/50">
                <Upload size={24} className="mb-2" />
                <span className="text-sm">Clique ou arraste o arquivo aqui</span>
              </div>
            </div>
             {errors.comprovante && <span className="text-xs text-red-400">Arquivo é obrigatório</span>}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 py-3 rounded-xl bg-electric-500 text-white font-medium hover:bg-electric-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mutation.isPending ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              Registrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}