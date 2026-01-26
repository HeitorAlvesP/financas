import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
      <h1>🚀 Dashboard</h1>
      <p style={{ fontSize: '20px' }}>Estamos aqui! O login funcionou.</p>
      <button 
        onClick={() => navigate('/login')}
        style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
      >
        Sair (Logout)
      </button>
    </div>
  );
}

export default Dashboard;