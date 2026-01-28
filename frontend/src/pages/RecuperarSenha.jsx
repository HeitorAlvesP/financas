import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

function RecuperarSenha() {
    const navigate = useNavigate();
    const [etapa, setEtapa] = useState(1);
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    // Etapa 1: Solicitar Recuperação
    const handleSolicitar = async (e) => {
        e.preventDefault();
        setCarregando(true);
        try {
            const resposta = await fetch('http://localhost:3000/api/usuarios/solicitar-recuperacao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const dados = await resposta.json();

            if (resposta.ok) {
                Swal.fire('Sucesso', 'Código enviado para seu e-mail!', 'success');
                setEtapa(2);
            } else {
                Swal.fire('Erro', dados.erro, 'error');
            }
        } catch (err) {
            Swal.fire('Erro', 'Falha ao conectar ao servidor.', 'error');
        } finally {
            setCarregando(false);
        }
    };

    // Etapa 2: Validar Código
    const handleValidarCodigo = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch('http://localhost:3000/api/usuarios/validar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, codigo })
            });

            if (resposta.ok) {
                setEtapa(3);
            } else {
                const dados = await resposta.json();
                Swal.fire('Erro', dados.erro, 'error');
            }
        } catch (err) {
            Swal.fire('Erro', 'Falha na conexão.', 'error');
        }
    };

    // Etapa 3: Redefinir Senha
    const handleRedefinir = async (e) => {
        e.preventDefault();
        if (novaSenha !== confirmarNovaSenha) {
            return Swal.fire('Erro', 'As senhas não coincidem.', 'error');
        }

        try {
            const resposta = await fetch('http://localhost:3000/api/usuarios/redefinir-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, novaSenha, confirmarNovaSenha })
            });

            if (resposta.ok) {
                Swal.fire('Sucesso!', 'Senha atualizada com sucesso!', 'success')
                    .then(() => navigate('/login'));
            } else {
                const dados = await resposta.json();
                Swal.fire('Erro', dados.erro, 'error');
            }
        } catch (err) {
            Swal.fire('Erro', 'Falha ao atualizar senha.', 'error');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', color: 'white' }}>
            <h2 style={{ color: 'var(--neon-green)', textAlign: 'center', marginBottom: '30px' }}>
                RECUPERAR SENHA
            </h2>

            <AnimatePresence mode="wait">
                {/* ETAPA 1: EMAIL */}
                {etapa === 1 && (
                    <motion.div key="e1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        <form onSubmit={handleSolicitar}>
                            <label style={labelStyle}>Digite seu e-mail cadastrado:</label>
                            <input
                                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                style={inputStyle} placeholder="seu@email.com"
                                onFocus={(e) => e.target.style.border = '1px solid var(--neon-green)'}
                                onBlur={(e) => e.target.style.border = '1px solid var(--border-color)'}
                            />
                            <button
                                type="submit"
                                style={buttonStyle}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.02)';
                                    e.target.style.boxShadow = '0 0 25px var(--neon-green)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 0 15px var(--neon-glow)';
                                }}
                            >
                                {carregando ? 'ENVIANDO...' : 'ENVIAR CÓDIGO'}
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* ETAPA 2: CÓDIGO */}
                {etapa === 2 && (
                    <motion.div key="e2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                        <form onSubmit={handleValidarCodigo}>
                            <p style={{ textAlign: 'center', color: 'var(--text-gray)' }}>Código enviado para <strong>{email}</strong></p>
                            <input
                                type="text" required value={codigo} onChange={e => setCodigo(e.target.value)}
                                style={{ ...inputStyle, textAlign: 'center', fontSize: '24px', letterSpacing: '5px' }}
                                placeholder="000000" maxLength="6"
                            />
                            <button type="submit" style={buttonStyle}>VERIFICAR CÓDIGO</button>
                        </form>
                    </motion.div>
                )}

                {/* ETAPA 3: NOVA SENHA */}
                {etapa === 3 && (
                    <motion.div key="e3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <form onSubmit={handleRedefinir}>
                            <label style={labelStyle}>Nova Senha:</label>
                            <input type="password" required value={novaSenha} onChange={e => setNovaSenha(e.target.value)} style={inputStyle} placeholder="******" />
                            <label style={labelStyle}>Confirmar Nova Senha:</label>
                            <input type="password" required value={confirmarNovaSenha} onChange={e => setConfirmarNovaSenha(e.target.value)} style={inputStyle} placeholder="******" />
                            <button type="submit" style={buttonStyle}>ATUALIZAR SENHA</button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => navigate('/login')}
                style={backButtonStyle}
            >
                VOLTAR AO LOGIN
            </button>
        </div>
    );
}

// Estilos mantidos do seu padrão
const labelStyle = { display: 'block', color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '5px', marginTop: '15px' };
const inputStyle = { width: '100%', padding: '14px 16px', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'white', outline: 'none', boxSizing: 'border-box', transition: 'all 0.3s ease' };
const buttonStyle = { width: '100%', padding: '16px', marginTop: '20px', backgroundColor: 'var(--neon-green)', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px var(--neon-glow)', transition: 'all 0.3s ease' };
const backButtonStyle = { width: '100%', marginTop: '15px', background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', textDecoration: 'underline' };

export default RecuperarSenha;