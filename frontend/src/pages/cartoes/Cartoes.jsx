import { useState } from 'react';
import { motion } from 'framer-motion';

function Cartoes() {
    const [busca, setBusca] = useState('');

    const [paginaAtual, setPaginaAtual] = useState(1);
    // Array fake ajustado para EXATAMENTE 4 itens, evitando scroll
    const cartoesFake = [1, 2, 3, 4, 5];

    return (
        <div style={paginaPrincipalStyle}>
            {/* 1. ÁREA DO TÍTULO */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={headerStyle}
            >
                <h1 style={tituloNeonStyle}>MEUS CARTÕES</h1>
                <div style={linhaDecorativaStyle}></div>
            </motion.header>

            {/* 2. LINHA DE AÇÕES */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={linhaAcoesStyle}
            >
                <button
                    style={botaoNovoCartaoStyle}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#00f3ff';
                        e.target.style.color = '#000';
                        e.target.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.6)';
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#00f3ff';
                        e.target.style.boxShadow = 'none';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    + NOVO CARTÃO
                </button>

                <div style={containerBuscaStyle}>
                    <input
                        type="text"
                        placeholder="Buscar cartão pelo nome ou banco..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        style={inputBuscaStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                </div>
            </motion.div>

            {/* 3. ÁREA DA LISTAGEM (4 Cartões) */}
            <div style={listaContainerStyle}>
                {cartoesFake.map((item, index) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                        style={itemCartaoStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--neon-green)';
                            e.currentTarget.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        <div style={infoCartaoStyle}>
                            <div style={iconeFakeStyle}>💳</div>
                            <div>
                                <h3 style={nomeCartaoStyle}>Cartão de Crédito {item}</h3>
                                <p style={detalheCartaoStyle}>Nubank • Final 1234</p>
                            </div>
                        </div>

                        <div style={acaoCartaoStyle}>
                            <button style={quadradoAcaoStyle}>⚙️</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 4. PAGINAÇÃO (Em breve) */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }} // Aparece depois que a lista carregar
                style={paginacaoContainerStyle}
            >
                {/* Botão Anterior */}
                <button
                    style={btnPaginacaoSetaStyle}
                    onClick={() => setPaginaAtual(paginaAtual > 1 ? paginaAtual - 1 : 1)}
                    disabled={paginaAtual === 1}
                >
                    &laquo; Anterior
                </button>

                {/* Números das Páginas (Exemplo visual de 2 páginas) */}
                <div style={paginasNumerosContainerStyle}>
                    <button
                        style={paginaAtual === 1 ? btnPaginaAtivaStyle : btnPaginaInativaStyle}
                        onClick={() => setPaginaAtual(1)}
                    >
                        1
                    </button>
                    <button
                        style={paginaAtual === 2 ? btnPaginaAtivaStyle : btnPaginaInativaStyle}
                        onClick={() => setPaginaAtual(2)}
                    >
                        2
                    </button>
                </div>

                {/* Botão Próxima */}
                <button
                    style={btnPaginacaoSetaStyle}
                    onClick={() => setPaginaAtual(paginaAtual < 2 ? paginaAtual + 1 : 2)}
                    disabled={paginaAtual === 2}
                >
                    Próxima &raquo;
                </button>
            </motion.div>


        </div>
    );
}

// --- ESTILOS ATUALIZADOS ---

const paginaPrincipalStyle = {
    padding: '15px 30px', // Respiro bem menor nas bordas
    width: '100%',
    height: '100%',       // Mudamos de 100vh para 100% para não vazar do LayoutPrivado
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden'    // Bloqueio absoluto de rolagem
};

const headerStyle = {
    marginBottom: '45px', // Muito mais colado ao topo
    alignSelf: 'flex-start'
};

const tituloNeonStyle = {
    color: 'var(--neon-green)',
    fontSize: '2.5rem', // Título um pouco maior
    margin: 0,
    fontWeight: 'bold',
    letterSpacing: '2px'
};

const linhaDecorativaStyle = {
    height: '3px',
    width: '80px',
    backgroundColor: 'var(--neon-green)',
    marginTop: '8px',
    boxShadow: '0 0 15px var(--neon-glow)'
};

const linhaAcoesStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px' // Margem reduzida pela metade
};

// ESTILO DO BOTÃO "NOVO CARTÃO"
const botaoNovoCartaoStyle = {
    backgroundColor: 'transparent',
    color: '#00f3ff', // Texto Azul Ciano
    border: '2px solid #00f3ff', // Borda Azul Ciano
    padding: '14px 30px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
};

// ESTILO DO CAMPO DE BUSCA
const containerBuscaStyle = {
    width: '450px' // Aumentei de 350px para 450px para ter mais presença
};

const inputBuscaStyle = {
    width: '100%',
    backgroundColor: 'var(--input-bg)', // Usando o fundo de input padrão do sistema
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '16px 20px',             // Mais alto e confortável
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
};

// --- ESTILOS DOS CARTÕES (Mais compactos) ---

const listaContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Espaço mínimo entre as linhas
    width: '100%',
    flex: 1 // Faz a lista ocupar o espaço disponível empurrando o resto para baixo
};

const itemCartaoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '12px 20px', // Altura super fina
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
};

const infoCartaoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px' // Espaço entre o ícone e os textos
};

const iconeFakeStyle = {
    fontSize: '2rem', // Tamanho do ícone
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '15px',
    borderRadius: '12px'
};

const nomeCartaoStyle = {
    color: 'white',
    margin: '0 0 5px 0',
    fontSize: '1.2rem'
};

const detalheCartaoStyle = {
    color: 'var(--text-gray)',
    margin: 0,
    fontSize: '0.9rem'
};

const acaoCartaoStyle = {
    display: 'flex',
    alignItems: 'center'
};

// O quadrado da direita do seu print
const quadradoAcaoStyle = {
    width: '45px',
    height: '45px',
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem'
};

const paginacaoContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Centraliza a paginação no meio da tela
    alignItems: 'center',
    gap: '20px',
    marginTop: 'auto', // O "auto" empurra a paginação para o limite inferior da tela
    paddingTop: '20px'
};

const paginasNumerosContainerStyle = {
    display: 'flex',
    gap: '10px'
};

// Estilo para o botão "Anterior" e "Próxima"
const btnPaginacaoSetaStyle = {
    backgroundColor: 'transparent',
    color: 'var(--text-gray)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    textTransform: 'uppercase'
};

// Estilo para o número da página atual (Destaque Azul Ciano)
const btnPaginaAtivaStyle = {
    backgroundColor: 'rgba(0, 243, 255, 0.1)', // Fundo com leve transparência
    color: '#00f3ff',
    border: '1px solid #00f3ff',
    width: '35px',
    height: '35px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    cursor: 'default',
    boxShadow: '0 0 10px rgba(0, 243, 255, 0.2)'
};

// Estilo para os números de páginas não selecionadas
const btnPaginaInativaStyle = {
    backgroundColor: 'transparent',
    color: 'var(--text-gray)',
    border: '1px solid var(--border-color)',
    width: '35px',
    height: '35px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
};

export default Cartoes;