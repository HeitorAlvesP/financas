import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ValidacaoPendente() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; 
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const validarNovamente = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios/validar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo })
      });

      if (resposta.ok) {
        Swal.fire('Sucesso!', 'Conta ativada! Agora você pode logar.', 'success')
          .then(() => navigate('/login'));
      } else {
        const dados = await resposta.json();
        Swal.fire('Erro', dados.erro, 'error');
      }
    } catch (err) {
      Swal.fire('Erro', 'Falha ao conectar ao servidor.', 'error');
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
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', color: 'white', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--neon-green)', fontSize: '2rem', marginBottom: '30px' }}>
        CONFIRMAÇÃO PENDENTE
      </h2>
      
      <p style={{ color: 'var(--text-gray)', marginBottom: '20px', lineHeight: '1.5' }}>
        Vimos que você ainda não confirmou o e-mail: <br/>
        <strong style={{ color: 'white' }}>{email}</strong>
      </p>

      <form onSubmit={validarNovamente}>
        <input 
          type="text" 
          value={codigo} 
          onChange={e => setCodigo(e.target.value)} 
          placeholder="000000"
          maxLength="6"
          style={{ 
            ...inputStyle, 
            textAlign: 'center', 
            fontSize: '24px', 
            letterSpacing: '5px',
            marginBottom: '10px' 
          }}
          onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
          onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
        />

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
          VALIDAR CONTA
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={lidarComReenvio}
          disabled={carregando}
          style={reenvioButtonStyle(carregando)}
          onMouseEnter={(e) => { if(!carregando) e.target.style.color = 'var(--neon-green)' }}
          onMouseLeave={(e) => { if(!carregando) e.target.style.color = 'white' }}
        >
          {carregando ? 'Enviando...' : 'Não recebi o código? Reenviar e-mail'}
        </button>
      </div>

      <button 
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
        VOLTAR PARA O LOGIN
      </button>
    </div>
  );
}

// --- ESTILOS PADRONIZADOS ---

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
  marginTop: '25px',
  background: 'none',
  border: '1px solid var(--border-color)',
  color: 'var(--text-gray)',
  padding: '12px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};

const reenvioButtonStyle = (carregando) => ({
  background: 'none',
  border: 'none',
  color: 'var(--neon-green)',
  textDecoration: 'underline',
  cursor: carregando ? 'not-allowed' : 'pointer',
  fontSize: '14px',
  opacity: carregando ? 0.6 : 1,
  transition: 'color 0.3s ease'
});

export default ValidacaoPendente;