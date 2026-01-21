import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { User, Lock, Save, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import type { UsuarioUpRequest, UpdateRequest, UsuarioResponse } from '../types';

const Perfil = () => {
  const queryClient = useQueryClient();
  
  const { setUser } = useAuth(); 

  const { data: user, isLoading } = useQuery<UsuarioResponse>({
    queryKey: ['me'],
    queryFn: userService.getMe,
  });

  const { 
    register: registerData, 
    handleSubmit: handleData, 
    formState: { errors: errorsData } 
  } = useForm<UsuarioUpRequest>();
  
  const updateDataMutation = useMutation({
    mutationFn: userService.updateMe,
    onSuccess: (newUser: UsuarioResponse) => {
      queryClient.setQueryData(['me'], newUser);
      if (setUser) setUser(newUser);
      alert('Dados atualizados com sucesso!');
    },
    onError: () => alert('Erro ao atualizar dados.')
  });

  const { 
    register: registerPass, 
    handleSubmit: handlePass, 
    reset: resetPass, 
    formState: { errors: errorsPass } 
  } = useForm<UpdateRequest>();

  const updatePassMutation = useMutation({
    mutationFn: userService.updatePassword,
    onSuccess: () => {
      resetPass();
      alert('Senha alterada com sucesso!');
    },
    onError: () => alert('Erro ao alterar senha. Verifique a senha atual.')
  });

  if (isLoading) return <div className="text-white p-8">Carregando perfil...</div>;

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Meu Perfil</h1>
        <p className="text-slate-400">Gerencie suas informações pessoais e segurança.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-midnight-800 rounded-3xl p-8 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-electric-500/10 rounded-xl text-electric-500">
              <User size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white">Informações Pessoais</h2>
          </div>

          <form onSubmit={handleData((data) => updateDataMutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Nome Completo</label>
              <input 
                {...registerData("nome", { required: "Nome é obrigatório" })} 
                defaultValue={user?.nome} 
                className={`w-full bg-slate-900 border rounded-lg p-3 text-white focus:outline-none transition-colors 
                  ${errorsData.nome ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-electric-500'}`}
              />
              {errorsData.nome && <span className="text-red-400 text-xs mt-1 block">{errorsData.nome.message}</span>}
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-1">E-mail</label>
              <input 
                type="email" 
                defaultValue={user?.email}
                disabled
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-slate-500 cursor-not-allowed" 
              />
              <p className="text-xs text-slate-600 mt-1">O e-mail não pode ser alterado.</p>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={updateDataMutation.isPending}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {updateDataMutation.isPending ? <Loader2 className="animate-spin" size={20}/> : <><Save size={20}/> Salvar Alterações</>}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-midnight-800 rounded-3xl p-8 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-semibold text-white">Segurança</h2>
          </div>

          <form onSubmit={handlePass((data) => updatePassMutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Senha Atual</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <input 
                  type="password"
                  {...registerPass("senhaAtual", { required: "Senha atual é obrigatória" })}
                  className={`w-full bg-slate-900 border rounded-lg p-3 pl-10 text-white focus:outline-none transition-colors
                    ${errorsPass.senhaAtual ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-orange-500'}`}
                  placeholder="Digite sua senha atual"
                />
              </div>
              {errorsPass.senhaAtual && <span className="text-red-400 text-xs mt-1 block">{errorsPass.senhaAtual.message}</span>}
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-1">Nova Senha</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <input 
                  type="password"
                  {...registerPass("novaSenha", { 
                    required: "Nova senha é obrigatória", 
                    minLength: { value: 6, message: "Mínimo de 6 caracteres" } 
                  })}
                  className={`w-full bg-slate-900 border rounded-lg p-3 pl-10 text-white focus:outline-none transition-colors
                    ${errorsPass.novaSenha ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-orange-500'}`}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              {errorsPass.novaSenha && <span className="text-red-400 text-xs mt-1 block">{errorsPass.novaSenha.message}</span>}
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={updatePassMutation.isPending}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20"
              >
                {updatePassMutation.isPending ? <Loader2 className="animate-spin" size={20}/> : "Atualizar Senha"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </AppLayout>
  );
};

export default Perfil;