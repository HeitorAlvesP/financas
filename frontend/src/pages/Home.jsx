import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Hook para mudar de página

  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
      <h1>Bem-vindo ao Meu Sistema de Finanças</h1>
      <p>Gerencie seus gastos e ganhe controle sobre sua vida financeira.</p>
      
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/login')} 
          style={buttonStyle}
        >
          Já tenho conta (Login)
        </button>
        
        <button 
          onClick={() => navigate('/cadastro')} 
          style={{ ...buttonStyle, backgroundColor: 'transparent', border: '1px solid #4CAF50', marginLeft: '10px' }}
        >
          Quero me registrar
        </button>
      </div>
    </div>
  );
}

const buttonStyle = { padding: '12px 24px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };

export default Home;