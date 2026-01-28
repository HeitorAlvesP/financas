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
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--neon-green)' }}>LOGIN</h2>

      <form onSubmit={lidarComLogin}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
            onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
            placeholder="Digite seu e-mail"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
            onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
            placeholder="Digite sua senha"
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02)';
            e.target.style.boxShadow = '0 0 25px var(--neon-green)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 0 15px var(--neon-glow)';
          }}
        >
          LOGIN
        </button>

        <button
          type="button"
          onClick={() => navigate('/register')}
          style={linkButtonStyle}
          onMouseEnter={(e) => e.target.style.color = 'var(--neon-green)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-gray)'}
        >
          Não tem uma conta? Cadastre-se
        </button>
      </form>
    </div>
  );
}

// Estilos mantidos para consistência visual
const inputGroupStyle = {
  marginBottom: '20px',
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  color: 'var(--text-gray)',
  fontSize: '0.9rem',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'var(--input-bg)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease'
};

const buttonStyle = {
  width: '100%',
  padding: '16px',
  marginTop: '20px',
  backgroundColor: 'var(--neon-green)',
  color: '#000',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  boxShadow: '0 0 15px var(--neon-glow)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-gray)',
  marginTop: '15px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  transition: 'color 0.3s'
};
export default Login;