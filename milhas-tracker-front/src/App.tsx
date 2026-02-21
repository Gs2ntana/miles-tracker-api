import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';
import Perfil from './pages/Perfil';
import Dashboard from './pages/Dashboard';
import Cartoes from './pages/Cartoes';
import Login from './pages/Login'; 
import RecuperarSenha from './pages/RecuperarSenha';
import RedefinirSenha from './pages/RedefinirSenha';
import Notificacoes from './pages/Notificacoes';
import Register from './pages/Register';
import Historico from './pages/Historico';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/cartoes" element={<Cartoes />} />
             <Route path="/" element={<Navigate to="/dashboard" replace />} />
             <Route path="/perfil" element={<Perfil />} />
             <Route path="/notificacoes" element={<Notificacoes />} />
             <Route path="/historico" element={<Historico />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;