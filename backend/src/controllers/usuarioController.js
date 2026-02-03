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

    if (!email || !codigo) {
        return res.status(400).json({ erro: "E-mail e código são obrigatórios." });
    }

    try {
        const usuario = await db.get(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        if (usuario.codigo_validacao === codigo) {
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



/*     LOGIN         */
export const loginUsuario = async (db, req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    try {
        const usuario = await db.get(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);

        if (!usuario) {
            return res.status(401).json({ erro: "E-mail ou senha incorretos." });
        }
        
        if (usuario.email_confirmado !== 1) {
            return res.status(403).json({ erro: "Por favor, confirme seu e-mail antes de logar." });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (senhaCorreta) {
            return res.status(200).json({ 
                mensagem: "Login realizado com sucesso!",
                usuario: { 
                    id: usuario.id_usuario,
                    nome: usuario.nome, 
                    email: usuario.email 
                }
            });
        } else {
            return res.status(401).json({ erro: "E-mail ou senha incorretos." });
        }

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
};
/*       ###         */



/*  REENVIAR CODIGO  */
export const reenviarCodigo = async (db, req, res) => {
    const { email } = req.body;

    try {
        const usuario = await db.get(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        const novoCodigo = Math.floor(100000 + Math.random() * 900000).toString();

        await db.run(
            `UPDATE tb_usuario SET codigo_validacao = ? WHERE email = ?`,
            [novoCodigo, email]
        );

        enviarCodigoVerificacao(email, novoCodigo);

        return res.status(200).json({ mensagem: "Novo código enviado!" });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao reenviar código." });
    }
};
/*       ###         */



/*  VERIFICA EMAIL  */
export const solicitarRecuperacao = async (db, req, res) => {
    const { email } = req.body;

    try {
        const usuario = await db.get(`SELECT * FROM tb_usuario WHERE email = ?`, [email]);

        if (!usuario) {
            return res.status(404).json({ erro: "Email não está cadastrado no nosso sistema" });
        }

        const codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();

        await db.run(
            `UPDATE tb_usuario SET codigo_validacao = ? WHERE email = ?`,
            [codigoRecuperacao, email]
        );

        enviarCodigoVerificacao(email, codigoRecuperacao);

        return res.status(200).json({ mensagem: "Código de recuperação enviado!" });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao processar solicitação." });
    }
};
/*       ###         */



/* REDEFINICAO SENHA */
export const redefinirSenha = async (db, req, res) => {
    const { email, novaSenha, confirmarNovaSenha } = req.body;

    if (novaSenha !== confirmarNovaSenha) {
        return res.status(400).json({ erro: "As senhas não coincidem." });
    }

    try {
        const hash = await bcrypt.hash(novaSenha, 10);
        await db.run(
            `UPDATE tb_usuario SET senha = ? WHERE email = ?`,
            [hash, email]
        );

        return res.status(200).json({ mensagem: "Senha atualizada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao atualizar senha." });
    }
};
/*       ###         */



/*  CARREGA DADOS   */
export const buscarPerfilPorId = async (db, req, res) => {
    // Pegamos o id que virá na rota: /perfil/:id
    const { id } = req.params;

    try {
        // Buscamos exatamente as colunas que você quer exibir agora
        const usuario = await db.get(
            `SELECT id_usuario, nome, email, cpf, data_nascimento, us_completo 
             FROM tb_usuario 
             WHERE id_usuario = ?`,
            [id]
        );

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }

        // Retornamos o objeto com os dados para o Frontend
        return res.status(200).json(usuario);
        
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return res.status(500).json({ erro: "Erro interno no servidor ao buscar perfil." });
    }
};
/*       ###         */