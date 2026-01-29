import React, { useState } from "react";
import "./TodoItem.css";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const handleToggleComplete = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, {
        title: editTitle,
        description: editDescription,
        completed: todo.completed,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Todo title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
            rows="2"
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <div className="todo-checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
            />
          </div>
          <div className="todo-info">
            <h3 className={todo.completed ? "line-through" : ""}>
              {todo.title}
            </h3>
            {todo.description && <p>{todo.description}</p>}
          </div>
          <div className="todo-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={todo.completed}
            >
              ✏️
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(todo._id)}
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
