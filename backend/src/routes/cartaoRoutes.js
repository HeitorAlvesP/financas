import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import {
    cadastrarCartao,
    buscarCartoesPorUsuario,
} from '../controllers/CartaoController.js';

const router = express.Router();

export default function (db) {
    // Rota: POST http://localhost:3000/api/cartoes/
    router.post('/',                                  verificarToken, (req, res) => cadastrarCartao(db, req, res));

    // Rotas abaixo
    router.get('/usuario/:idUsuario',                 verificarToken, (req, res) => buscarCartoesPorUsuario(db, req, res));
    

    return router;
}