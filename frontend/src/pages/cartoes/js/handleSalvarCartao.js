export const handleSalvarCartao = async (nome, nomeResponsavel, numeroCartao, tipoCartao, limite) => {
    // 1. Validação básica no Frontend
    if (!nome || !nomeResponsavel || !numeroCartao || !limite) {
        alert("Por favor, preencha todos os campos do cartão.");
        return;
    }

    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    if (!token || !usuarioId) {
        alert("Erro de autenticação. Por favor, faça login novamente.");
        return;
    }

    // 3. Monta os dados para enviar
    const dadosCartao = {
        nome: nome,
        nome_responsavel: nomeResponsavel,
        numero_cartao: numeroCartao,
        tipo_cartao: tipoCartao,
        limite: limite,
        id_usuario: usuarioId 
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/usuarios/cartoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosCartao)
        });

        const dadosResposta = await resposta.json();

        if (resposta.ok) {
            alert("Sucesso: " + dadosResposta.mensagem);
            return true; // Sucesso!
        } else {
            alert("Erro: " + dadosResposta.erro);
            return false;
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao conectar com o servidor.");
    }
};