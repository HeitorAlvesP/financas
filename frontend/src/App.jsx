import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} /> 
        {/* Quando pronto o home altere aqui para {<Home />} e acesse o aquivo Login e descomente o botao*/}
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;