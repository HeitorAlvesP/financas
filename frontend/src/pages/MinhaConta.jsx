import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Garanta que AnimatePresence esteja aqui
import Swal from 'sweetalert2';

function MinhaConta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('********');
    const [carregando, setCarregando] = useState(true);

    // Estados para o Modal de Senha
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const formatarCPF = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        const idUsuario = localStorage.getItem('usuarioId') || "1";
        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/perfil/${idUsuario}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, cpf, data_nascimento: nascimento }),
            });

            if (response.ok) {
                Swal.fire('Sucesso', 'Dados salvos no banco de dados!', 'success');
            } else {
                Swal.fire('Erro', 'O servidor recusou a atualização.', 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Não foi possível conectar ao servidor.', 'error');
        }
    };

    useEffect(() => {
        const buscarDadosPerfil = async () => {
            const idUsuario = localStorage.getItem('usuarioId') || "1";
            try {
                const response = await fetch(`http://localhost:3000/api/usuarios/perfil/${idUsuario}`);
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("O servidor não retornou JSON!");
                }
                const data = await response.json();
                if (response.ok) {
                    setNome(data.nome || '');
                    setEmail(data.email || '');
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

    const handleAlterarSenha = async (e) => {
        e.preventDefault();
        if (novaSenha !== confirmarSenha) {
            return Swal.fire('Erro', 'As novas senhas não coincidem.', 'error');
        }
        const idUsuario = localStorage.getItem('usuarioId') || "1";
        try {
            const response = await fetch(`http://localhost:3000/api/usuarios/perfil/alterar-senha/${idUsuario}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senhaAtual, novaSenha })
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire('Sucesso', 'Senha alterada com sucesso!', 'success');
                setIsModalOpen(false);
                setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha('');
            } else {
                Swal.fire('Erro', data.erro || 'Erro ao alterar senha.', 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Falha na conexão com o servidor.', 'error');
        }
    };

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
                    <div style={fieldGroup}>
                        <label style={labelStyle}>Nome Completo</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} />
                    </div>

                    <div style={linhaDuplaStyle}>
                        <div style={colunaMeioStyle}>
                            <label style={labelStyle}>CPF</label>
                            <input type="text" placeholder="000.000.000-00" maxLength="14" value={cpf} onChange={(e) => setCpf(formatarCPF(e.target.value))} style={inputStyle} />
                        </div>
                        <div style={colunaMeioStyle}>
                            <label style={labelStyle}>Data de Nascimento</label>
                            <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }} />
                        </div>
                    </div>

                    <div style={fieldGroup}>
                        <label style={labelStyle}>E-mail (Não editável)</label>
                        <input type="email" value={email} readOnly style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
                    </div>

                    <div style={fieldGroup}>
                        <label style={labelStyle}>Senha</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="password" value={senha} readOnly style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
                            {/* ADICIONADO ONCLICK ABAIXO */}
                            <button type="button" onClick={() => setIsModalOpen(true)} style={alterarSenhaBtn}>Alterar</button>
                        </div>
                    </div>

                    <button type="submit" style={saveButtonStyle}>
                        ATUALIZAR MEUS DADOS
                    </button>
                </form>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <div style={overlayStyle}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={modalContentStyle}
                        >
                            <h2 style={{ color: 'white', marginBottom: '20px' }}>Alterar Senha</h2>
                            <form onSubmit={handleAlterarSenha} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={fieldGroup}>
                                    <label style={labelStyle}>Senha Atual</label>
                                    <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} style={inputStyle} required />
                                </div>
                                <div style={fieldGroup}>
                                    <label style={labelStyle}>Nova Senha</label>
                                    <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} style={inputStyle} required />
                                </div>
                                <div style={fieldGroup}>
                                    <label style={labelStyle}>Confirmar Nova Senha</label>
                                    <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} style={inputStyle} required />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button type="submit" style={saveButtonStyle}>CONFIRMAR</button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} style={cancelButtonStyle}>CANCELAR</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
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

const overlayStyle = {
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

const modalContentStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '40px',
    borderRadius: '16px',
    border: '1px solid var(--neon-green)',
    width: '400px',
    boxShadow: '0 0 30px rgba(57, 255, 20, 0.2)'
};

const cancelButtonStyle = {
    flex: 1,
    padding: '15px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default MinhaConta;