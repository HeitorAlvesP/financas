import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const lidarComLogin = (e) => {
    e.preventDefault();
    
    // Por enquanto, apenas um alerta visual
    if (email && senha) {
      Swal.fire('Login', 'Funcionalidade de login em desenvolvimento!', 'info');
    } else {
      Swal.fire('Erro', 'Preencha todos os campos', 'error');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', color: 'white', fontFamily: 'Arial' }}>
      <h1>Login</h1>
      <form onSubmit={lidarComLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={inputStyle} 
            placeholder="seu@email.com"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            style={inputStyle} 
            placeholder="******"
          />
        </div>
        <button type="submit" style={buttonStyle}>Entrar</button>
        
        <button 
          type="button" 
          onClick={() => navigate('/register')} 
          style={{ ...buttonStyle, backgroundColor: 'transparent', marginTop: '10px', border: '1px solid #4CAF50' }}
        >
          Não tem conta? Cadastre-se
        </button>
        
        {/* <button 
          type="button" 
          onClick={() => navigate('/')} 
          style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }}
        >
          Voltar ao início
        </button> */}
        
      </form>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', color: 'black' };
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default Login;