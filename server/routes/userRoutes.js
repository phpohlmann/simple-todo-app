const express = require('express');
const router = express.Router(); // Cria um roteador Express
const asyncHandler = require('express-async-handler'); // Middleware para lidar com async errors
const User = require('../models/User'); // Importa o modelo User
const generateToken = require('../utils/generateToken'); // Importa o helper de token

// Iremos instalar express-async-handler em breve

// @desc    Registrar um novo usuário
// @route   POST /api/auth/register
// @access  Public
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body; // Extrai email e senha do corpo da requisição

    // Verifica se o usuário já existe pelo email
    const userExists = await User.findOne({ email });

    if (userExists) {
      // Se existir, retorna um erro 400 (Bad Request)
      res.status(400);
      throw new Error('Usuário com este email já existe');
    }

    // Cria o novo usuário usando o modelo User
    // O middleware 'pre' no modelo fará o hash da senha automaticamente antes de salvar
    const user = await User.create({
      email,
      password,
    });

    // Se o usuário foi criado com sucesso
    if (user) {
      res.status(201).json({ // Status 201: Created
        _id: user._id,
        email: user.email,
        token: generateToken(user._id), // Gera e inclui o JWT na resposta
      });
    } else {
      // Se houve algum problema na criação (embora o create lance erro se falhar)
      res.status(400);
      throw new Error('Dados do usuário inválidos');
    }
  })
);

// @desc    Autenticar usuário e obter token
// @route   POST /api/auth/login
// @access  Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body; // Extrai email e senha

    // Encontra o usuário pelo email
    const user = await User.findOne({ email });

    // Verifica se o usuário existe e se a senha está correta
    // Utilizamos o método matchPassword que adicionamos no modelo User
    if (user && (await user.matchPassword(password))) {
      res.json({ // Retorna os dados do usuário e o token
        _id: user._id,
        email: user.email,
        token: generateToken(user._id), // Gera e inclui o JWT na resposta
      });
    } else {
      // Se usuário não encontrado ou senha incorreta
      res.status(401); // Status 401: Unauthorized
      throw new Error('Email ou senha inválidos');
    }
  })
);

module.exports = router; // Exporta o roteador