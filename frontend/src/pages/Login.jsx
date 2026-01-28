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
        // 1. Chamamos a rota de reenvio silenciosamente
        try {
          await fetch('http://localhost:3000/api/usuarios/reenviar-codigo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
          });

          // 2. Exibimos o alerta que você solicitou
          Swal.fire({
            title: 'E-mail não confirmado',
            text: 'Encaminhamos um novo código para seu e-mail.',
            icon: 'warning',
            confirmButtonColor: '#2e7d32'
          }).then(() => {
            // 3. Leva para a página de validação pendente
            navigate('/validacao-pendente', { state: { email: email } });
          });
        } catch (err) {
          Swal.fire('Erro', 'Não foi possível reenviar o código.', 'error');
        }
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
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  marginTop: '8px',
  backgroundColor: 'var(--input-bg)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  color: 'white',
  outline: 'none',
  transition: '0.3s'
};

const buttonStyle = {
  width: '100%',
  padding: '16px',
  marginTop: '24px',
  backgroundColor: 'var(--neon-green)',
  color: '#000000',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0 0 20px var(--neon-glow)', // O segredo do brilho
  transition: '0.3s transform'
};

export default Login;