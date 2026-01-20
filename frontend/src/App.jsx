import { useState } from 'react'

function App() {
  // Estados para as caixas de texto (Inputs)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [aviso, setAviso] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  // Função disparada ao clicar no botão de cadastrar
  const lidarComCadastro = async (e) => {
    setAviso('');
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, confirmarSenha })
      })

      const dados = await resposta.json()

      if (resposta.ok) {
        setAviso(`Sucesso: ${dados.mensagem}`)
        // Limpa os campos após o cadastro
        setNome(''); setEmail(''); setSenha(''); setConfirmarSenha('');
      } else {
        setAviso(`Erro: ${dados.erro}`)
      }
    } catch (err) {
      setAviso('Erro ao conectar com o servidor.')
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', color: 'white' }}>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={lidarComCadastro}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={e => setConfirmarSenha(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Cadastrar
        </button>
      </form>

      {aviso && (
        <p style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: aviso.startsWith('Sucesso') ? '#2e7d32' : '#d32f2f'
        }}>
          {aviso}
        </p>
      )}
    </div>
  )
}

export default App