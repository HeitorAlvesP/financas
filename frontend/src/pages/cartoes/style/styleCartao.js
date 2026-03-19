
export const paginaPrincipalStyle = {
    padding: '15px 30px', // Respiro bem menor nas bordas
    width: '100%',
    height: '100%',       // Mudamos de 100vh para 100% para não vazar do LayoutPrivado
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden'    // Bloqueio absoluto de rolagem
};

export const headerStyle = {
    marginBottom: '45px', // Muito mais colado ao topo
    alignSelf: 'flex-start'
};

export const tituloNeonStyle = {
    color: 'var(--neon-green)',
    fontSize: '2.5rem', // Título um pouco maior
    margin: 0,
    fontWeight: 'bold',
    letterSpacing: '2px'
};

export const linhaDecorativaStyle = {
    height: '3px',
    width: '80px',
    backgroundColor: 'var(--neon-green)',
    marginTop: '8px',
    boxShadow: '0 0 15px var(--neon-glow)'
};

export const linhaAcoesStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px'
};

// ESTILO DO BOTÃO "NOVO CARTÃO"
export const botaoAcaoCianoStyle = {
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
export const containerBuscaStyle = {
    width: '450px' // Aumentei de 350px para 450px para ter mais presença
};

export const inputBuscaStyle = {
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

export const listaContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Espaço mínimo entre as linhas
    width: '100%',
    flex: 1 // Faz a lista ocupar o espaço disponível empurrando o resto para baixo
};

export const itemCartaoStyle = {
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

export const infoCartaoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px' // Espaço entre o ícone e os textos
};

export const iconeFakeStyle = {
    fontSize: '2rem', // Tamanho do ícone
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '15px',
    borderRadius: '12px'
};

export const nomeCartaoStyle = {
    color: 'white',
    margin: '0 0 5px 0',
    fontSize: '1.2rem'
};

export const detalheCartaoStyle = {
    color: 'var(--text-gray)',
    margin: 0,
    fontSize: '0.9rem'
};

export const acaoCartaoStyle = {
    display: 'flex',
    alignItems: 'center'
};

// O quadrado da direita do seu print
export const quadradoAcaoStyle = {
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

export const paginacaoContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Centraliza a paginação no meio da tela
    alignItems: 'center',
    gap: '20px',
    marginTop: 'auto', // O "auto" empurra a paginação para o limite inferior da tela
    paddingTop: '20px'
};

export const paginasNumerosContainerStyle = {
    display: 'flex',
    gap: '10px'
};

// Estilo para o botão "Anterior" e "Próxima"
export const btnPaginacaoSetaStyle = {
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
export const btnPaginaAtivaStyle = {
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
export const btnPaginaInativaStyle = {
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

export const formularioContainerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    flex: 1, // Preenche o espaço que a lista ocupava
    display: 'flex',
    flexDirection: 'column'
};

export const tituloFormularioStyle = {
    color: 'white',
    fontSize: '1.3rem',
    marginBottom: '25px',
    marginTop: 0,
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '15px'
};

export const gridFormularioStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Divide o form em 2 colunas
    gap: '20px',
    width: '100%'
};

export const grupoInputStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
};

export const labelStyle = {
    color: 'var(--text-gray)',
    fontSize: '0.9rem',
    fontWeight: '500'
};

export const inputFormStyle = {
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
export const containerBotaoSalvarStyle = {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'flex-end', // Alinha o botão à direita
    marginTop: '20px'
};

export const botaoSalvarStyle = {
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