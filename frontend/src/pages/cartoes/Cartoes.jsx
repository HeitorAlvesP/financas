import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { handleSalvarCartao } from './js/handleSalvarCartao';
import { formatarMoeda } from './js/mascara_moeda';
import { buscarCartoesAPI } from './js/buscarCartoes';
import { aplicarFiltroBusca } from './js/filtrarCartoes';
import { handleInativarCartao } from './js/handleInativarCartao';
import { handleEditarCartao } from './js/handleEditarCartao';


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
    const [idCartaoEditando, setIdCartaoEditando] = useState(null);
    const [saldo, setSaldo] = useState('');
    const [tipoRecarga, setTipoRecarga] = useState('FIXO'); // Padrão é Dia Fixo
    const [diaRecarga, setDiaRecarga] = useState('');

    // --- ESTADO PARA OS CARTÕES DO BANCO DE DADOS ---
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



    const executarSalvamento = async () => {
        let sucesso = false;

        if (idCartaoEditando) {
            sucesso = await handleEditarCartao(idCartaoEditando, nome, nomeResponsavel, tipoCartao, limite, vencimentoFatura, saldo, tipoRecarga, diaRecarga);
        } else {
            sucesso = await handleSalvarCartao(nome, nomeResponsavel, numeroCartao, tipoCartao, limite, vencimentoFatura, saldo, tipoRecarga, diaRecarga);
        }

        if (sucesso) {
            setNome('');
            setNomeResponsavel('');
            setNumeroCartao('');
            setTipoCartao('C');
            setLimite('');
            setVencimentoFatura('');
            setSaldo('');            
            setTipoRecarga('FIXO');  
            setDiaRecarga('');       
            setIdCartaoEditando(null);
            
            carregarCartoes(); 
            setTelaAtual('lista');
        }
    };

    const prepararEdicao = (cartao) => {
        setNome(cartao.nome);
        setNomeResponsavel(cartao.nome_responsavel);
        setNumeroCartao(cartao.numero_cartao);
        setTipoCartao(cartao.tipo_cartao);
        setLimite(cartao.limite ? formatarMoeda(cartao.limite.toString()) : ''); 
        setVencimentoFatura(cartao.vencimento_fatura || ''); 
        setSaldo(cartao.saldo ? formatarMoeda(cartao.saldo.toString()) : '');
        setTipoRecarga(cartao.tipo_recarga || 'FIXO');
        setDiaRecarga(cartao.dia_recarga || '');
        
        setIdCartaoEditando(cartao.id_cartao); 
        setTelaAtual('cadastro'); 
    };

    function returnTipoCartao (tipo_cartao) {
        if(tipo_cartao == 'C'){
            return 'CRÉDITO'
        }else if(tipo_cartao == 'D'){
            return 'DÉBITO'
        }else if(tipo_cartao == 'V'){
            return 'VR/VA'
        }else{
            'Error'
        }
    }

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
                    onClick={() => {
                        if (telaAtual === 'lista') {
                            setNome('');
                            setNomeResponsavel('');
                            setNumeroCartao('');
                            setTipoCartao('C');
                            setLimite('');
                            setVencimentoFatura('');
                            setIdCartaoEditando(null); 
                            setTelaAtual('cadastro');
                        } else {
                            setTelaAtual('lista');
                        }
                    }}
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
                                    key={cartao.id_cartao} 
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
                                                {returnTipoCartao(cartao.tipo_cartao)} • Início {cartao.numero_cartao}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ ...acaoCartaoStyle, gap: '10px' }}> {/* Adicionado um gap para desgrudar os botões */}

                                        {/* --- BOTÃO DE EDITAR (LÁPIS CIANO) --- */}
                                        <button
                                            style={quadradoAcaoStyle}
                                            onClick={() => prepararEdicao(cartao)}
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
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={formularioContainerStyle}
                >
                    <h2 style={tituloFormularioStyle}>
                        {idCartaoEditando ? 'Editar Cartão' : 'Cadastrar Novo Cartão'}
                    </h2>

                    <form style={gridFormularioStyle}>
                        {/* Linha 1 */}
                        <div style={grupoInputStyle}>
                            <label style={labelStyle}>Nome do Cartão (Ex: Nubank)</label>
                            <input
                                type="text"
                                style={{
                                    ...inputFormStyle, 
                                    opacity: idCartaoEditando ? 0.5 : 1,
                                    cursor: idCartaoEditando ? 'not-allowed' : 'text'
                                }}
                                disabled={!!idCartaoEditando} 
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
                                style={{
                                    ...inputFormStyle, 
                                    opacity: idCartaoEditando ? 0.5 : 1,
                                    cursor: idCartaoEditando ? 'not-allowed' : 'text'
                                }}
                                disabled={!!idCartaoEditando} 
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
                                // style={inputFormStyle}
                                style={{
                                    ...inputFormStyle, 
                                    opacity: idCartaoEditando ? 0.5 : 1,
                                    cursor: idCartaoEditando ? 'not-allowed' : 'text'
                                }}
                                disabled={!!idCartaoEditando} 
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
                        {(tipoCartao === 'C' || tipoCartao === 'D') && (
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
                        )}

                        {/* SE FOR SÓ CRÉDITO ('C'), MOSTRA VENCIMENTO */}
                        {tipoCartao === 'C' && (
                            <div style={grupoInputStyle}>
                                <label style={labelStyle}>Dia de Vencimento</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="28"
                                    style={inputFormStyle}
                                    placeholder="Ex: 10"
                                    value={vencimentoFatura}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '') { setVencimentoFatura(''); return; }
                                        const num = Number(val);
                                        if (num > 28) setVencimentoFatura('28');
                                        else if (num < 1) setVencimentoFatura('1');
                                        else setVencimentoFatura(val);
                                    }} 
                                    onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>
                        )}

                        {/* SE FOR VALE ALIMENTAÇÃO/REFEIÇÃO ('V'), MOSTRA CAMPOS ESPECÍFICOS */}
                        {tipoCartao === 'V' && (
                            <>
                                <div style={grupoInputStyle}>
                                    <label style={labelStyle}>Saldo Atual (R$)</label>
                                    <input
                                        type="text"
                                        style={inputFormStyle}
                                        placeholder="Ex: R$ 500,00"
                                        value={saldo}
                                        onChange={(e) => setSaldo(formatarMoeda(e.target.value))} // Usa a mesma máscara!
                                        onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                    />
                                </div>

                                <div style={grupoInputStyle}>
                                    <label style={labelStyle}>Tipo de Recarga</label>
                                    <select
                                        style={inputFormStyle}
                                        value={tipoRecarga}
                                        onChange={(e) => {
                                            setTipoRecarga(e.target.value);
                                            setDiaRecarga(''); 
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                    >
                                        <option value="FIXO">Dia Fixo do Mês</option>
                                        <option value="UTIL">Dia Útil do Mês</option>
                                    </select>
                                </div>

                                <div style={grupoInputStyle}>
                                    <label style={labelStyle}>
                                        {tipoRecarga === 'FIXO' ? 'Dia da Recarga' : 'Qual Dia Útil?'}
                                    </label>
                                    
                                    {/* NOVO: Container Flex para colocar o Input e o Checkbox lado a lado */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        
                                        <input
                                            type="number"
                                            min="1"
                                            max={tipoRecarga === 'FIXO' ? "28" : "5"}
                                            style={{
                                                ...inputFormStyle,
                                                flex: 1,
                                                opacity: diaRecarga === '99' ? 0.5 : 1, 
                                                cursor: diaRecarga === '99' ? 'not-allowed' : 'text'
                                            }}
                                            placeholder={tipoRecarga === 'FIXO' ? "Ex: 20" : "Ex: 2 (2º dia útil)"}
                                            value={diaRecarga === '99' ? '' : diaRecarga}
                                            disabled={diaRecarga === '99'} 
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                
                                                if (val === '') { 
                                                    setDiaRecarga(''); 
                                                    return; 
                                                }
                                                
                                                const num = Number(val);
                                                const limiteMaximo = tipoRecarga === 'FIXO' ? 28 : 5;

                                                if (num > limiteMaximo) {
                                                    setDiaRecarga(limiteMaximo.toString());
                                                } else if (num < 1) {
                                                    setDiaRecarga('1');
                                                } else {
                                                    setDiaRecarga(val);
                                                }
                                            }} 
                                            onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                                            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                        />

                                        {/* NOVO: Checkbox de Último Dia (Só aparece se o tipo for UTIL) */}
                                        {tipoRecarga === 'UTIL' && (
                                            <label style={{ 
                                                ...labelStyle, 
                                                marginBottom: 0, // Remove a margem padrão do label
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '8px', 
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap' // Impede o texto de quebrar linha
                                            }}>
                                                <input 
                                                    type="checkbox"
                                                    checked={diaRecarga === '99'}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setDiaRecarga('99'); // Aciona o número mágico!
                                                        } else {
                                                            setDiaRecarga(''); // Desmarca e limpa o valor
                                                        }
                                                    }}
                                                    style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: 'var(--neon-green)' }}
                                                />
                                                Último do Mês
                                            </label>
                                        )}

                                    </div>
                                </div>
                            </>
                        )}

                        {/* Botão de Salvar */}
                        <div style={containerBotaoSalvarStyle}>
                            <button
                                type="button"
                                style={botaoSalvarStyle}
                                onClick={executarSalvamento} 
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