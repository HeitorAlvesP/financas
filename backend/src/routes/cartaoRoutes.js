import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import {
    cadastrarCartao,
    buscarCartoesPorUsuario,
    inativarCartao,
} from '../controllers/CartaoController.js';

const router = express.Router();

export default function (db) {
    // Rota: POST http://localhost:3000/api/cartoes/
    router.post('/',                                  verificarToken, (req, res) => cadastrarCartao(db, req, res));

    // Rotas abaixo
    router.get('/usuario/:idUsuario',                 verificarToken, (req, res) => buscarCartoesPorUsuario(db, req, res));
    router.put('/:idCartao/inativar',                 verificarToken, (req, res) => inativarCartao(db, req, res));
    

    return router;
}