import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { LoginRequest } from '../types';

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>();

  async function handleLogin(data: LoginRequest) {
    try {
      await signIn(data);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error(error);
      alert('Erro no login! Verifique suas credenciais.');
    }
  }

  return (
    <div className="min-h-screen bg-midnight-900 flex items-center justify-center p-4">
      <div className="bg-midnight-800 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md space-y-8">
        
        <div className="text-center">
          <div className="w-12 h-12 bg-electric-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg shadow-electric-500/20">
            M
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo</h2>
          <p className="text-slate-400">Faça login para gerenciar seus cartões</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
              </div>
              <input 
                type="email" 
                placeholder="seu@email.com"
                {...register("email", { required: "E-mail é obrigatório" })}
                className={`block w-full pl-10 pr-3 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all
                  ${errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                  }`}
              />
            </div>
            {errors.email && <span className="text-xs text-red-400 ml-1">{errors.email.message}</span>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Senha</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 transition-colors ${errors.senha ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
              </div>
              
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                {...register("senha", { required: "Senha é obrigatória" })}
                className={`block w-full pl-10 pr-10 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all
                  ${errors.senha 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-electric-400 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
             
             <div className="flex justify-between items-start mt-1">
                {errors.senha ? (
                    <span className="text-xs text-red-400 ml-1">{errors.senha.message}</span>
                ) : (
                    <span></span>
                )}
                
                <Link 
                  to="/recuperar-senha" 
                  className="text-xs font-medium text-electric-500 hover:text-electric-400 transition-colors"
                >
                  Esqueceu sua senha?
                </Link>
             </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-electric-500 hover:bg-electric-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Entrando...
              </>
            ) : (
              <>
                Entrar
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="text-center pt-2 border-t border-slate-800 mt-6">
              <p className="text-slate-400 text-sm mt-4">
                Ainda não tem conta?{' '}
                <Link to="/register" className="text-electric-400 hover:text-electric-300 font-semibold transition-colors hover:underline">
                  Crie agora
                </Link>
              </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;