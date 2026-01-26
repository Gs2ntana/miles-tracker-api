import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import type { RegisterRequest } from '../types';

type RegisterForm = RegisterRequest & {
  confirmarSenha: string;
};

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isSuccess, setIsSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    watch,
    setError,
    formState: { errors, isSubmitting } 
  } = useForm<RegisterForm>();

  const senhaValue = watch("senha");

  async function handleRegister(data: RegisterForm) {
    try {
      const { confirmarSenha, ...payload } = data;
      
      await authService.register(payload);
      
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error(error);
      setError("root", { 
        message: "Erro ao criar conta. Tente um e-mail diferente." 
      });
    }
  }

  return (
    <div className="min-h-screen bg-midnight-900 flex items-center justify-center p-4">
      <div className="bg-midnight-800 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md space-y-8 relative overflow-hidden">
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric-500/10 text-electric-500 mb-4 border border-electric-500/20">
            {isSuccess ? <CheckCircle size={24} /> : <User size={24} />}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-slate-400 text-sm">
            Junte-se ao Milhas<span className="text-electric-500">.</span> e controle seus ativos.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-semibold text-white mb-2">Conta Criada!</h3>
            <p className="text-slate-400">Redirecionando para o login...</p>
            <Loader2 className="w-8 h-8 text-electric-500 animate-spin mx-auto mt-6" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5 animate-in slide-in-from-bottom-4 duration-500">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Nome Completo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${errors.nome ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  {...register("nome", { required: "Nome é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                  className={`block w-full pl-10 pr-3 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all
                    ${errors.nome 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                    }`}
                />
              </div>
              {errors.nome && <span className="text-xs text-red-400 ml-1">{errors.nome.message}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  {...register("email", { 
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Insira um e-mail válido"
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all
                    ${errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                    }`}
                />
              </div>
              {errors.email && <span className="text-xs text-red-400 ml-1">{errors.email.message}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${errors.senha ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  {...register("senha", { 
                    required: "Senha é obrigatória",
                    minLength: { value: 6, message: "Mínimo de 6 caracteres" }
                  })}
                  className={`block w-full pl-10 pr-10 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all
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
              {errors.senha && <span className="text-xs text-red-400 ml-1">{errors.senha.message}</span>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Confirmar Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${errors.confirmarSenha ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  {...register("confirmarSenha", { 
                    required: "Confirme sua senha",
                    validate: (val) => {
                      if (watch('senha') != val) {
                        return "As senhas não coincidem";
                      }
                    }
                  })}
                  className={`block w-full pl-10 pr-10 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all
                    ${errors.confirmarSenha 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-electric-400 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmarSenha && <span className="text-xs text-red-400 ml-1">{errors.confirmarSenha.message}</span>}
            </div>

            {errors.root && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                {errors.root.message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-electric-500 hover:bg-electric-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Criando conta...
                </>
              ) : (
                <>
                  Cadastrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-slate-400 text-sm">
                Já tem uma conta?{' '}
                <Link to="/" className="text-electric-400 hover:text-electric-300 font-semibold transition-colors hover:underline">
                  Faça Login
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;