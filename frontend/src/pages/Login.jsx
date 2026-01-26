import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const lidarComLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        // Login com sucesso!
        Swal.fire({
          title: 'Bem-vindo!',
          text: dados.mensagem,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Após o alerta sumir, navegamos para o dashboard de teste
          navigate('/dashboard');
        });
      } else if (resposta.status === 403) {
        // Se o erro for 403 (Não confirmado), manda para a nova página
        Swal.fire({
          title: 'E-mail não confirmado',
          text: 'Vamos te levar para a página de validação.',
          icon: 'warning',
          confirmButtonColor: '#2e7d32'
        }).then(() => {
          // Passamos o email no state para a próxima página saber quem validar
          navigate('/validacao-pendente', { state: { email: email } });
        });
      } else {
        // Caso o e-mail não esteja confirmado, a senha esteja errada, etc.
        Swal.fire('Erro no acesso', dados.erro, 'error');
      }
    } catch (err) {
      Swal.fire('Erro', 'Não foi possível conectar ao servidor.', 'error');
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
            required
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
            required
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
      </form>
    </div>
  );
}

// Estilos mantidos para consistência visual
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', color: 'black' };
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default Login;