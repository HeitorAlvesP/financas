import Swal from 'sweetalert2';

export const handleEditarCartao = async (idCartao, nome, nomeResponsavel, tipoCartao, limite, vencimentoFatura, saldo, tipoRecarga, diaRecarga) => {
    
    if (
        !nome || 
        !nomeResponsavel || 
        (tipoCartao !== 'V' && !limite) || 
        (tipoCartao === 'V' && !saldo)     
    ) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, preencha os campos obrigatórios do cartão.',
            background: '#1e1e1e',
            color: '#ffffff',
            confirmButtonColor: '#4af6fff2',
            confirmButtonText: 'Entendi'
        });
        return false;
    }

    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    if (!token || !usuarioId) return false;

    const dadosCartao = {
        nome: nome,
        nome_responsavel: nomeResponsavel,
        tipo_cartao: tipoCartao,
        limite: limite,
        vencimento_fatura: vencimentoFatura,
        id_usuario: usuarioId,
        saldo: saldo,              
        tipo_recarga: tipoRecarga, 
        dia_recarga: diaRecarga    
    };

    try {
        const resposta = await fetch(`http://localhost:3000/api/cartoes/${idCartao}`, {
            method: 'PUT',
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
                title: 'Atualizado!',
                text: dadosResposta.mensagem,
                background: '#1e1e1e',
                color: '#ffffff',
                confirmButtonColor: '#39ff14' 
            });
            return true; 
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
        console.error("Erro na requisição de edição:", erro);
        return false;
    }
};