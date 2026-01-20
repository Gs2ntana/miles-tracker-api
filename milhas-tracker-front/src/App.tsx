import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../src//pages/Dashboard';
import Cartoes from '../src/pages/Cartoes';
import Login from '../src/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cartoes" element={<Cartoes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;