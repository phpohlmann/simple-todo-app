import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Precisaremos do axios para futuras interações

// 1. Criar o Contexto
const AuthContext = createContext(null); // Inicializa com null ou um objeto padrão

// 2. Criar o Componente Provedor (Provider)
export const AuthProvider = ({ children }) => {
  // Estado para armazenar as informações do usuário (vindo do localStorage inicialmente)
  const [userInfo, setUserInfo] = useState(() => {
    // Tenta ler do localStorage na inicialização
    const storedUserInfo = localStorage.getItem('userInfo');
    try {
      return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    } catch (error) {
      console.error("Erro ao parsear userInfo do localStorage", error);
      localStorage.removeItem('userInfo'); // Remove item inválido
      return null;
    }
  });

  // Função para simular login (será chamada após a API retornar sucesso)
  // Recebe os dados do usuário (incluindo token) da API
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData)); // Salva no localStorage
    setUserInfo(userData); // Atualiza o estado do contexto
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('userInfo'); // Remove do localStorage
    setUserInfo(null); // Limpa o estado do contexto
    // Opcional: Redirecionar para a página de login após logout
    // (Pode ser feito no componente que chama logout ou aqui)
    // window.location.href = '/login'; // Recarrega a página para /login
  };

  // Efeito para atualizar axios com o token quando userInfo mudar
  // Isso garante que as requisições futuras tenham o header de autorização
  useEffect(() => {
    if (userInfo && userInfo.token) {
      // Define o cabeçalho de autorização padrão para todas as requisições axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
    } else {
      // Remove o cabeçalho se o usuário deslogar
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [userInfo]); // Roda sempre que userInfo mudar

  // Valor que será fornecido pelo contexto
  const value = {
    userInfo, // O estado atual das informações do usuário
    login,    // Função para fazer login (atualizar estado e localStorage)
    logout,   // Função para fazer logout (limpar estado e localStorage)
  };

  // Retorna o Provedor envolvendo os componentes filhos (children)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Criar um Hook Customizado para facilitar o uso do Contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context; // Retorna { userInfo, login, logout }
};