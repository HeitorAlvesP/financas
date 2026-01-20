// Função para cadastrar o usuário
export const cadastrarUsuario = async (db, req, res) => {
    const { nome, email, senha } = req.body;

    // Validação simples de campos obrigatórios
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    try {
        const resultado = await db.run(
            `INSERT INTO tb_usuario (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, senha]
        );
        
        return res.status(201).json({ 
            mensagem: "Usuário cadastrado com sucesso!", 
            id: resultado.lastID 
        });
    } catch (error) {
        // Tratamento para e-mail duplicado
        if (error.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
        }
        console.error("Erro no banco:", error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar usuário." });
    }
};