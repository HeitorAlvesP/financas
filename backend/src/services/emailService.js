import nodemailer from 'nodemailer';

/**
 * Configuramos o transporte usando o serviço do Gmail.
 * O process.env busca as informações que você salvou no arquivo .env.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

/**
 * Função exportada para ser usada em qualquer parte do sistema.
 * @param {string} destinatarioEmail - E-mail de quem vai receber.
 * @param {string} codigo - O código de 6 dígitos gerado no cadastro.
 */


export async function enviarCodigoVerificacao(destinatarioEmail, codigo) {
    const corpoEmailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; max-width: 600px; margin: auto;">
            <h2 style="color: #4CAF50;">Seu Código de Verificação</h2>
            <p>Olá,</p>
            <p>Use o código abaixo para validar sua conta no Controle Financeiro:</p>
            <div style="background-color: #f2f2f2; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #333; letter-spacing: 5px;">${codigo}</span>
            </div>
            <p>Este código é válido por 15 minutos. Não o compartilhe com ninguém.</p>
            <p>Atenciosamente,<br>Equipe Controle Financeiro</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">
            <p style="font-size: 12px; color: #888; text-align: center;">Este é um e-mail automático, por favor não responda.</p>
        </div>
    `;

    const mailOptions = {
        from: `"Controle Financeiro" <${process.env.EMAIL_USER}>`,
        to: destinatarioEmail,
        subject: 'Código de Verificação - Cadastro',
        html: corpoEmailHtml
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ E-mail enviado com sucesso! ID: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`❌ Erro ao enviar o e-mail: ${error.message}`);
        // Detalhe importante: não paramos a aplicação, apenas logamos o erro.
        return false;
    }
}