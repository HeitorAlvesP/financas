// --- ESTILOS REAPROVEITADOS (Você pode mover para um styleDocumentacao.js depois) ---
export const paginaPrincipalStyle = {
    padding: '40px',
    marginLeft: '200px', // Respeitando o menu lateral
    minHeight: '100vh',
    backgroundColor: 'var(--bg-fundo)',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

export const headerStyle = {
    marginBottom: '40px'
};

export const tituloNeonStyle = {
    fontSize: '2.5rem',
    color: 'var(--neon-green)',
    textShadow: '0 0 10px var(--neon-glow)',
    margin: '0 0 10px 0',
    letterSpacing: '2px'
};

export const linhaDecorativaStyle = {
    height: '3px',
    width: '100px',
    backgroundColor: 'var(--neon-green)',
    boxShadow: '0 0 10px var(--neon-glow)',
    borderRadius: '2px'
};

export const listaContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
};

export const itemDocStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease'
};

export const infoDocStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
};

export const iconeFakeStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(0, 243, 255, 0.1)', // Fundo ciano bem fraco
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    border: '1px solid rgba(0, 243, 255, 0.3)'
};

export const tituloDocStyle = {
    margin: '0 0 5px 0',
    fontSize: '1.2rem',
    color: '#ffffff'
};

export const descDocStyle = {
    margin: 0,
    fontSize: '0.9rem',
    color: 'var(--text-gray)'
};

export const badgeStyle = {
    fontSize: '0.7rem',
    backgroundColor: 'var(--bg-fundo)',
    padding: '3px 8px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    marginLeft: '10px',
    verticalAlign: 'middle',
    color: '#aaa'
};

export const botaoAcaoCianoStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #00f3ff',
    color: '#00f3ff',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
};

export const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
};

export const modalContentStyle = {
    backgroundColor: 'var(--bg-fundo)',
    border: '1px solid var(--neon-green)',
    borderRadius: '12px',
    padding: '30px',
    width: '80%',
    maxWidth: '800px',
    maxHeight: '85vh',
    overflowY: 'auto',
    boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)'
};