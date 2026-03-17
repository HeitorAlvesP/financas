import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: "Acesso negado. Faça login para continuar." });
    }

    try {
        
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado;
        next();

    } catch (error) {
        console.error("Erro na verificação do token:", error);
        return res.status(403).json({ erro: "Sessão expirada ou token inválido. Faça login novamente." });
    }
};