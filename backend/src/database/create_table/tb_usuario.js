export async function createTableUsuario(db) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tb_usuario (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            status_confirmacao INTEGER DEFAULT 0, -- 0: pendente, 1: confirmado
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("- Tabela 'tb_usuario' verificada/criada.");
}