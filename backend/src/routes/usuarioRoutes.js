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

const router = express.Router();

export default function (db) {

    // Rota: POST http://localhost:3000/api/usuarios/
    router.post('/', (req, res) => cadastrarUsuario(db, req, res));

    // Rota: POST http://localhost:3000/api/usuarios/validar
    // Note que, como o app.use no seu app.js usa '/api/usuarios', esta rota final será '/api/usuarios/validar'

    router.post('/validar',                     verificarToken,     (req, res) => validarCodigo(db, req, res));
    router.post('/login',                       verificarToken,     (req, res) => loginUsuario(db, req, res));
    router.post('/reenviar-codigo',             verificarToken,     (req, res) => reenviarCodigo(db, req, res));
    router.post('/solicitar-recuperacao',                           (req, res) => solicitarRecuperacao(db, req, res));
    router.post('/redefinir-senha',             verificarToken,     (req, res) => redefinirSenha(db, req, res));
    
    router.put('/perfil/:id',                   verificarToken,     (req, res) => atualizarPerfil(db, req, res));    
    router.put('/perfil/alterar-senha/:id',     verificarToken,     (req, res) => alterarSenha(db, req, res));
    
    router.get('/perfil/:id',                   verificarToken,     (req, res) => buscarPerfilPorId(db, req, res));

    return router;
}