import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AuthLayout from './components/AuthLayout';
import LayoutPrivado from './components/LayoutPrivado';

// Páginas Públicas
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RecuperarSenha from './pages/auth/RecuperarSenha';
import ValidacaoPendente from './pages/auth/ValidacaoPendente';

// Páginas Privadas
import Dashboard from './pages/dashboard/Dashboard';
import MinhaConta from './pages/perfil/MinhaConta';
import Cartoes from './pages/cartoes/Cartoes';
import Documentacao from './pages/doc/Documentacao';

function App() {
  return (
    <Router>
      <Routes>

        {/* --- ROTAS PÚBLICAS (Acesso Livre) --- */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/validacao-pendente" element={<ValidacaoPendente />} />
        </Route>

        {/* --- ROTAS PRIVADAS (PROTEGIDAS) --- */}
        {/* Envolvemos o LayoutPrivado dentro do ProtectedRoute */}
        <Route element={<ProtectedRoute />}> 
          <Route element={<LayoutPrivado />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<MinhaConta />} />
            <Route path="/cartoes" element={<Cartoes />} />
            
            {/* --- NOVA ROTA DE DOCUMENTAÇÃO --- */}
            <Route path="/documentacao" element={<Documentacao />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;