import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';
import Perfil from './pages/Perfil';
import Dashboard from './pages/Dashboard';
import Cartoes from './pages/Cartoes';
import Login from './pages/Login'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/cartoes" element={<Cartoes />} />
             <Route path="/" element={<Navigate to="/dashboard" replace />} />
             <Route path="/perfil" element={<Perfil />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;