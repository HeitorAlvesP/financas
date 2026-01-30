import express from 'express';
import {
    cadastrarUsuario,
    validarCodigo,
    loginUsuario,
    reenviarCodigo,
    solicitarRecuperacao,
    redefinirSenha
} from '../controllers/usuarioController.js';

const router = express.Router();

export default function (db) {

    // Rota: POST http://localhost:3000/api/usuarios/
    router.post('/', (req, res) => cadastrarUsuario(db, req, res));

    // Rota: POST http://localhost:3000/api/usuarios/validar
    // Note que, como o app.use no seu app.js usa '/api/usuarios', 
    // esta rota final será '/api/usuarios/validar'
    router.post('/validar', (req, res) => validarCodigo(db, req, res));
    router.post('/login', (req, res) => loginUsuario(db, req, res));
    router.post('/reenviar-codigo', (req, res) => reenviarCodigo(db, req, res));
    router.post('/solicitar-recuperacao', (req, res) => solicitarRecuperacao(db, req, res));
    router.post('/redefinir-senha', (req, res) => redefinirSenha(db, req, res));
    router.get('/perfil/:email', (req, res) => buscarPerfil(db, req, res));

    return router;
}