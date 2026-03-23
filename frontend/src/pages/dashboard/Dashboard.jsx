import { motion } from 'framer-motion';

import{
  gridStyle,
  cardStyle
} from './style/styleDashboard.js'

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

export default Dashboard;