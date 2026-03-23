import Swal from 'sweetalert2';

export const handleSalvarCartao = async (nome, nomeResponsavel, numeroCartao, tipoCartao, limite) => {
    // 1. Validação básica no Frontend
    if (!nome || !nomeResponsavel || !numeroCartao || !limite) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, preencha todos os campos do cartão.',
            background: '#1e1e1e',
            color: '#ffffff',
            confirmButtonColor: '#4af6fff2', // Ciano
            confirmButtonText: 'Entendi'
        });
        return false;
    }

    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    if (!token || !usuarioId) {
        Swal.fire({
            icon: 'error',
            title: 'Sessão Expirada',
            text: 'Erro de autenticação. Por favor, faça login novamente.',
            background: '#1e1e1e',
            color: '#ffffff',
            confirmButtonColor: '#ff003c' // Vermelho
        });
        return false;
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
        const resposta = await fetch('http://localhost:3000/api/cartoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosCartao)
        });

        const dadosResposta = await resposta.json();

        if (resposta.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: dadosResposta.mensagem,
                background: '#1e1e1e',
                color: '#ffffff',
                confirmButtonColor: '#39ff14', // Verde
                confirmButtonText: 'Ótimo'
            });
            return true; // Sucesso!
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: dadosResposta.erro,
                background: '#1e1e1e',
                color: '#ffffff',
                confirmButtonColor: '#ff003c'
            });
            return false;
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        Swal.fire({
            icon: 'error',
            title: 'Sem Conexão',
            text: 'Erro ao tentar se comunicar com o servidor.',
            background: '#1e1e1e',
            color: '#ffffff',
            confirmButtonColor: '#ff003c'
        });
        return false;
    }
};