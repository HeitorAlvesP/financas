export const buscarCartoesAPI = async () => {
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    // Se não tiver token, nem tenta buscar e já devolve array vazio
    if (!token || !usuarioId) {
        window.location.href = '/'; // Altere para '/login' se a sua rota de login for essa
        return [];
    }

    try {
        const resposta = await fetch(`http://localhost:3000/api/cartoes/usuario/${usuarioId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (resposta.status === 401 || resposta.status === 403) {
            localStorage.clear();
            
            await Swal.fire({
                icon: 'info',
                title: 'Sessão Expirada',
                text: 'Sua sessão expirou por segurança. Faça login novamente.',
                background: '#1e1e1e',
                color: '#ffffff',
                confirmButtonColor: '#00f3ff'
            });

            window.location.href = '/'; 
            return [];
        }

        if (!resposta.ok) {
            throw new Error('Falha ao buscar os cartões');
        }

        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.error("Erro de conexão ao tentar buscar cartões:", erro);
        return [];
    }
};