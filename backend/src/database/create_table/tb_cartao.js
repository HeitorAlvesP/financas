export async function createTableCartao(db) {

    const tabelaExiste = await db.get(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='tb_cartao'
    `);

    // Cria a tabela com a estrutura base se não existir
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tb_cartao (
            id_cartao INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            nome_responsavel TEXT NOT NULL,
            numero_cartao TEXT NOT NULL,
            tipo_cartao TEXT CHECK(tipo_cartao IN ('C', 'D', 'V')) NOT NULL,
            limite TEXT,
            status INTEGER DEFAULT 1, -- 1: Ativo, 0: Inativo/Excluído
            id_usuario INTEGER NOT NULL,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
        )
    `);

    if (!tabelaExiste) {
        console.log("- Tabela 'tb_cartao' criada com sucesso.");
    }
}