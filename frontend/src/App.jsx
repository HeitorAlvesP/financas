import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ValidacaoPendente from './pages/ValidacaoPendente';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} /> 
        {/* Quando pronto o home altere aqui para {<Home />} e acesse o aquivo Login e d escomente o botao*/}
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/validacao-pendente" element={<ValidacaoPendente />} />

      </Routes>
    </Router>
  );
}

export default App;