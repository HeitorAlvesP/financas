import 'dotenv/config'; // DEVE ser a primeira linha
import express from 'express';
import { env } from 'process';
import { iniciarBanco } from './database/config.js'; // Lembre-se da extensão .js em ESM

const app = express();
// Fallback para a porta 3000 caso o .env não seja lido
const port = env.PORT; 

app.use(express.json());

async function startServer() {
    try {
        await iniciarBanco();
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}

startServer();