const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Middleware para proteger rotas (o mesmo que fizemos antes)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Erro na validação do token:', error);
      res.status(401);
      throw new Error('Não autorizado, token falhou');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Não autorizado, sem token');
  }
});

// --- Novos Middlewares de Tratamento de Erros ---

// Middleware para lidar com rotas não encontradas (404)
const notFound = (req, res, next) => {
  const error = new Error(`Não encontrado - ${req.originalUrl}`);
  res.status(404); // Define o status da resposta como 404
  next(error); // Passa o erro para o próximo middleware (que será o errorHandler)
};

// Middleware geral para tratamento de erros
const errorHandler = (err, req, res, next) => {
  // Se o status code já foi definido e não é 200, usa ele. Senão, usa 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // Define o status da resposta

  // Retorna um JSON com a mensagem de erro e, em ambiente de desenvolvimento, o stack trace
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Mostra o stack trace apenas em dev
  });
};


module.exports = { protect, notFound, errorHandler }; // Exporta todos os middlewares