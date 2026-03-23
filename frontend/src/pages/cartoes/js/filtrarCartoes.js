export const aplicarFiltroBusca = (listaCartoes, termoBusca) => {
    if (!termoBusca) {
        return listaCartoes;
    }

    const termoLimpo = termoBusca.toLowerCase();

    return listaCartoes.filter((cartao) => {
        return (
            cartao.nome.toLowerCase().includes(termoLimpo) ||
            cartao.nome_responsavel.toLowerCase().includes(termoLimpo) ||
            cartao.numero_cartao.includes(termoLimpo)
        );
    });
};