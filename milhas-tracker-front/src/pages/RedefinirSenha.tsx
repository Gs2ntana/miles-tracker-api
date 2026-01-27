import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

type ResetForm = {
  novaSenha: string;
  confirmarSenha: string;
};

function RedefinirSenha() {
  const navigate = useNavigate();
  
  // Hook para ler parâmetros da URL (Query Strings)
  // Essencial para capturar o token de segurança enviado por e-mail (ex: /redefinir?token=xyz)
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Estados locais para controle de UI
  const [isSuccess, setIsSuccess] = useState(false); // Alterna entre formulário e mensagem de sucesso
  const [showPassword, setShowPassword] = useState(false); // Toggle de visibilidade da senha 1
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle de visibilidade da senha 2

  const { 
    register, 
    handleSubmit, 
    watch, // Permite observar valores de campos em tempo real
    formState: { errors, isSubmitting } 
  } = useForm<ResetForm>();

  // Observa o campo "novaSenha" para validar se a "confirmarSenha" é idêntica
  const novaSenhaValue = watch("novaSenha");

  // Efeito para validar a presença do token assim que o componente monta
  useEffect(() => {
    if (!token) {
        console.warn("Nenhum token encontrado na URL");
    }
  }, [token, navigate]);

  async function handleReset(data: ResetForm) {
    // Validação de segurança extra antes de enviar
    if (!token) return alert('Token inválido ou expirado.');

    try {
      console.log('Enviando para API:', { token, novaSenha: data.novaSenha });
      
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ativa a tela de sucesso
      setIsSuccess(true);
      
      // Opcional: Redirecionar automaticamente após 3 segundos
      // setTimeout(() => navigate('/'), 3000);
      
    } catch (error) {
      alert('Erro ao redefinir senha.');
    }
  }

  // --- RENDERIZAÇÃO CONDICIONAL: TOKEN AUSENTE ---
  // Se não houver token na URL, mostra erro e impede acesso ao formulário
  if (!token) {
    return (
        <div className="min-h-screen bg-midnight-900 flex items-center justify-center p-4">
            <div className="bg-midnight-800 p-8 rounded-3xl border border-red-900/50 max-w-md w-full text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Link Inválido</h2>
                <p className="text-slate-400 mb-6">Não encontramos o token de segurança. Tente solicitar uma nova recuperação.</p>
                <Link to="/recuperar-senha" className="text-electric-400 font-semibold hover:underline">
                    Solicitar novamente
                </Link>
            </div>
        </div>
    );
  }

  // --- RENDERIZAÇÃO PRINCIPAL ---
  return (
    <div className="min-h-screen bg-midnight-900 flex items-center justify-center p-4">
      <div className="bg-midnight-800 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md space-y-8">
        
        {/* Cabeçalho Dinâmico (Muda ícone e texto baseado no sucesso) */}
        <div className="text-center">
          <div className="w-12 h-12 bg-electric-500 rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4 shadow-lg shadow-electric-500/20">
            {isSuccess ? <CheckCircle className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSuccess ? 'Senha Alterada!' : 'Criar Nova Senha'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isSuccess 
              ? 'Sua senha foi atualizada com sucesso. Você já pode fazer login.' 
              : 'Defina uma nova senha segura para sua conta.'}
          </p>
        </div>

        {/* Lógica de Exibição: Sucesso vs Formulário */}
        {isSuccess ? (
          // --- TELA DE SUCESSO ---
          <div className="animate-in fade-in zoom-in duration-500">
             <Link 
              to="/" 
              className="w-full bg-electric-500 hover:bg-electric-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-electric-500/20 transition-all flex items-center justify-center gap-2"
            >
              Fazer Login
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          // --- FORMULÁRIO DE REDEFINIÇÃO ---
          <form onSubmit={handleSubmit(handleReset)} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

            {/* Campo: Nova Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Nova Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${errors.novaSenha ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  // Alterna tipo do input entre 'text' e 'password' baseado no estado showPassword
                  type={showPassword ? "text" : "password"} 
                  placeholder="Mínimo 6 caracteres"
                  {...register("novaSenha", { 
                    required: "Senha é obrigatória",
                    minLength: { value: 6, message: "Mínimo de 6 caracteres" }
                  })}
                  className={`block w-full pl-10 pr-10 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all
                    ${errors.novaSenha 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                    }`}
                />
                {/* Botão para mostrar/esconder senha. Importante ser type="button" para não submeter o form */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-electric-400 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.novaSenha && <span className="text-xs text-red-400 ml-1">{errors.novaSenha.message}</span>}
            </div>

            {/* Campo: Confirmar Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Confirmar Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${errors.confirmarSenha ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Repita a senha"
                  {...register("confirmarSenha", { 
                    required: "Confirmação é obrigatória",
                    // Validação customizada: Compara este campo com o valor atual de 'novaSenha'
                    validate: (val) => {
                        if (!val) return "Confirme sua senha";
                        if (val !== novaSenhaValue) return "As senhas não coincidem";
                    }
                  })}
                  className={`block w-full pl-10 pr-10 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all
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

            {/* Botão de Envio */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-electric-500 hover:bg-electric-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Salvando...
                </>
              ) : (
                'Redefinir Senha'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RedefinirSenha;