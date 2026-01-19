document.getElementById('formUsuario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemDiv = document.getElementById('mensagem');

    try {
        // Por enquanto, apenas logamos os dados. 
        // Logo faremos o fetch para http://localhost:PORT/usuarios
        console.log("Dados para envio:", { nome, email, senha });
        
        mensagemDiv.innerHTML = `<div class="alert alert-info">Enviando dados... Verifique o console.</div>`;
        
    } catch (error) {
        mensagemDiv.innerHTML = `<div class="alert alert-danger">Erro ao conectar com o servidor.</div>`;
    }
});