import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
    buttonStyle,
    inputGroupStyle,
    inputStyle,
    labelStyle,
    linkButtonStyle,
} from './style/styleLogin'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

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
        Swal.fire({
          title: 'Bem-vindo!',
          text: dados.mensagem,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          localStorage.setItem('token', dados.token);
          localStorage.setItem('usuarioId', dados.usuario.id);
          localStorage.setItem('usuarioNome', dados.usuario.nome);
          navigate('/dashboard');
        });
      } else if (resposta.status === 403) {
        try {
          await fetch('http://localhost:3000/api/usuarios/reenviar-codigo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
          });

          Swal.fire({
            title: 'E-mail não confirmado',
            text: 'Encaminhamos um novo código para seu e-mail.',
            icon: 'warning',
            confirmButtonColor: '#2e7d32'
          }).then(() => {
            navigate('/validacao-pendente', { state: { email: email } });
          });
        } catch (err) {
          Swal.fire('Erro', 'Não foi possível reenviar o código.', 'error');
        }
      } else {
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

        <div style={{ textAlign: 'right', marginTop: '5px' }}>
          <span
            onClick={() => navigate('/recuperar-senha')}
            style={linkButtonStyle}
            onMouseEnter={(e) => e.target.style.color = 'var(--neon-green)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-gray)'}
          >
            Esqueci minha senha
          </span>
        </div>

      </form>
    </div>
  );
}

export default Login;