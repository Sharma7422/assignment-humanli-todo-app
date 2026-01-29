import React, { useState } from "react";
import "./BoardList.css";

function BoardList({ boards, selectedBoard, onSelectBoard, onDeleteBoard, onUpdateBoard }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const startEdit = (board) => {
    setEditingId(board._id);
    setEditName(board.name);
  };

  const saveEdit = (boardId) => {
    if (editName.trim()) {
      onUpdateBoard(boardId, editName);
    }
    setEditingId(null);
  };

  return (
    <div className="board-list">
      {boards.length === 0 ? (
        <p className="no-boards">No boards yet. Create one to get started!</p>
      ) : (
        boards.map((board) => (
          <div
            key={board._id}
            className={`board-item ${selectedBoard?._id === board._id ? "active" : ""}`}
          >
            {editingId === board._id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => saveEdit(board._id)}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="board-content" onClick={() => onSelectBoard(board)}>
                <span className="board-name">{board.name}</span>
                <div className="board-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(board);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBoard(board._id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default BoardList;
