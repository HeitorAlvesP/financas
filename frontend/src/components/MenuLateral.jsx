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

            {/* <div style={containerBotoesFinais}> */}
            <div style={containerBotoesFinais}>
                
                {/* NOVO BOTÃO: Minha Conta */}
                <button
                    onClick={() => navigate('/perfil')}
                    style={minhaContaButtonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = 'var(--neon-green)';
                        e.target.style.color = 'var(--neon-green)';
                        e.target.style.boxShadow = '0 0 10px var(--neon-glow-claro)';
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = 'var(--neon-glow-claro)';
                        e.target.style.color = 'var(--neon-glow-claro)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Minha Conta
                </button>

                {/* Botão Sair que você já tem */}
                <button
                    onClick={() => navigate('/login')}
                    style={sairButtonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = 'red'; // Vermelho vibrante no hover
                        e.target.style.color = 'red';
                        e.target.style.boxShadow = '0 0 15px rgba(250, 0, 0, 0.73)'; // Glow vermelho
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgb(255, 77, 77)'; // Vermelho opaco no estado normal
                        e.target.style.color = ' rgb(255, 77, 77)';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Sair
                </button>

            </div>

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

const containerBotoesFinais = {
    marginTop: 'auto', // Empurra os botões para o final da barra lateral
    display: 'flex',
    flexDirection: 'column',
    gap: '10px' // Espaço entre o Minha Conta e o Sair
};

const minhaContaButtonStyle = {
    background: 'none',
    border: '1px solid var(--neon-glow-claro)',
    color: 'var(--neon-glow-claro)',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
};

const sairButtonStyle = {
    background: 'none',
    border: '1px solid rgb(255, 77, 77)', // Começa com borda vermelha suave
    color: ' rgb(255, 77, 77)',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease', // Essencial para o brilho e a escala serem suaves
    boxSizing: 'border-box',
    width: '100%'
};

export default MenuLateral;