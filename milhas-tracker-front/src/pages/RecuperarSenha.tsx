import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle, KeyRound } from 'lucide-react';

type RecoverPasswordRequest = {
  email: string;
};

function RecuperarSenha() {
  // Estado que controla a visualização: false = exibe formulário, true = exibe mensagem de sucesso
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Hook do react-hook-form para gerenciar validação, erros e submissão
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<RecoverPasswordRequest>();

  // Função disparada no submit. Atualmente simula uma chamada de API (delay de 1.5s)
  async function handleRecover(data: RecoverPasswordRequest) {
    console.log('Enviando email de recuperação para:', data.email);
    
    // Simulação de espera de rede (Network Request)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Altera o estado para mostrar a tela de sucesso
    setIsEmailSent(true);
  }

  return (
    // Container principal: Centralizado vertical e horizontalmente com fundo escuro
    <div className="min-h-screen bg-midnight-900 flex items-center justify-center p-4">
      <div className="bg-midnight-800 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md space-y-8">
        
        {/* Cabeçalho Dinâmico: Altera ícone e texto dependendo se o email foi enviado ou não */}
        <div className="text-center">
          <div className="w-12 h-12 bg-electric-500 rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4 shadow-lg shadow-electric-500/20">
            {isEmailSent ? <CheckCircle className="w-6 h-6" /> : <KeyRound className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isEmailSent ? 'Verifique seu e-mail' : 'Recuperar Senha'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isEmailSent 
              ? 'Enviamos as instruções de recuperação para o endereço informado.' 
              : 'Digite seu e-mail e enviaremos um link para você redefinir sua senha.'}
          </p>
        </div>

        {/* Renderização Condicional do Corpo do Card */}
        {isEmailSent ? (
          // --- ESTADO DE SUCESSO ---
          // Feedback visual informando que o processo ocorreu bem
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-electric-500/10 border border-electric-500/20 rounded-xl p-4 text-center">
              <p className="text-electric-200 text-sm">
                Não recebeu? Verifique sua caixa de spam ou tente novamente em alguns minutos.
              </p>
            </div>
            
            {/* Botão para retornar ao Login */}
            <Link 
              to="/" 
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para o Login
            </Link>
          </div>
        ) : (
          // --- ESTADO DE FORMULÁRIO ---
          // Formulário de entrada de e-mail
          <form onSubmit={handleSubmit(handleRecover)} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">E-mail cadastrado</label>
              
              {/* Wrapper do input para posicionamento do ícone e efeitos de foco */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Ícone muda de cor se houver erro ou se o campo estiver em foco (group-focus-within) */}
                  <Mail className={`h-5 w-5 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-500 group-focus-within:text-electric-400'}`} />
                </div>
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  // Registro do campo no React Hook Form com regras de validação
                  {...register("email", { 
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Regex padrão de e-mail
                      message: "Insira um e-mail válido"
                    }
                  })}
                  // Estilização condicional baseada na presença de erros (borda vermelha vs borda padrão)
                  className={`block w-full pl-10 pr-3 py-3 bg-midnight-900 border rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all
                    ${errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-slate-700 focus:border-electric-500 focus:ring-electric-500'
                    }`}
                />
              </div>
              {/* Exibição da mensagem de erro de validação */}
              {errors.email && <span className="text-xs text-red-400 ml-1">{errors.email.message}</span>}
            </div>

            {/* Botão de Submit com estados: Normal, Loading (spinner) e Disabled */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-electric-500 hover:bg-electric-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Enviando...
                </>
              ) : (
                'Enviar Link de Recuperação'
              )}
            </button>

            {/* Link secundário para voltar ao login sem submeter */}
            <div className="text-center mt-4">
              <Link 
                to="/" 
                className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RecuperarSenha;