import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ValidacaoPendente() {
  const navigate = useNavigate();
  const location = useLocation();
  // Pegamos o email que foi passado via estado na navegação
  const email = location.state?.email || ''; 
  const [codigo, setCodigo] = useState('');

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

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', color: 'white', textAlign: 'center' }}>
      <h1>Confirmação Pendente</h1>
      <p>Vimos que você ainda não confirmou o e-mail: <br/><strong>{email}</strong></p>
      <form onSubmit={validarNovamente}>
        <input 
          type="text" 
          value={codigo} 
          onChange={e => setCodigo(e.target.value)} 
          placeholder="000000"
          style={{ width: '100%', padding: '10px', marginBottom: '15px', color: 'black', textAlign: 'center', fontSize: '20px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Validar Conta
        </button>
      </form>
    </div>
  );
}

export default ValidacaoPendente;