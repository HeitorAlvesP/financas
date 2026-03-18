import { motion } from 'framer-motion';

function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: 'white' }}>Olá, Heitor!</h1>
        <p style={{ color: 'var(--text-gray)' }}>Bem-vindo ao seu controle financeiro.</p>
      </header>

      {/* Cards de Resumo */}
      <div style={gridStyle}>
        <CardSaldo titulo="Saldo Total" valor="R$ 0,00" cor="var(--neon-green)" />
        <CardSaldo titulo="Receitas" valor="R$ 0,00" cor="#00ff88" />
        <CardSaldo titulo="Despesas" valor="R$ 0,00" cor="#ff4d4d" />
      </div>
    </motion.div>
  );
}

function CardSaldo({ titulo, valor, cor }) {
  return (
    <div style={cardStyle}>
      <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{titulo}</span>
      <h2 style={{ color: cor, fontSize: '1.8rem', marginTop: '10px' }}>{valor}</h2>
    </div>
  );
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  backgroundColor: 'var(--bg-card)',
  padding: '25px',
  borderRadius: '16px',
  border: '1px solid var(--border-color)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};

export default Dashboard;