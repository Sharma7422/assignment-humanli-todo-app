import React, { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/axios";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({ boardId, token }) {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [boardId]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos(boardId);
      setTodos(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const response = await createTodo({
        title: newTitle,
        description: newDescription,
        boardId: boardId,
      });
      setTodos([...todos, response.data]);
      setNewTitle("");
      setNewDescription("");
      setError("");
    } catch (err) {
      setError("Failed to create todo");
    }
  };

  const handleUpdateTodo = async (todoId, updatedData) => {
    try {
      const response = await updateTodo(todoId, updatedData);
      setTodos(todos.map((t) => (t._id === todoId ? response.data : t)));
      setError("");
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(todoId);
        setTodos(todos.filter((t) => t._id !== todoId));
        setError("");
      } catch (err) {
        setError("Failed to delete todo");
      }
    }
  };

  if (loading) {
    return <div className="todos-container loading">Loading todos...</div>;
  }

  return (
    <div className="todos-container">
      <h2>📝 Todos</h2>

      <form onSubmit={handleCreateTodo} className="create-todo-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Todo title"
          required
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
          rows="2"
        />
        <button type="submit">+ Add Todo</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="todos-list">
        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Create one to get started!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
