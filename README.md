# 📝 Simple To-Do App (MERN Stack)

Este é um projeto de aplicação de Gerenciamento de Tarefas (To-Do List) desenvolvido com a stack MERN (MongoDB, Express.js, React, Node.js), Tailwind CSS para estilização e autenticação baseada em JWT.

O objetivo principal é demonstrar a construção de uma aplicação web full-stack moderna, cobrindo desde a configuração inicial, desenvolvimento da API RESTful, criação da interface do usuário interativa, até a documentação da API e versionamento com Git.

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Registro e Login com validação e hash de senhas (bcrypt).
- **Gerenciamento de Sessão:** Uso de JSON Web Tokens (JWT) para proteger rotas e manter o usuário autenticado.
- **CRUD de Tarefas:** Funcionalidades completas para Criar, Ler, Atualizar (marcar como concluída/não concluída) e Excluir tarefas.
- **Tarefas por Usuário:** Cada tarefa pertence a um usuário específico, garantindo privacidade.
- **API RESTful:** Backend robusto seguindo princípios REST.
- **Interface Reativa:** Frontend desenvolvido com React e Vite para uma experiência rápida.
- **Estilização Moderna:** Uso de Tailwind CSS para uma UI limpa e responsiva.
- **Documentação da API:** Interface Swagger UI interativa para explorar e testar os endpoints da API.
- **Variáveis de Ambiente:** Configuração segura de dados sensíveis (conexão com BD, segredo JWT).

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - React (v18+)
  - Vite (Build Tool)
  - Tailwind CSS (Framework CSS Utilitário)
  - React Router DOM (Roteamento)
  - Axios (Requisições HTTP)
  - React Context API (Gerenciamento de Estado de Autenticação)
- **Backend:**
  - Node.js (Ambiente de Execução)
  - Express.js (Framework Web)
  - Mongoose (ODM para MongoDB)
  - MongoDB (Banco de Dados NoSQL)
  - JSON Web Token (JWT) (Autenticação)
  - bcryptjs (Hashing de Senhas)
  - Cors (Habilitar Requisições Cross-Origin)
  - Dotenv (Variáveis de Ambiente)
- **Documentação da API:**
  - Swagger UI Express
  - Swagger-JSDoc
- **Desenvolvimento:**
  - Nodemon (Restart Automático do Servidor Backend)
  - ESLint & Prettier (Linting e Formatação de Código)
  - Git & Gitflow (Versionamento)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão LTS recomendada) e npm (geralmente vem junto com o Node.js)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (instância local) OU uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (serviço de nuvem gratuito)

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o Repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
    cd simple-todo-app
    ```

2.  **Configuração do Backend:**

    - Navegue até a pasta do servidor:
      ```bash
      cd server
      ```
    - Instale as dependências do backend:
      ```bash
      npm install
      ```
    - Crie um arquivo `.env` na pasta `server/` (raiz do backend). Você pode copiar o conteúdo de um `.env.example` se existir, ou criar um novo com as seguintes variáveis:

      ```env
      # Porta onde o servidor backend rodará
      PORT=5000

      # String de conexão do MongoDB (local ou Atlas)
      # Exemplo Atlas: mongodb+srv://<username>:<password>@<cluster-uri>/<database-name>?retryWrites=true&w=majority
      # Exemplo Local: mongodb://localhost:27017/simple-todo-app
      MONGO_URI=SUA_STRING_DE_CONEXAO_MONGODB

      # Segredo forte e aleatório para assinar os tokens JWT
      # Use um gerador de strings seguras
      JWT_SECRET=SEU_SEGREDO_JWT_SUPER_SECRETO
      ```

      **Importante:** Substitua os valores de exemplo pelos seus dados reais. **Não** adicione o arquivo `.env` ao controle de versão (ele já deve estar no `.gitignore`).

3.  **Configuração do Frontend:**
    - Volte para a pasta raiz e navegue até a pasta do cliente:
      ```bash
      cd ../client
      # ou a partir da raiz: cd client
      ```
    - Instale as dependências do frontend:
      ```bash
      npm install
      ```
    - _(Neste momento, a URL da API está configurada diretamente no código frontend (`http://localhost:5000`). Para uma configuração mais flexível, considere usar variáveis de ambiente Vite (`.env` na pasta `client` com `VITE_API_URL=...`) no futuro)._

## ▶️ Rodando a Aplicação

Você precisará de **dois terminais** abertos para rodar o backend e o frontend simultaneamente.

1.  **Iniciar o Servidor Backend (Node.js/Express):**

    - No primeiro terminal, navegue até a pasta `server`:
      ```bash
      cd server
      ```
    - Execute o script de desenvolvimento (com Nodemon):
      ```bash
      npm run dev
      ```
    - O servidor backend estará rodando (por padrão) em `http://localhost:5000`.

2.  **Iniciar o Cliente Frontend (React/Vite):**

    - No segundo terminal, navegue até a pasta `client`:
      ```bash
      cd client
      ```
    - Execute o script de desenvolvimento (Vite):
      ```bash
      npm run dev
      ```
    - A aplicação React estará acessível (por padrão) em `http://localhost:5173` (Vite informará a porta exata no console).

3.  **Acesse a Aplicação:** Abra seu navegador e vá para o endereço fornecido pelo Vite (ex: `http://localhost:5173`).

## 📚 Documentação da API (Swagger)

A documentação interativa da API está disponível enquanto o servidor backend está rodando. Acesse:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Você pode explorar os endpoints, ver os schemas e até mesmo testar as rotas (lembre-se de usar o botão "Authorize" e fornecer um token JWT obtido via login para testar as rotas protegidas).

## 📂 Estrutura de Pastas

simple-todo-app/
├── client/ # Código do Frontend (React/Vite/Tailwind)
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/ # Componentes React reutilizáveis
│ │ ├── context/ # React Context API (ex: AuthContext)
│ │ ├── pages/ # Componentes de Página (Login, Register, Home)
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── .gitignore
│ ├── index.html
│ ├── package.json
│ ├── postcss.config.js
│ └── tailwind.config.js
│
├── server/ # Código do Backend (Node.js/Express/MongoDB)
│ ├── config/ # Configuração (ex: conexão DB)
│ ├── controllers/ # (Opcional: Poderíamos refatorar para ter controllers)
│ ├── middleware/ # Middlewares (auth, errors)
│ ├── models/ # Modelos Mongoose (User, Task)
│ ├── routes/ # Definições de Rotas Express
│ ├── utils/ # Funções utilitárias (ex: generateToken)
│ ├── .env # (Não versionado) Variáveis de ambiente
│ ├── .eslintrc.json
│ ├── .prettierrc.json
│ ├── package.json
│ └── server.js # Ponto de entrada do servidor
│
├── .gitignore # Arquivo gitignore global
└── README.md # Este arquivo
