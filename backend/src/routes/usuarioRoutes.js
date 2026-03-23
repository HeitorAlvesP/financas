import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import {
    cadastrarUsuario,
    validarCodigo,
    loginUsuario,
    reenviarCodigo,
    solicitarRecuperacao,
    redefinirSenha,
    buscarPerfilPorId,
    atualizarPerfil,
    alterarSenha,
} from '../controllers/usuarioController.js';

import {
    cadastrarCartao,
    buscarCartoesPorUsuario,
} from '../controllers/CartaoController.js'

const router = express.Router();

export default function (db) {

    // Rota: POST http://localhost:3000/api/usuarios/
    router.post('/', (req, res) => cadastrarUsuario(db, req, res));

    // Rotas publicas, sem necessidade de token
    router.post('/validar',              (req, res) => validarCodigo(db, req, res));
    router.post('/login',                (req, res) => loginUsuario(db, req, res));
    router.post('/reenviar-codigo',      (req, res) => reenviarCodigo(db, req, res));
    router.post('/solicitar-recuperacao',(req, res) => solicitarRecuperacao(db, req, res));
    router.post('/redefinir-senha',      (req, res) => redefinirSenha(db, req, res));
    
    // Rotas Privadas Abaixo com validações de TOKEN
    router.put('/perfil/:id',                   verificarToken, (req, res) => atualizarPerfil(db, req, res));    
    router.put('/perfil/alterar-senha/:id',     verificarToken, (req, res) => alterarSenha(db, req, res));
    router.get('/perfil/:id',                   verificarToken, (req, res) => buscarPerfilPorId(db, req, res));
    
    return router;
}