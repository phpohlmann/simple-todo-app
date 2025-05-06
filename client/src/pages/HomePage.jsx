import React, { useState, useEffect } from "react"; // Importa useState e useEffect
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importa axios

// URL base da API de tarefas (se diferente, ajuste)
// Como configuramos o token globalmente no axios via AuthContext,
// podemos usar URLs relativas ou a base da API
const TASK_API_URL = "http://localhost:5000/api/tasks/"; // Inclua a barra no final

function HomePage() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  // --- Estados para Tarefas ---
  const [tasks, setTasks] = useState([]); // Array para armazenar as tarefas buscadas
  const [newTaskTitle, setNewTaskTitle] = useState(""); // Estado para o input de nova tarefa
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial para busca de tarefas
  const [error, setError] = useState(null); // Estado para erros na busca ou operações

  // --- Função de Logout (já existente) ---
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --- useEffect para Buscar Tarefas na Montagem ---
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true); // Inicia carregamento
      setError(null);
      try {
        // A requisição axios já terá o token de AuthContext
        const { data } = await axios.get(TASK_API_URL); // GET /api/tasks/
        setTasks(data); // Atualiza o estado com as tarefas recebidas
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
        setError(
          err.response?.data?.message || err.message || "Erro ao buscar tarefas"
        );
        // Se o erro for 401 (token inválido/expirado), deslogar o usuário
        if (err.response && err.response.status === 401) {
          logout();
          navigate("/login");
        }
      } finally {
        setLoading(false); // Finaliza carregamento
      }
    };

    if (userInfo) {
      // Só busca tarefas se o usuário estiver logado
      fetchTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, navigate, logout]); // Dependências: userInfo (para rebuscar se mudar), navigate e logout (usados no catch)

  // --- Funções Handler para CRUD de Tarefas (a serem implementadas) ---

  // Handler para adicionar nova tarefa
  const handleAddTask = async (e) => {
    e.preventDefault(); // Previne recarregamento se estiver em um form
    if (!newTaskTitle.trim()) return; // Não adiciona tarefa vazia

    setError(null);
    // Opcional: adicionar um estado de loading específico para adição
    try {
      const newTask = { title: newTaskTitle };
      const { data: createdTask } = await axios.post(TASK_API_URL, newTask); // POST /api/tasks/

      setTasks([...tasks, createdTask]); // Adiciona a nova tarefa ao estado local (otimista ou após sucesso)
      setNewTaskTitle(""); // Limpa o input
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao adicionar tarefa"
      );
    }
  };

  // Handler para marcar/desmarcar tarefa como concluída
  const handleToggleComplete = async (taskId, currentCompletedStatus) => {
    setError(null);
    try {
      const updatedTaskData = { completed: !currentCompletedStatus };
      const { data: updatedTask } = await axios.put(
        TASK_API_URL + taskId, // PUT /api/tasks/:id
        updatedTaskData
      );

      // Atualiza o estado local das tarefas
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao atualizar tarefa"
      );
    }
  };

  // Handler para excluir tarefa
  const handleDeleteTask = async (taskId) => {
    setError(null);
    // Opcional: Adicionar confirmação antes de excluir
    // if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;

    try {
      await axios.delete(TASK_API_URL + taskId); // DELETE /api/tasks/:id
      // Remove a tarefa do estado local
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao excluir tarefa"
      );
    }
  };

  // --- Renderização do Componente ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header com Saudação e Logout */}
        {userInfo && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">
              Bem-vindo, {userInfo.email}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        )}

        {/* Formulário para Adicionar Nova Tarefa */}
        <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Adicionar
          </button>
        </form>

        {/* Exibição de Erros Gerais */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Lista de Tarefas */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Suas Tarefas
        </h2>
        {loading ? (
          <p className="text-gray-500 text-center">Carregando tarefas...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhuma tarefa encontrada.
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className={`flex items-center justify-between p-3 rounded-md border ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Checkbox para Marcar/Desmarcar */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      handleToggleComplete(task._id, task.completed)
                    }
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  {/* Título da Tarefa */}
                  <span
                    className={`text-gray-800 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                {/* Botão de Excluir */}
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 font-medium text-sm px-2 py-1 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  aria-label={`Excluir tarefa ${task.title}`}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
