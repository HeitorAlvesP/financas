import { useState } from 'react';
import { motion } from 'framer-motion';

function Cartoes() {
    const [busca, setBusca] = useState('');

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [telaAtual, setTelaAtual] = useState('lista');

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
                    style={botaoAcaoCianoStyle}
                    onClick={() => setTelaAtual(telaAtual === 'lista' ? 'cadastro' : 'lista')}
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
                    {telaAtual === 'lista' ? '+ NOVO CARTÃO' : '← LISTAGEM'}
                </button>

                {telaAtual === 'lista' && (
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
                )}
            </motion.div>

            {/* 3. CONTEÚDO PRINCIPAL (Troca entre Lista e Cadastro) */}
            {telaAtual === 'lista' ? (
                // --- TELA DE LISTAGEM ---
                <>
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

                    {/* Paginação */}
                    <motion.div style={paginacaoContainerStyle}>
                        <button style={btnPaginacaoSetaStyle}>&laquo; Anterior</button>
                        <div style={paginasNumerosContainerStyle}>
                            <button style={btnPaginaAtivaStyle}>1</button>
                            <button style={btnPaginaInativaStyle}>2</button>
                        </div>
                        <button style={btnPaginacaoSetaStyle}>Próxima &raquo;</button>
                    </motion.div>
                </>
            ) : (
                // --- TELA DE CADASTRO (Novo layout) ---
                <motion.div
                    initial={{ opacity: 0, x: -20 }} // Vem deslizando da esquerda
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={formularioContainerStyle}
                >
                    <h2 style={tituloFormularioStyle}>Cadastrar Novo Cartão</h2>

                    <form style={gridFormularioStyle}>
                        {/* Linha 1 */}
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Nome do Cartão (Ex: Nubank)</label>
                            <input type="text" style={inputFormStyle} placeholder="Digite o nome..." />
                        </div>
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Nome do Titular</label>
                            <input type="text" style={inputFormStyle} placeholder="Como está no cartão..." />
                        </div>

                        {/* Linha 2 */}
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Final do Cartão (4 dígitos)</label>
                            <input type="text" style={inputFormStyle} maxLength="4" placeholder="Ex: 1234" />
                        </div>
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Tipo de Cartão</label>
                            <select style={inputFormStyle}>
                                <option value="C">Crédito</option>
                                <option value="D">Débito</option>
                                <option value="V">Vale Alimentação/Refeição</option>
                            </select>
                        </div>

                        {/* Linha 3 */}
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Limite (R$)</label>
                            <input type="text" style={inputFormStyle} placeholder="Ex: 5000,00" />
                        </div>

                        {/* Botão de Salvar */}
                        <div style={containerBotaoSalvarStyle}>
                            <button
                                type="button"
                                style={botaoSalvarStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 0 25px var(--neon-green)'; 
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 0 10px var(--neon-glow)';
                                }}
                            >
                                SALVAR CARTÃO
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
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
    marginBottom: '20px' 
};

// ESTILO DO BOTÃO "NOVO CARTÃO"
const botaoAcaoCianoStyle = {
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

const formularioContainerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    flex: 1, // Preenche o espaço que a lista ocupava
    display: 'flex',
    flexDirection: 'column'
};

const tituloFormularioStyle = {
    color: 'white',
    fontSize: '1.3rem',
    marginBottom: '25px',
    marginTop: 0,
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '15px'
};

const gridFormularioStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Divide o form em 2 colunas
    gap: '20px',
    width: '100%'
};

const grupoInputStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
};

const labelStyle = {
    color: 'var(--text-gray)',
    fontSize: '0.9rem',
    fontWeight: '500'
};

const inputFormStyle = {
    width: '100%',
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '12px 15px',
    color: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box'
};

// Botão de salvar pega a largura total (2 colunas)
const containerBotaoSalvarStyle = {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'flex-end', // Alinha o botão à direita
    marginTop: '20px'
};

const botaoSalvarStyle = {
    backgroundColor: 'var(--neon-green)',
    color: 'black',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 15px var(--neon-glow)'
};

export default Cartoes;