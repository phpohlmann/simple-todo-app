require('dotenv').config(); // Carrega as variáveis de ambiente do .env

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Vamos criar este arquivo depois
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// --- Configuração do Swagger ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versão da especificação OpenAPI
    info: {
      title: 'Simple To-Do API', // Título da sua API
      version: '1.0.0', // Versão da sua API
      description:
        'API para gerenciamento de tarefas com autenticação JWT', // Descrição
    },
    servers: [ // Define os servidores onde a API está disponível
      {
         // Ajuste a URL base conforme necessário (importante para testes no Swagger UI)
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Servidor de Desenvolvimento',
      },
      // Você pode adicionar outros servidores (produção, staging) aqui
    ],
    // Define componentes reutilizáveis, como esquemas de segurança
    components: {
      securitySchemes: {
        bearerAuth: { // Nome do esquema de segurança (pode ser qualquer nome)
          type: 'http', // Tipo http para autenticação Bearer
          scheme: 'bearer',
          bearerFormat: 'JWT', // Indica que é um token JWT
        },
      },
    },
    // Define que rotas protegidas usarão 'bearerAuth' globalmente (opcional, pode ser por rota)
    // security: [
    //   {
    //     bearerAuth: [], // Aplica bearerAuth a todas as rotas por padrão
    //   },
    // ],
  },
  // Caminho para os arquivos que contêm as anotações da API (nossas rotas)
  apis: ['./routes/*.js'], // Procura por arquivos .js na pasta routes
};

// Gera a especificação do Swagger com base nas opções
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Permite que o express leia JSON no corpo das requisições

// Conectar ao Banco de Dados (Vamos implementar connectDB mais tarde)
connectDB();

// --- Rotas da API ---
// Serve a interface do Swagger UI na rota /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Monta as rotas da aplicação (APÓS a rota do Swagger UI)
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está rodando...');
});

const PORT = process.env.PORT || 5000; // Define a porta, usando variável de ambiente ou 5000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});