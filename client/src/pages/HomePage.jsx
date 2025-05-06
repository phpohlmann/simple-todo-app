import React, { useState, useEffect } from "react";
import axios from "axios";

const TASK_API_URL = "http://localhost:5000/api/tasks/";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(TASK_API_URL);
        setTasks(data);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
        setError(
          err.response?.data?.message || err.message || "Erro ao buscar tarefas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setError(null);
    try {
      const newTask = { title: newTaskTitle };
      const { data: createdTask } = await axios.post(TASK_API_URL, newTask);
      setTasks([...tasks, createdTask]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao adicionar tarefa"
      );
    }
  };

  const handleToggleComplete = async (taskId, currentCompletedStatus) => {
    setError(null);
    try {
      const updatedTaskData = { completed: !currentCompletedStatus };
      const { data: updatedTask } = await axios.put(
        TASK_API_URL + taskId,
        updatedTaskData
      );

      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao atualizar tarefa"
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError(null);
    try {
      await axios.delete(TASK_API_URL + taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao excluir tarefa"
      );
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
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

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      handleToggleComplete(task._id, task.completed)
                    }
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`text-gray-800 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
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
