import "./index.css"; // Importa o CSS principal (que agora tem o Tailwind)

function App() {
  return (
    // Exemplo: um container simples com texto centralizado e padding do Tailwind
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Simple To-Do Frontend
      </h1>
    </div>
  );
}

export default App;
