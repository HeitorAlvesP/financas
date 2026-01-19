import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { createTableUsuario } from './create_table/tb_usuario.js';

export async function iniciarBanco() {
    // Abre a conexão com o arquivo SQLite
    const db = await open({
        filename: './src/database/database.sqlite',
        driver: sqlite3.Database
    });

    console.log("Conectando ao SQLite...");

    // Chamada das funções de criação de cada tabela
    await createTableUsuario(db);


    console.log("Banco de dados pronto para uso.");
    return db;
}