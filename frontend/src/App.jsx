import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './components/AuthLayout';
import LayoutPrivado from './components/LayoutPrivado';

// Páginas Públicas
import Login from './pages/Login';
import Register from './pages/Register';
import RecuperarSenha from './pages/RecuperarSenha';
import ValidacaoPendente from './pages/ValidacaoPendente';

// Páginas Privadas
import Dashboard from './pages/Dashboard';
import MinhaConta from './pages/MinhaConta';

function App() {
  return (
    <Router>
      <Routes>

        {/* --- ROTAS PÚBLICAS (Com a ilustração e fundo radial) --- */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/validacao-pendente" element={<ValidacaoPendente />} />
        </Route>

        {/* --- ROTAS PRIVADAS (Com Menu Lateral e Fundo Escuro) --- */}
        <Route element={<LayoutPrivado />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transacoes" element={<Dashboard />} />
          <Route path="/categorias" element={<Dashboard />} />
          <Route path="/configuracoes" element={<Dashboard />} />
          <Route path="/perfil" element={<MinhaConta />} />
        </Route>

        {/* Rota de fallback para 404 - Opcional */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;