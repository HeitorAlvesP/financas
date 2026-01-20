export const cadastrarUsuario = async (db, req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    // 1. Validação de campos vazios
    if (!nome || !email || !senha || !confirmarSenha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    // 2. Verificar se as senhas são iguais
    if (senha !== confirmarSenha) {
        return res.status(400).json({ erro: "As senhas não coincidem." });
    }

    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regexSenha.test(senha)) {
        return res.status(400).json({ 
            erro: "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais." 
        });
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
        if (error.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
        }
        console.error("Erro no banco:", error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar usuário." });
    }
};