import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- PASSO 1: Importar o hook de navegação
import { Lock, Mail, ArrowRight } from 'lucide-react';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // <--- PASSO 2: Inicializar a função de navegação
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        email: email,
        senha: senha
      });

      // Pega o token que o Java devolveu
      const token = response.data.token;
      
      // Salva no navegador (Isso mantém o usuário logado)
      localStorage.setItem('token', token);
      
      // <--- PASSO 3: Jogar o usuário para o Dashboard
      // O React troca de tela instantaneamente sem recarregar
      navigate('/dashboard'); 
      
    } catch (error) {
      console.error(error);
      alert('Erro no login! Verifique e-mail e senha.');
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-electric-400 transition-colors" />
              </div>
              <input 
                type="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-midnight-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Senha</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-electric-400 transition-colors" />
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-midnight-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-electric-500 hover:bg-electric-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Entrar
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;