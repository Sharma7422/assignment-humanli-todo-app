import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3456/api",
});

console.log("API Base URL:", API.defaults.baseURL);

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.error,
      url: error.config?.url,
      method: error.config?.method,
    });
    return Promise.reject(error);
  }
);

//  AUTH APIs 
export const signup = (payload) => {
  return API.post("/auth/signup", payload);
};

export const login = (payload) => {
  return API.post("/auth/login", payload);
};

//  BOARD APIs 
export const createBoard = (payload) => {
  return API.post("/boards", payload);
};

export const getBoards = () => {
  return API.get("/boards");
};

export const updateBoard = (boardId, payload) => {
  return API.put(`/boards/${boardId}`, payload);
};

export const deleteBoard = (boardId) => {
  return API.delete(`/boards/${boardId}`);
};

// ===== TODO APIs =====
export const createTodo = (payload) => {
  return API.post("/todos", payload);
};

export const getTodos = (boardId) => {
  return API.get(`/todos/${boardId}`);
};

export const updateTodo = (todoId, payload) => {
  return API.put(`/todos/${todoId}`, payload);
};

export const deleteTodo = (todoId) => {
  return API.delete(`/todos/${todoId}`);
};

export default API;
