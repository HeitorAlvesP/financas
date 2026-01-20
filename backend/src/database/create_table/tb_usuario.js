export async function createTableUsuario(db) {

    const tabelaExiste = await db.get(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='tb_usuario'
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tb_usuario (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            status INTEGER DEFAULT 1,               -- 1: Ativo (conforme solicitado)
            email_confirmado INTEGER DEFAULT 0,     -- 1: ativo
            codigo_validacao TEXT,
            ultimo_login DATETIME,                  -- Ficará nulo até o primeiro login
            grupo_usuario TEXT DEFAULT 'A',         -- Padrão 'A'
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    if (!tabelaExiste) {
        console.log("- Tabela 'tb_usuario' criada com sucesso.");
    }
}