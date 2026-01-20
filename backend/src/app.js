import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { env } from 'process';
import { iniciarBanco } from './database/config.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
const port = env.PORT || 3000; 

app.use(cors()); 
app.use(express.json());

async function startServer() {
    try {
        // Iniciamos o banco e guardamos a conexão
        const db = await iniciarBanco();

        // Configuramos as rotas de usuário passando o banco para elas
        app.use('/api/usuarios', usuarioRoutes(db));

        // Rota simples de teste de status
        app.get('/api/status', (req, res) => {
            res.json({ status: "Backend online e banco conectado!" });
        });

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}

startServer();