/* #IMPORTACOES    */



/* #CREATE       */
export const cadastrarCartao = async (db, req, res) => {
    const { nome, nome_responsavel, numero_cartao, tipo_cartao, limite, id_usuario } = req.body;

    if (!nome || !nome_responsavel || !numero_cartao || !tipo_cartao || !id_usuario) {
        return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const tiposPermitidos = ['C', 'D', 'V'];
    if (!tiposPermitidos.includes(tipo_cartao)) {
        return res.status(400).json({ erro: "Tipo de cartão inválido. Use 'C', 'D' ou 'V'." });
    }

    let limiteTratado = null;
    if (limite) {
        limiteTratado = limite.replace('R$', '').replace(/\s/g, '').replace(/\./g, '');
    }

    try {
        const result = await db.run(
            `INSERT INTO tb_cartao (nome, nome_responsavel, numero_cartao, tipo_cartao, limite, id_usuario) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, nome_responsavel, numero_cartao, tipo_cartao, limiteTratado, id_usuario]
        );

        return res.status(201).json({
            mensagem: "Cartão cadastrado com sucesso!",
            id_cartao: result.lastID 
        });

    } catch (error) {
        console.error("Erro ao cadastrar cartão:", error);
        return res.status(500).json({ erro: "Erro interno ao cadastrar o cartão no banco." });
    }
};
/* ###         */


export const buscarCartoesPorUsuario = async (db, req, res) => {
    // Vamos receber o ID do utilizador através do URL (ex: /cartoes/usuario/5)
    const { idUsuario } = req.params;

    try {
        const cartoes = await db.all(
            `SELECT id_cartao, nome, nome_responsavel, numero_cartao, tipo_cartao, limite 
             FROM tb_cartao 
             WHERE id_usuario = ?`,
            [idUsuario]
        );

        return res.status(200).json(cartoes);

    } catch (error) {
        console.error("Erro ao buscar cartões:", error);
        return res.status(500).json({ erro: "Erro interno ao processar a listagem de cartões." });
    }
};