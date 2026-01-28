import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [codigoDigitado, setCodigoDigitado] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [carregando, setCarregando] = useState(false);

  const lidarComCadastro = async (e) => {
    e.preventDefault()
    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, confirmarSenha })
      })
      const dados = await resposta.json()

      if (resposta.ok) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Código encaminhado ao e-mail!',
          icon: 'success',
          confirmButtonColor: '#2e7d32'
        }).then(() => setEtapa(2))
      } else {
        Swal.fire('Erro', dados.erro, 'error')
      }
    } catch (err) {
      Swal.fire('Erro', 'Erro ao conectar com o servidor.', 'error')
    }
  }

  const validarCodigo = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo: codigoDigitado })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        Swal.fire({
          title: 'Parabéns!',
          text: 'Cadastro finalizado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#2e7d32'
        }).then(() => navigate('/login'));
      } else {
        Swal.fire('Erro', dados.erro, 'error');
      }
    } catch (err) {
      Swal.fire('Erro', 'Erro ao conectar com o servidor.', 'error');
    }
  };

  const lidarComReenvio = async () => {
    setCarregando(true);
    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios/reenviar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (resposta.ok) {
        Swal.fire('Enviado!', 'Um novo código foi enviado para seu e-mail.', 'success');
      } else {
        Swal.fire('Erro', 'Não foi possível reenviar o código.', 'error');
      }
    } catch (err) {
      Swal.fire('Erro', 'Erro de conexão.', 'error');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', color: 'white' }}>
      <h2 style={{ color: 'var(--neon-green)', textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>
        {etapa === 1 ? 'CRIE SUA CONTA' : 'VALIDAÇÃO'}
      </h2>

      {etapa === 1 ? (
        <form onSubmit={lidarComCadastro}>
          <div style={formGroup}>
            <label style={labelStyle}>Nome:</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} style={inputStyle} placeholder="Seu nome" />
          </div>
          <div style={formGroup}>
            <label style={labelStyle}>E-mail:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="seu@email.com" />
          </div>
          <div style={formGroup}>
            <label style={labelStyle}>Senha:</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} placeholder="******" />
          </div>
          <div style={formGroup}>
            <label style={labelStyle}>Confirmar Senha:</label>
            <input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} style={inputStyle} placeholder="******" />
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
            CADASTRAR
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            style={backButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--neon-green)';
              e.target.style.color = 'var(--neon-green)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.color = 'var(--text-gray)';
            }}
          >
            VOLTAR AO LOGIN
          </button>

        </form>
      ) : (
        <form onSubmit={validarCodigo}>
          <p style={{ textAlign: 'center', color: 'var(--text-gray)', marginBottom: '20px' }}>
            Digite o código enviado para <br /><strong>{email}</strong>
          </p>
          <input
            type="text"
            value={codigoDigitado}
            onChange={e => setCodigoDigitado(e.target.value)}
            placeholder="000000"
            maxLength="6"
            style={{ ...inputStyle, textAlign: 'center', fontSize: '24px', letterSpacing: '5px' }}
          />
          <button type="submit" style={buttonStyle}>FINALIZAR CADASTRO</button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              type="button"
              onClick={lidarComReenvio}
              disabled={carregando}
              style={reenvioButtonStyle(carregando)}
            >
              {carregando ? 'Enviando...' : 'Não recebi o código? Reenviar e-mail'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// --- ESTILOS ---

const formGroup = { marginBottom: '15px' };

const labelStyle = { display: 'block', color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '5px' };

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
  marginTop: '15px',
  backgroundColor: 'var(--neon-green)',
  color: '#000',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  boxSizing: 'border-box',
  boxShadow: '0 0 15px var(--neon-glow)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
};

const backButtonStyle = {
  width: '100%',
  marginTop: '12px',
  padding: '14px',
  backgroundColor: 'transparent',
  color: 'var(--text-gray)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  cursor: 'pointer',
  boxSizing: 'border-box',
  fontSize: '0.9rem'
};

const reenvioButtonStyle = (carregando) => ({
  background: 'none',
  border: 'none',
  color: 'var(--neon-green)',
  textDecoration: 'underline',
  cursor: carregando ? 'not-allowed' : 'pointer',
  fontSize: '14px',
  opacity: carregando ? 0.6 : 1
});

export default Register;