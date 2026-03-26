import { useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// --- ESTILOS REAPROVEITADOS (Você pode mover para um styleDocumentacao.js depois) ---
const paginaPrincipalStyle = {
    padding: '40px',
    marginLeft: '200px', // Respeitando o menu lateral
    minHeight: '100vh',
    backgroundColor: 'var(--bg-fundo)',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const headerStyle = {
    marginBottom: '40px'
};

const tituloNeonStyle = {
    fontSize: '2.5rem',
    color: 'var(--neon-green)',
    textShadow: '0 0 10px var(--neon-glow)',
    margin: '0 0 10px 0',
    letterSpacing: '2px'
};

const linhaDecorativaStyle = {
    height: '3px',
    width: '100px',
    backgroundColor: 'var(--neon-green)',
    boxShadow: '0 0 10px var(--neon-glow)',
    borderRadius: '2px'
};

const listaContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px'
};

const itemDocStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease'
};

const infoDocStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
};

const iconeFakeStyle = {
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

const tituloDocStyle = {
    margin: '0 0 5px 0',
    fontSize: '1.2rem',
    color: '#ffffff'
};

const descDocStyle = {
    margin: 0,
    fontSize: '0.9rem',
    color: 'var(--text-gray)'
};

const badgeStyle = {
    fontSize: '0.7rem',
    backgroundColor: 'var(--bg-fundo)',
    padding: '3px 8px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    marginLeft: '10px',
    verticalAlign: 'middle',
    color: '#aaa'
};

const botaoAcaoCianoStyle = {
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

// --- COMPONENTE PRINCIPAL ---
function Documentacao() {
    // Lista simulada de documentos
   const [documentos] = useState([
        { 
            id: 1, 
            titulo: 'Visão Geral do Sistema', 
            desc: 'Documentação do escopo do HALPI, funcionamento dos módulos atuais e o roadmap (próximos passos).', 
            formato: 'PDF', 
            icone: '🗺️' 
        },
        { 
            id: 2, 
            titulo: 'Estrutura do Backend', 
            desc: 'Arquitetura do servidor Node.js, organização de rotas, controllers, middlewares e lógicas de negócio da API.', 
            formato: 'PDF', 
            icone: '🔌' // Plugue: representando conexões e API
        },
        { 
            id: 3, 
            titulo: 'Estrutura do Frontend', 
            desc: 'Organização do projeto React, árvore de componentes, gerenciamento de estados e estilização.', 
            formato: 'PDF', 
            icone: '💻' // Computador/Tela: representando a interface do usuário
        },
        { 
            id: 4, 
            titulo: 'Estrutura de Banco de Dados', 
            desc: 'Modelagem do SQLite, diagrama das tabelas (tb_cartao, tb_usuario) e relacionamentos.', 
            formato: 'PDF', 
            icone: '🗄️'
        },
        { 
            id: 5, 
            titulo: 'Serviços (Services)', 
            desc: 'Guias de integração e funcionamento de serviços em background: Autenticação JWT, NodeMailer, etc.', 
            formato: 'MD', 
            icone: '⚙️' 
        }
    ]);

    const handleAbrirDoc = (doc) => {
        // Alerta temporário até você criar o visualizador real
        Swal.fire({
            icon: 'info',
            title: `Abrindo: ${doc.titulo}`,
            text: `No futuro, isso fará o download ou abrirá o arquivo ${doc.formato} na tela.`,
            background: '#1e1e1e',
            color: '#ffffff',
            confirmButtonColor: '#00f3ff'
        });
    };

    return (
        <div style={paginaPrincipalStyle}>
            {/* CABEÇALHO */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={headerStyle}
            >
                <h1 style={tituloNeonStyle}>DOCUMENTAÇÃO</h1>
                <div style={linhaDecorativaStyle}></div>
                <p style={{ color: 'var(--text-gray)', marginTop: '15px' }}>
                    Área técnica destinada a desenvolvedores. Estrutura, APIs e guias do sistema HALPI.
                </p>
            </motion.header>

            {/* LISTA DE DOCUMENTOS */}
            <div style={listaContainerStyle}>
                {documentos.map((doc, index) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }} // Efeito cascata
                        style={itemDocStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#00f3ff';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.1)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={infoDocStyle}>
                            <div style={iconeFakeStyle}>
                                {doc.icone}
                            </div>
                            <div>
                                <h3 style={tituloDocStyle}>
                                    {doc.titulo} 
                                    <span style={badgeStyle}>{doc.formato}</span>
                                </h3>
                                <p style={descDocStyle}>{doc.desc}</p>
                            </div>
                        </div>

                        {/* BOTÃO DE LER/BAIXAR */}
                        <button
                            style={botaoAcaoCianoStyle}
                            onClick={() => handleAbrirDoc(doc)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#00f3ff';
                                e.currentTarget.style.color = '#000';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#00f3ff';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Ícone de visualizar */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            ACESSAR
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Documentacao;