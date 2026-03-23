import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { handleSalvarCartao } from './js/handleSalvarCartao';
import { formatarMoeda } from './js/mascara_moeda';
import { buscarCartoesAPI } from './js/buscarCartoes';
import { aplicarFiltroBusca } from './js/filtrarCartoes';
import { handleInativarCartao } from './js/handleInativarCartao';


import {
    acaoCartaoStyle,
    botaoAcaoCianoStyle,
    botaoSalvarStyle,
    btnPaginaAtivaStyle,
    btnPaginaInativaStyle,
    btnPaginacaoSetaStyle,
    containerBotaoSalvarStyle,
    containerBuscaStyle,
    detalheCartaoStyle,
    formularioContainerStyle,
    gridFormularioStyle,
    grupoInputStyle,
    headerStyle,
    iconeFakeStyle,
    infoCartaoStyle,
    inputBuscaStyle,
    inputFormStyle,
    itemCartaoStyle,
    labelStyle,
    linhaAcoesStyle,
    linhaDecorativaStyle,
    listaContainerStyle,
    nomeCartaoStyle,
    paginaPrincipalStyle,
    paginacaoContainerStyle,
    paginasNumerosContainerStyle,
    quadradoAcaoStyle,
    tituloFormularioStyle,
    tituloNeonStyle,
} from './style/styleCartao';


function Cartoes() {
    // --- ESTADOS DA TELA E PAGINAÇÃO ---
    const [busca, setBusca] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [telaAtual, setTelaAtual] = useState('lista');

    // --- ESTADOS DO FORMULÁRIO DE CADASTRO ---
    const [nome, setNome] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [tipoCartao, setTipoCartao] = useState('C');
    const [limite, setLimite] = useState('');
    const [vencimentoFatura, setVencimentoFatura] = useState('');

    // --- NOVO: ESTADO PARA OS CARTÕES DO BANCO DE DADOS ---
    const [meusCartoes, setMeusCartoes] = useState([]);

    const carregarCartoes = async () => {
        const dados = await buscarCartoesAPI();
        setMeusCartoes(dados);
    };

    useEffect(() => {
        carregarCartoes();
    }, []);


    const cartoesFiltrados = aplicarFiltroBusca(meusCartoes, busca);

    useEffect(() => {
        setPaginaAtual(1);
    }, [busca]);

    const itensPorPagina = 5;
    const indexUltimoCartao = paginaAtual * itensPorPagina;
    const indexPrimeiroCartao = indexUltimoCartao - itensPorPagina;

    const cartoesAtuais = cartoesFiltrados.slice(indexPrimeiroCartao, indexUltimoCartao);
    const totalPaginas = Math.ceil(cartoesFiltrados.length / itensPorPagina);
    const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    // -- ESTADO DA FUNÇÃO QUE MANDA PRO BANCO
    const executarSalvamento = async () => {
        const sucesso = await handleSalvarCartao(nome, nomeResponsavel, numeroCartao, tipoCartao, limite, vencimentoFatura);

        if (sucesso) {
            setNome('');
            setNomeResponsavel('');
            setNumeroCartao('');
            setTipoCartao('C');
            setLimite('');
            setVencimentoFatura('');

            carregarCartoes();
            setTelaAtual('lista');
        }
    };

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
                        {/* --- NOVO: Mensagem caso a lista venha vazia --- */}
                        {cartoesAtuais.length === 0 ? (
                            <p style={{ color: 'var(--text-gray)', textAlign: 'center', marginTop: '20px' }}>
                                Nenhum cartão cadastrado ainda.
                            </p>
                        ) : (
                            /* --- NOVO: Usando o 'cartao' de dentro do array 'cartoesAtuais' --- */
                            cartoesAtuais.map((cartao, index) => (
                                <motion.div
                                    key={cartao.id_cartao} // O ID do banco como chave única
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.40, delay: 0.1 + (index * 0.1) }}
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
                                            {/* --- NOVO: Injetando os dados reais --- */}
                                            <h3 style={nomeCartaoStyle}>{cartao.nome}</h3>
                                            <p style={detalheCartaoStyle}>
                                                {cartao.nome_responsavel} • Início {cartao.numero_cartao}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ ...acaoCartaoStyle, gap: '10px' }}> {/* Adicionado um gap para desgrudar os botões */}

                                        {/* --- BOTÃO DE EDITAR (LÁPIS CIANO) --- */}
                                        <button
                                            style={quadradoAcaoStyle}
                                            onMouseEnter={(e) => {
                                                const btn = e.currentTarget;
                                                const svg = btn.querySelector('svg');
                                                btn.style.backgroundColor = '#00f3ff';
                                                btn.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.6)';
                                                btn.style.transform = 'scale(1.1)';
                                                if (svg) {
                                                    svg.style.stroke = '#000000';
                                                    svg.style.filter = 'none';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                const btn = e.currentTarget;
                                                const svg = btn.querySelector('svg');
                                                btn.style.backgroundColor = 'transparent';
                                                btn.style.boxShadow = 'none';
                                                btn.style.transform = 'scale(1)';
                                                if (svg) {
                                                    svg.style.stroke = '#00f3ff';
                                                    svg.style.filter = 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.5))';
                                                }
                                            }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f3ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s ease', filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.5))' }}>
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>

                                        {/* --- BOTÃO DE EXCLUIR (LIXEIRA VERMELHA) --- */}
                                        <button
                                            style={quadradoAcaoStyle}
                                            onClick={async () => {
                                                const inativou = await handleInativarCartao(cartao);
                                                if (inativou) {
                                                    carregarCartoes();
                                                }
                                            }} // CHAMA O ALERTA AQUI
                                            onMouseEnter={(e) => {
                                                const btn = e.currentTarget;
                                                const svg = btn.querySelector('svg');
                                                btn.style.backgroundColor = '#ff003c'; // Fundo Vermelho
                                                btn.style.boxShadow = '0 0 20px rgba(255, 0, 60, 0.6)'; // Sombra Vermelha
                                                btn.style.transform = 'scale(1.1)';
                                                if (svg) {
                                                    svg.style.stroke = '#ffffff'; // Ícone Branco para dar contraste
                                                    svg.style.filter = 'none';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                const btn = e.currentTarget;
                                                const svg = btn.querySelector('svg');
                                                btn.style.backgroundColor = 'transparent';
                                                btn.style.boxShadow = 'none';
                                                btn.style.transform = 'scale(1)';
                                                if (svg) {
                                                    svg.style.stroke = '#ff003c'; // Volta para o vermelho
                                                    svg.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 60, 0.5))';
                                                }
                                            }}
                                        >
                                            {/* Ícone de Lixeira em SVG */}
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff003c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.2s ease', filter: 'drop-shadow(0 0 5px rgba(255, 0, 60, 0.5))' }}>
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                        </button>

                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Paginação */}
                    {totalPaginas > 1 && (
                        <motion.div style={paginacaoContainerStyle}>
                            <button
                                style={btnPaginacaoSetaStyle}
                                onClick={() => setPaginaAtual(paginaAtual - 1)}
                                disabled={paginaAtual === 1}
                            >
                                &laquo; Anterior
                            </button>

                            <div style={paginasNumerosContainerStyle}>
                                {numerosPaginas.map(numero => (
                                    <button
                                        key={numero}
                                        style={paginaAtual === numero ? btnPaginaAtivaStyle : btnPaginaInativaStyle}
                                        onClick={() => setPaginaAtual(numero)}
                                    >
                                        {numero}
                                    </button>
                                ))}
                            </div>

                            <button
                                style={btnPaginacaoSetaStyle}
                                onClick={() => setPaginaAtual(paginaAtual + 1)}
                                disabled={paginaAtual === totalPaginas}
                            >
                                Próxima &raquo;
                            </button>
                        </motion.div>
                    )}
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
                            <input
                                type="text"
                                style={inputFormStyle}
                                placeholder="Digite o nome..."
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Nome do Titular</label>
                            <input
                                type="text"
                                style={inputFormStyle}
                                placeholder="Como está no cartão..."
                                value={nomeResponsavel}
                                onChange={(e) => setNomeResponsavel(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        {/* Linha 2 */}
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Primeiros 4 dígitos</label>
                            <input
                                type="text"
                                style={inputFormStyle}
                                maxLength="4"
                                placeholder="Ex: 0000"
                                value={numeroCartao}
                                onChange={(e) => setNumeroCartao(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Tipo de Cartão</label>
                            <select
                                style={inputFormStyle}
                                value={tipoCartao}
                                onChange={(e) => setTipoCartao(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            >
                                <option value="C">Crédito</option>
                                <option value="D">Débito</option>
                                <option value="V">Vale Alimentação/Refeição</option>
                            </select>
                        </div>

                        {/* Linha 3 */}
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Limite (R$)</label>
                            <input
                                type="text"
                                style={inputFormStyle}
                                placeholder="Ex: R$ 0.000,00"
                                value={limite}
                                onChange={(e) => setLimite(formatarMoeda(e.target.value))}
                                onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        {tipoCartao === 'C' && (
                            <div style={grupoInputStyle}>
                                <label style={labelStyle}>Dia de Vencimento</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    style={inputFormStyle}
                                    placeholder="Ex: 10"
                                    value={vencimentoFatura}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        if (valor === '') {
                                            setVencimentoFatura('');
                                            return;
                                        }
                                        const numero = Number(valor);

                                        if (numero > 28) {
                                            setVencimentoFatura('28');
                                        } else if (numero < 1) {
                                            setVencimentoFatura('1');
                                        } else {
                                            setVencimentoFatura(valor);
                                        }
                                    }} 
                                    onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>
                        )}

                        {/* Botão de Salvar */}
                        <div style={containerBotaoSalvarStyle}>
                            <button
                                type="button"
                                style={botaoSalvarStyle}
                                onClick={executarSalvamento} // CHAMA A FUNÇÃO AQUI!
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

export default Cartoes;