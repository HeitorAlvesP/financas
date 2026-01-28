import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import imagem_tela_inicial from '../assets/imagem_tela_inicial.svg';

function AuthLayout() {
    return (
        <div style={containerStyle}>
            {/* LADO ESQUERDO: Texto e Ilustração */}
            <div style={leftSideStyle}>
                <div style={textOverlayStyle}>
                    <h1 style={titleStyle}>HALPI FINANÇAS</h1>
                    <p style={subtitleStyle}>Controle seu futuro, um clique por vez.</p>
                </div>

                {/* Usando apenas a sua imagem importada */}
                <img
                    src={imagem_tela_inicial}
                    alt="Ilustração Financeira"
                    style={imageStyle}
                />
            </div>

            {/* LADO DIREITO: Card de Login/Cadastro */}
            <div style={rightSideStyle}>
                {/* Envolva o card com motion.div */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={cardStyle}
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
}

// --- ESTILOS REFINADOS ---

const containerStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0b0b0f 100%)',
    overflow: 'hidden'
};

const leftSideStyle = {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5%',
    position: 'relative'
};

const textOverlayStyle = {
    textAlign: 'center',
    marginBottom: '30px'
};

const titleStyle = {
    color: 'var(--neon-green)',
    fontSize: '3.5rem',
    margin: '0',
    textShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
};

const subtitleStyle = {
    fontSize: '1.2rem',
    color: 'white',
    opacity: 0.8,
    marginTop: '10px'
};

const imageStyle = {
    width: '85%',
    maxWidth: '600px',
    filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.1))'
};

const rightSideStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '5%'
};

const cardStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '50px 40px',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
    border: '1px solid rgba(255,255,255,0.08)'
};

export default AuthLayout;