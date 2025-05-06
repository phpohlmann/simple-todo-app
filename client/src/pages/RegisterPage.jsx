import React, { useState } from "react"; // Para estado local do componente
import { Link, useNavigate } from "react-router-dom"; // Para navegar entre rotas
import axios from "axios"; // Para fazer requisições HTTP para o backend

// !! IMPORTANTE !!
// URL base da nossa API backend.
// Se seu backend não estiver rodando em localhost:5000, ajuste esta URL.
const API_URL = "http://localhost:5000/api/auth/";

function RegisterPage() {
  // Estado para os campos do formulário (controlados)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado para mensagens de feedback (erro ou sucesso) para o usuário
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Hook para redirecionar o usuário após o sucesso
  const navigate = useNavigate();

  // --- REMOVIDO O CÓDIGO DUPLICADO DAQUI ---

  // Função assíncrona que lida com o envio do formulário
  const submitHandler = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Limpa mensagens de feedback anteriores
    setMessage(null);
    setError(null);

    // Validação frontend básica: verifica se as senhas digitadas são iguais
    if (password !== confirmPassword) {
      setError("Senhas não coincidem");
      return; // Para a execução se as senhas não forem iguais
    }

    // Validação adicional: senha com pelo menos 6 caracteres (exemplo)
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // Faz a requisição POST para a API de registro
      const config = {
        headers: {
          "Content-Type": "application/json", // Indica que estamos enviando JSON
        },
      };

      // Faz a requisição POST. Não precisamos desestruturar 'data' se não vamos usá-la diretamente aqui.
      // O simples fato da promise resolver (sem erro) indica sucesso para o axios.
      await axios.post(
        API_URL + "register", // URL completa da rota de registro
        { email, password }, // Dados a serem enviados no corpo da requisição
        config // Configurações da requisição
      );

      // Se o registro for bem sucedido (API retorna 2xx)
      setMessage(
        "Usuário registrado com sucesso! Redirecionando para login..."
      ); // Mensagem de sucesso
      setError(null); // Garante que qualquer erro anterior seja limpo

      // Espera um pouco para o usuário ver a mensagem e então redireciona
      setTimeout(() => {
        navigate("/login"); // Redireciona para a página de login após sucesso
      }, 1500); // Espera 1.5 segundos
    } catch (err) {
      // Se houver um erro na requisição (ex: email já existe, erro no servidor, etc.)
      // A API idealmente retorna o erro no corpo da resposta (err.response.data)
      setMessage(null); // Limpa qualquer mensagem de sucesso anterior
      setError(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message // Mensagem de erro específica da API
          : "Erro ao registrar. Tente novamente."
      ); // Mensagem de erro genérica
      // : err.message); // Ou usar a mensagem de erro do axios/network
    }
  };

  return (
    // Container principal centralizado
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Card/Formulário */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cadastro
        </h1>

        {/* Exibe mensagens de erro */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {/* Exibe mensagens de sucesso */}
        {message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={submitHandler}>
          {/* Campo Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
              required // Campo obrigatório (HTML5 validation)
              aria-required="true"
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Senha (mín. 6 caracteres)
            </label>
            <input
              type="password"
              id="password" // ID correto
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error && password.length < 6 ? "border-red-500" : ""
              }`} // Adiciona borda vermelha se erro de tamanho
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6} // Validação HTML5 de tamanho mínimo
              aria-required="true"
              aria-describedby={
                error && password.length < 6 ? "password-error" : undefined
              }
            />
            {error && password.length < 6 && (
              <p
                id="password-error"
                className="text-red-500 text-xs italic mt-1"
              >
                {error}
              </p>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                error && password !== confirmPassword ? "border-red-500" : ""
              }`} // Adiciona borda vermelha se senhas não batem
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-required="true"
              aria-describedby={
                error && password !== confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
            />
            {error && password !== confirmPassword && (
              <p
                id="confirm-password-error"
                className="text-red-500 text-xs italic -mt-2 mb-2"
              >
                {error}
              </p> // Mostra erro de confirmação
            )}
          </div>

          {/* Botão de Envio */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Cadastrar
            </button>
          </div>
        </form>

        {/* Link para Login */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-500 hover:text-blue-800"
            >
              Faça Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
