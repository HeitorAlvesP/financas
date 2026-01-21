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



/*  #VVALIDA EMAIL   */
export const validarCodigo = async (db, req, res) => {
    const { email, codigo } = req.body;

    // Validação básica de entrada
    if (!email || !codigo) {
        return res.status(400).json({ erro: "E-mail e código são obrigatórios." });
    }

    try {
        // 1. Busca o usuário no banco pelo e-mail
        const usuario = await db.get(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // 2. Compara o código digitado com o código do banco
        if (usuario.codigo_validacao === codigo) {
            // 3. Sucesso: Ativa a conta e remove o código para ele não ser usado de novo
            await db.run(
                `UPDATE tb_usuario SET email_confirmado = 1, codigo_validacao = NULL WHERE email = ?`,
                [email]
            );

            return res.status(200).json({ mensagem: "Conta validada com sucesso!" });
        } else {
            return res.status(400).json({ erro: "Código de verificação incorreto." });
        }

    } catch (error) {
        console.error("Erro na validação:", error);
        return res.status(500).json({ erro: "Erro interno ao validar o código." });
    }
};
/*       ###         */