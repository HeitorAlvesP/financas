export async function createTableCartao(db) {

    const tabelaExiste = await db.get(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='tb_cartao'
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tb_cartao (
            id_cartao INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            nome_responsavel TEXT NOT NULL,
            numero_cartao TEXT NOT NULL,
            tipo_cartao TEXT CHECK(tipo_cartao IN ('C', 'D', 'V')) NOT NULL,
            vencimento_fatura INTEGER, 
            limite TEXT,
            saldo TEXT, -- <--- NOVO: Saldo do VA/VR
            tipo_recarga TEXT CHECK(tipo_recarga IN ('FIXO', 'UTIL')), -- <--- NOVO: 'FIXO' ou 'UTIL'
            dia_recarga INTEGER, -- <--- NOVO: Dia do mês ou qual dia útil
            status INTEGER DEFAULT 1, 
            id_usuario INTEGER NOT NULL,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
        )
    `);

    if (!tabelaExiste) {
        console.log("- Tabela 'tb_cartao' criada com sucesso.");
    } else {
        const colunasInfo = await db.all(`PRAGMA table_info(tb_cartao)`);
        
        const nomesColunas = colunasInfo.map(col => col.name);
        
        // if (!nomesColunas.includes('')) {
        //     await db.exec(`ALTER TABLE tb_cartao ADD COLUMN `);
        //     console.log("- Coluna 'saldo' adicionada.");
        // }
    }
}