import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom' // Importamos o navegador

function Register() {
  const navigate = useNavigate() // Hook para mudar de página depois

  // Estados que você já criou
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
        body: JSON.stringify({
          email: email,
          codigo: codigoDigitado
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        Swal.fire({
          title: 'Parabéns!',
          text: 'Cadastro finalizado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#2e7d32'
        }).then(() => {

          navigate('/login');
        });
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
        body: JSON.stringify({ email }) // O 'email' já está no seu useState
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
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', color: 'white' }}>
      <h1>{etapa === 1 ? 'Crie sua conta' : 'Validação'}</h1>

      {etapa === 1 && (
        <form onSubmit={lidarComCadastro}>
          <div style={formGroup}>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} style={inputStyle} />
          </div>
          <div style={formGroup}>
            <label>E-mail:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>
          <div style={formGroup}>
            <label>Senha:</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} />
          </div>
          <div style={formGroup}>
            <label>Confirmar Senha:</label>
            <input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Cadastrar</button>
          <button type="button" onClick={() => navigate('/')} style={backButtonStyle}>Voltar ao Início</button>
        </form>
      )}
      {etapa === 2 && (
        <form onSubmit={validarCodigo}>
          <p>Digite o código enviado para <strong>{email}</strong>:</p>
          <input
            type="text"
            value={codigoDigitado}
            onChange={e => setCodigoDigitado(e.target.value)}
            placeholder="000000"
            maxLength="6"
            style={{ ...inputStyle, textAlign: 'center', fontSize: '20px' }}
          />
          <button type="submit" style={buttonStyle}>Finalizar Cadastro</button>

          {/* NOVO BOTÃO DE REENVIO NO CADASTRO */}
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button
              type="button"
              onClick={lidarComReenvio}
              disabled={carregando}
              style={{
                background: 'none',
                border: 'none',
                color: '#4CAF50',
                textDecoration: 'underline',
                cursor: carregando ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {carregando ? 'Enviando...' : 'Não recebi o código? Reenviar e-mail'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// Estilos básicos para manter a organização
const formGroup = { marginBottom: '15px' }
const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', color: 'black' }
const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
const backButtonStyle = { width: '100%', marginTop: '10px', padding: '10px', backgroundColor: 'transparent', color: 'gray', border: '1px solid gray', borderRadius: '4px', cursor: 'pointer' }

export default Register;