import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
    paginaPrincipalStyle,
    badgeStyle,
    botaoAcaoCianoStyle,
    descDocStyle,
    headerStyle,
    iconeFakeStyle,
    infoDocStyle,
    itemDocStyle,
    linhaDecorativaStyle,
    listaContainerStyle,
    tituloDocStyle,
    tituloNeonStyle,
    modalContentStyle,
    modalOverlayStyle
} from './style/style.js'

// --- COMPONENTE PRINCIPAL ---
function Documentacao() {
    const [documentos] = useState([
        {
            id: 1,
            titulo: 'Visão Geral do Sistema',
            desc: 'Documentação do escopo do HALPI, funcionamento dos módulos atuais e o roadmap (próximos passos).',
            formato: 'MD',
            icone: '🗺️',
            arquivo: '/docs/01-visao-geral.md'
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

    const [modalAberto, setModalAberto] = useState(false);
    const [docSelecionado, setDocSelecionado] = useState(null);
    const [conteudoMd, setConteudoMd] = useState('');

    const handleAbrirDoc = async (doc) => {
        if (doc.formato === 'MD' && doc.arquivo) {
            try {
                const resposta = await fetch(doc.arquivo);
                const texto = await resposta.text();

                setConteudoMd(texto);
                setDocSelecionado(doc);
                setModalAberto(true);
            } catch (erro) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de Leitura',
                    text: 'Não foi possível carregar o ficheiro de documentação.',
                    background: '#1e1e1e',
                    color: '#ffffff'
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Em Construção',
                text: 'Esta documentação ainda não foi redigida ou o formato não é suportado.',
                background: '#1e1e1e',
                color: '#ffffff',
                confirmButtonColor: '#00f3ff'
            });
        }
    };
    return (
        <div style={paginaPrincipalStyle}>

            <style>
                {`
                    .modal-custom-scroll::-webkit-scrollbar {
                        width: 8px;
                    }
                    .modal-custom-scroll::-webkit-scrollbar-track {
                        background: var(--bg-card);
                        border-radius: 10px;
                    }
                    .modal-custom-scroll::-webkit-scrollbar-thumb {
                        background: rgba(0, 243, 255, 0.4); 
                        border-radius: 10px;
                    }
                    .modal-custom-scroll::-webkit-scrollbar-thumb:hover {
                        background: rgba(0, 243, 255, 0.8); 
                    }
                `}
            </style>

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

            <AnimatePresence>
                {modalAberto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={modalOverlayStyle}
                        onClick={() => setModalAberto(false)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            style={modalContentStyle}
                            className="modal-custom-scroll"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Cabeçalho do Modal */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '20px' }}>
                                <h2 style={{ margin: 0, color: 'var(--neon-green)' }}>{docSelecionado?.titulo}</h2>
                                <button
                                    onClick={() => setModalAberto(false)}
                                    style={{ background: 'none', border: 'none', color: 'red', fontSize: '1.5rem', cursor: 'pointer' }}
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Conteúdo Renderizado (Onde a mágica acontece) */}
                            <div className="markdown-body" style={{ color: '#ddd', lineHeight: '1.6' }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {conteudoMd}
                                </ReactMarkdown>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default Documentacao;