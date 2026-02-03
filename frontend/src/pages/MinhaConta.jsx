import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

function MinhaConta() {
    // Estados iniciais (depois virão do seu banco de dados)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('********');
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
        const buscarDadosPerfil = async () => {
            const idUsuario = localStorage.getItem('usuarioId');

            if (!idUsuario) {
                console.error("ID do usuário não encontrado");
                return;
            }

            try {
                // Chamamos a rota que definimos anteriormente: /perfil/:id
                const response = await fetch(`http://localhost:5173/perfil/${idUsuario}`);
                const data = await response.json();

                if (response.ok) {
                    setNome(data.nome);
                    setEmail(data.email);
                    // Se o CPF já existir, aplicamos a máscara que você criou
                    setCpf(data.cpf ? formatarCPF(data.cpf) : '');
                    setNascimento(data.data_nascimento || '');
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setCarregando(false);
            }
        };

        buscarDadosPerfil();
    }, []);

    if (carregando) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--neon-green)' }}>
                Carregando dados do perfil...
            </div>
        );
    }

    return (
        <div style={paginaCentralizadaStyle}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={cardContainerStyle}
            >
                <header style={{ marginBottom: '25px', textAlign: 'left' }}>
                    <h1 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>Minha Conta</h1>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                        Complete seus dados para maior segurança na plataforma.
                    </p>
                </header>

                <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Campo Nome */}
                    <div style={fieldGroup}>
                        <label style={labelStyle}>Nome Completo</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
                            onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
                        />
                    </div>

                    {/* Linha Dupla: CPF e Nascimento - FORÇANDO LADO A LADO */}
                    <div style={linhaDuplaStyle}>

                        <div style={colunaMeioStyle}>
                            <label style={labelStyle}>CPF</label>
                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                maxLength="14"
                                value={cpf}
                                onChange={(e) => {
                                    const valorFormatado = formatarCPF(e.target.value);
                                    setCpf(valorFormatado);
                                }}
                                style={inputStyle}
                                onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
                                onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
                            />
                        </div>

                        <div style={colunaMeioStyle}>
                            <label style={labelStyle}>Data de Nascimento</label>
                            <input
                                type="date"
                                value={nascimento}
                                onChange={(e) => setNascimento(e.target.value)}
                                style={{ ...inputStyle, colorScheme: 'dark' }}
                                onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
                                onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
                            />
                        </div>

                    </div>

                    {/* E-mail */}
                    <div style={fieldGroup}>
                        <label style={labelStyle}>E-mail (Não editável)</label>
                        <input type="email" value={email} readOnly style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
                    </div>

                    {/* Senha */}
                    <div style={fieldGroup}>
                        <label style={labelStyle}>Senha</label>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="password"
                                value={senha}
                                readOnly
                                style={inputStyle}
                                onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
                                onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
                            />
                            <button type="button" style={alterarSenhaBtn}>Alterar</button>
                        </div>

                    </div>

                    <button
                        type="submit" style={saveButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.02)';
                            e.target.style.boxShadow = '0 0 25px var(--neon-green)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 0 15px var(--neon-glow)';
                        }}>
                        ATUALIZAR MEUS DADOS
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
// --- ESTILOS ---

const paginaCentralizadaStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Ocupa toda a altura do MainLayout
    width: '100%',
    boxSizing: 'border-box'
};

const cardContainerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '50px', // Aumentei o respiro interno
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    width: '90%',      // Ocupa 90% da largura disponível...
    maxWidth: '900px', // ...até o limite de 900px (mais imponente)
    boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
    boxSizing: 'border-box'
};


const linhaDuplaStyle = {
    display: 'flex',
    flexDirection: 'row', // Garante o alinhamento horizontal
    justifyContent: 'space-between',
    gap: '30px',          // Espaço generoso entre os campos
    width: '100%',
    marginBottom: '20px'
};

const colunaMeioStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(50% - 15px)' // Garante exatamente metade menos metade do gap
};

const containerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '30px',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
};

const fieldGroup = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
};

const labelStyle = {
    display: 'block',
    color: 'var(--text-gray)',
    marginBottom: '8px',
    fontSize: '0.9rem',
};

const inputStyle = {
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

const alterarSenhaBtn = {
    background: 'none',
    border: '1px solid var(--border-color)',
    color: 'white',
    padding: '0 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
};

const saveButtonStyle = {
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

export default MinhaConta;