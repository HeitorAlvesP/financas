import express from 'express';
import { cadastrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

// Recebemos o 'db' do app.js e passamos para as rotas
export default function (db) {
    
    // Rota: POST http://localhost:3000/api/usuarios/
    router.post('/', (req, res) => cadastrarUsuario(db, req, res));
    
    // Futuramente adicionaremos outras rotas aqui:
    // router.post('/login', (req, res) => loginUsuario(db, req, res));
    // router.put('/:id', (req, res) => editarUsuario(db, req, res));

    return router;
}