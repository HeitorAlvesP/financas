import { useState, useEffect } from 'react' // Importamos "Hooks" (ferramentas do React)

function App() {
  // Criamos uma "caixa" (estado) para guardar a mensagem que vem do banco
  const [mensagem, setMensagem] = useState('Carregando...')

  // O useEffect faz algo assim que a tela abre
  useEffect(() => {
    // Buscamos os dados daquela rota que criamos no Node
    fetch('http://localhost:3000/api/status')
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
        setMensagem(data.mensagem) // Guarda a mensagem do backend na nossa "caixa"
      })
      .catch(err => {
        setMensagem('Erro ao conectar com o backend')
        console.error(err)
      })
  }, []) // O array vazio [] diz para rodar isso apenas UMA VEZ ao abrir a página

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Meu Sistema de Finanças</h1>
      <p>Status do sistema:</p>
      {/* Exibimos o que está dentro da nossa caixa "mensagem" */}
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '5px',
        color: 'green' 
      }}>
        {mensagem}
      </div>
    </div>
  )
}

export default App