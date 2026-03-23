import Swal from 'sweetalert2';

export const handleInativarCartao = async (cartao) => {
    const confirmacao = await Swal.fire({
        title: 'Excluir Cartão?',
        text: `Tem certeza que deseja remover o cartão ${cartao.nome}?`,
        icon: 'warning',
        showCancelButton: true,
        background: '#1e1e1e',
        color: '#ffffff',
        confirmButtonColor: '#ff003c', // Vermelho Neon
        cancelButtonColor: '#555555',  // Cinza
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacao.isConfirmed) {
        
        const token = localStorage.getItem('token');
        const usuarioId = localStorage.getItem('usuarioId');

        if (!token || !usuarioId) {
            Swal.fire({
                icon: 'error',
                title: 'Sessão Expirada',
                text: 'Erro de autenticação. Por favor, faça login novamente.',
                background: '#1e1e1e',
                color: '#ffffff',
                confirmButtonColor: '#ff003c'
            });
            return false;
        }

        Swal.fire({
            title: 'Excluindo...',
            text: 'Removendo o cartão da sua lista.',
            background: '#1e1e1e',
            color: '#ffffff',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const resposta = await fetch(`http://localhost:3000/api/cartoes/${cartao.id_cartao}/inativar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id_usuario: usuarioId })
            });

            const dadosResposta = await resposta.json();

            if (resposta.ok) {
                // 5. Sucesso absoluto!
                Swal.fire({
                    icon: 'success',
                    title: 'Excluído!',
                    text: dadosResposta.mensagem,
                    background: '#1e1e1e',
                    color: '#ffffff',
                    confirmButtonColor: '#39ff14' // Verde Neon
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
            console.error("Erro na requisição de exclusão:", erro);
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
    }
    
    return false; 
};