export async function createTableUsuario(db) {

    const tabelaExiste = await db.get(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='tb_usuario'
    `);

    // Cria a tabela com a estrutura base se não existir
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tb_usuario (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE,
            cpf TEXT,     
            senha TEXT NOT NULL,
            data_nascimento TEXT,
            status INTEGER DEFAULT 1,               -- 1: Ativo
            email_confirmado INTEGER DEFAULT 0,     -- 1: ativo
            codigo_validacao TEXT,
            us_completo INTEGER DEFAULT 0, 
            ultimo_login DATETIME,                  
            grupo_usuario TEXT DEFAULT 'A',         
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    if (!tabelaExiste) {
        console.log("- Tabela 'tb_usuario' criada com sucesso.");
    }
}