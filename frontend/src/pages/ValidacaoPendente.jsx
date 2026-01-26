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

  // NOVA FUNÇÃO: Reenviar código manualmente
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
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', color: 'white', textAlign: 'center' }}>
      <h1>Confirmação Pendente</h1>
      <p>Vimos que você ainda não confirmou o e-mail: <br /><strong>{email}</strong></p>

      <form onSubmit={validarNovamente}>
        <input
          type="text"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          placeholder="000000"
          maxLength="6"
          style={{ width: '100%', padding: '10px', marginBottom: '15px', color: 'black', textAlign: 'center', fontSize: '20px' }}
        />
        <button type="submit" style={buttonStyle}>
          Validar Conta
        </button>
      </form>

      {/* BOTÃO DE REENVIO */}
      <button
        onClick={lidarComReenvio}
        disabled={carregando}
        style={{
          background: 'none',
          border: 'none',
          color: '#4CAF50',
          textDecoration: 'underline',
          marginTop: '20px',
          cursor: carregando ? 'not-allowed' : 'pointer'
        }}
      >
        {carregando ? 'Enviando...' : 'Não recebi o código? Reenviar e-mail'}
      </button>

      <button
        onClick={() => navigate('/login')}
        style={{ display: 'block', width: '100%', marginTop: '20px', background: 'none', border: '1px solid gray', color: 'gray', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
      >
        Voltar para o Login
      </button>
    </div>
  );
}

const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default ValidacaoPendente;