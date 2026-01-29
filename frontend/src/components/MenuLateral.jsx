import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function MenuLateral() {
  const navigate = useNavigate();

  const itensMenu = [
    { nome: 'Resumo', rota: '/dashboard' },
    { nome: 'Transações', rota: '/transacoes' },
    { nome: 'Categorias', rota: '/categorias' },
    { nome: 'Configurações', rota: '/configuracoes' }
  ];

  return (
    <div style={sidebarStyle}>
      <h2 style={logoStyle}>HALPI</h2>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {itensMenu.map((item) => (
          <motion.button
            key={item.nome}
            onClick={() => navigate(item.rota)}
            style={itemButtonStyle}
            whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 136, 0.1)' }}
          >
            {item.nome}
          </motion.button>
        ))}
      </nav>

      <button onClick={() => navigate('/login')} style={sairButtonStyle}>
        Sair
      </button>
    </div>
  );
}

const sidebarStyle = {
  width: '200px', // Largura reduzida para ser menos "espaçoso"
  height: '100vh',
  backgroundColor: 'var(--bg-card)',
  borderRight: '1px solid var(--border-color)',
  padding: '30px 15px',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  boxSizing: 'border-box'
};

const logoStyle = {
  color: 'var(--neon-green)',
  fontSize: '1.8rem',
  marginBottom: '50px',
  textAlign: 'center',
  letterSpacing: '2px'
};

const itemButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  textAlign: 'left',
  padding: '10px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '0.9rem', // Fonte levemente menor
  transition: '0.3s'
};

const sairButtonStyle = {
  marginTop: 'auto',
  background: 'none',
  border: '1px solid #ff4d4d',
  color: '#ff4d4d',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default MenuLateral;