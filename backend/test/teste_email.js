import 'dotenv/config'; 
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { enviarCodigoVerificacao } from '../src/services/emailService.js';

// 1. Descobrimos onde o arquivo de teste está fisicamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Apontamos para o .env que está UM NÍVEL ACIMA (na raiz do backend)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function rodarTeste() {
    console.log("Iniciando teste de envio de e-mail pela pasta /test...");
    
    // Verificação de segurança: Se isso imprimir 'undefined', o .env ainda não carregou
    console.log("Usuário configurado:", process.env.EMAIL_USER);

    const emailDestino = "heitorpinto.oficial@gmail.com"; 
    const codigoTeste = "999888";

    const sucesso = await enviarCodigoVerificacao(emailDestino, codigoTeste);

    if (sucesso) {
        console.log("🚀 Sucesso! O e-mail foi disparado corretamente.");
    } else {
        console.log("❌ Falha no envio.");
    }
}

rodarTeste();