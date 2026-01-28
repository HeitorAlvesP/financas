import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando o novo Layout e as Páginas
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ValidacaoPendente from './pages/ValidacaoPendente';
import Dashboard from './pages/Dashboard';
import RecuperarSenha from './pages/RecuperarSenha';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota "Pai" que carrega o fundo fixo e a imagem */}
        <Route element={<AuthLayout />}>
          {/* Rotas "Filhas" que aparecem dentro do Outlet do AuthLayout */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/validacao-pendente" element={<ValidacaoPendente />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        </Route>

        {/* Dashboard fica fora para não ter a imagem do astronauta ao fundo */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;