export const paginaCentralizadaStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box'
};

export const cardContainerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '50px',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    width: '90%',
    maxWidth: '900px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
    boxSizing: 'border-box'
};


export const linhaDuplaStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '30px',
    width: '100%',
    marginBottom: '20px'
};

export const colunaMeioStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(50% - 15px)'
};

export const containerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '30px',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
};

export const fieldGroup = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
};

export const labelStyle = {
    display: 'block',
    color: 'var(--text-gray)',
    marginBottom: '8px',
    fontSize: '0.9rem',
};

export const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
};

export const alterarSenhaBtn = {
    background: 'none',
    border: '1px solid var(--border-color)',
    color: 'white',
    padding: '0 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};

export const saveButtonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--neon-green)',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    marginTop: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};

export const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

export const modalContentStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '40px',
    borderRadius: '16px',
    border: '1px solid var(--neon-green)',
    width: '400px',
    boxShadow: '0 0 30px rgba(57, 255, 20, 0.2)'
};

export const cancelButtonStyle = {
    flex: 1,
    padding: '15px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export const helpTextStyle = {
    fontSize: '0.75rem',
    color: 'var(--text-gray)',
    marginTop: '5px',
    opacity: 0.8,
    lineHeight: '1.2'
};