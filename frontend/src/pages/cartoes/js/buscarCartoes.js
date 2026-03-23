export const buscarCartoesAPI = async () => {
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    // Se não tiver token, nem tenta buscar e já devolve array vazio
    if (!token || !usuarioId) {
        console.warn("Aviso: Usuário não autenticado. Busca cancelada.");
        return []; 
    }

    try {
        const resposta = await fetch(`http://localhost:3000/api/cartoes/usuario/${usuarioId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            return dados;
        } else {
            console.error("Erro retornado pela API ao buscar cartões.");
            return []; 
        }
    } catch (erro) {
        console.error("Erro de conexão ao tentar buscar cartões:", erro);
        return [];
    }
};