/*  #IMPORTACOES    */
import bcrypt from 'bcrypt'
import { enviarCodigoVerificacao } from '../services/emailService.js';



/*    #CREATE       */
export const cadastrarUsuario = async (db, req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha || !confirmarSenha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }
    if (senha !== confirmarSenha) {
        return res.status(400).json({ erro: "As senhas não coincidem." });
    }
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!regexSenha.test(senha)) {
        return res.status(400).json({
            erro: "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais."
        });
    }


    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();

        await db.run(
            `INSERT INTO tb_usuario (nome, email, senha, codigo_validacao) VALUES (?, ?, ?, ?)`,
            [nome, email, senhaCriptografada, codigo]
        );

        // Dispara o e-mail (não usamos 'await' aqui para não travar a resposta do usuário)
        enviarCodigoVerificacao(email, codigo);

        return res.status(201).json({
            mensagem: "Código encaminhado ao e-mail!"
        });

    } catch (error) {
        if (error.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
        }
        return res.status(500).json({ erro: "Erro interno ao cadastrar usuário." });
    }
};
/*       ###         */