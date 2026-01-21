import express from 'express';
import { cadastrarUsuario, validarCodigo } from '../controllers/usuarioController.js'; // Importe a nova função

const router = express.Router();

export default function (db) {
    
    // Rota: POST http://localhost:3000/api/usuarios/
    router.post('/', (req, res) => cadastrarUsuario(db, req, res));
    
    // Rota: POST http://localhost:3000/api/usuarios/validar
    // Note que, como o app.use no seu app.js usa '/api/usuarios', 
    // esta rota final será '/api/usuarios/validar'
    router.post('/validar', (req, res) => validarCodigo(db, req, res));

    return router;
}