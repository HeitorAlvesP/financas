import 'dotenv/config'; // DEVE ser a primeira linha
import cors from 'cors';
import express from 'express';
import { env } from 'process';
import { iniciarBanco } from './database/config.js';

const app = express();
const port = env.PORT || 3000; 

app.use(cors());
app.use(express.json());

/* ROTA TESTE */
app.get('/api/status', (req, res) => {
    res.json({
        mensagem: "Backend está online e aceitando conexões!",
        timestamp: new Date().toISOString()        
    })
})


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