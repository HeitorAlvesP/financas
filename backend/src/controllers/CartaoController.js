/* #IMPORTACOES    */



/* #CREATE       */
export const cadastrarCartao = async (db, req, res) => {
    // Pegamos os dados que o frontend (React) vai enviar no corpo da requisição
    const { nome, nome_responsavel, numero_cartao, tipo_cartao, limite, id_usuario } = req.body;

    // 1. Validação: Verifica se os campos obrigatórios vieram
    if (!nome || !nome_responsavel || !numero_cartao || !tipo_cartao || !id_usuario) {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    // 2. Validação: Trava de segurança para o tipo do cartão
    const tiposPermitidos = ['C', 'D', 'V'];
    if (!tiposPermitidos.includes(tipo_cartao)) {
        return res.status(400).json({ erro: "Tipo de cartão inválido. Use 'C', 'D' ou 'V'." });
    }

    try {
        // 3. Inserção no banco SQLite
        const result = await db.run(
            `INSERT INTO tb_cartao (nome, nome_responsavel, numero_cartao, tipo_cartao, limite, id_usuario) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, nome_responsavel, numero_cartao, tipo_cartao, limite, id_usuario]
        );

        // 4. Retorno de Sucesso
        return res.status(201).json({
            mensagem: "Cartão cadastrado com sucesso!",
            id_cartao: result.lastID // Retorna o ID gerado pelo banco para o novo cartão
        });

    } catch (error) {
        console.error("Erro ao cadastrar cartão:", error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar o cartão no banco." });
    }
};
/* ###         */