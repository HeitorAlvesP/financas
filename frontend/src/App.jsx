import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos as páginas que criamos na pasta /pages
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    // O Router envolve toda a nossa aplicação para permitir a navegação
    <Router>
      <Routes>
        {/* Definimos o caminho (path) e qual componente deve aparecer (element) */}
        
        {/* Página Principal (Apresentação) */}
        <Route path="/" element={<Home />} />
        
        {/* Página de Cadastro */}
        <Route path="/register" element={<Register />} />

        {/* Futura Página de Login (podemos deixar comentada ou criar um componente simples) */}
        <Route path="/login" element={<div style={{color: 'white', padding: '40px'}}>Página de Login em construção...</div>} />

      </Routes>
    </Router>
  );
}

export default App;