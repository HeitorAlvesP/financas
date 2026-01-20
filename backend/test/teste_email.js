import 'dotenv/config';
import { enviarCodigoVerificacao } from '../src/services/emailService.js';

async function rodarTeste() {
    console.log("Iniciando teste de envio de e-mail...");
    
    // Substitua pelo seu e-mail pessoal para receber o teste
    const emailDestino = "seu-email@gmail.com"; 
    const codigoTeste = "123456";

    const sucesso = await enviarCodigoVerificacao(emailDestino, codigoTeste);

    if (sucesso) {
        console.log("🚀 Teste finalizado: O e-mail deve chegar em instantes!");
    } else {
        console.log("❌ Teste falhou: Verifique as mensagens de erro acima.");
    }
}

rodarTeste();