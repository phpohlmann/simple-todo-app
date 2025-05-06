require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Vamos criar este arquivo depois
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Permite que o express leia JSON no corpo das requisições

// Conectar ao Banco de Dados (Vamos implementar connectDB mais tarde)
connectDB();

app.use('/api/auth', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está rodando...');
});

const PORT = process.env.PORT || 5000; // Define a porta, usando variável de ambiente ou 5000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});