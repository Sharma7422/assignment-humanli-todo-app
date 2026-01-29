import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBoards, createBoard, updateBoard, deleteBoard } from "../api/axios";
import BoardList from "../components/BoardList";
import "./Dashboard.css";

function Dashboard({ handleLogout }) {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await getBoards();
      setBoards(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load boards");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    try {
      const response = await createBoard({ name: newBoardName });
      setBoards([...boards, response.data]);
      setNewBoardName("");
      setError("");
    } catch (err) {
      setError("Failed to create board");
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      try {
        await deleteBoard(boardId);
        setBoards(boards.filter((b) => b._id !== boardId));
        if (selectedBoard?._id === boardId) setSelectedBoard(null);
        setError("");
      } catch (err) {
        setError("Failed to delete board");
      }
    }
  };

  const handleUpdateBoard = async (boardId, newName) => {
    try {
      const response = await updateBoard(boardId, { name: newName });
      setBoards(boards.map((b) => (b._id === boardId ? response.data : b)));
      setError("");
    } catch (err) {
      setError("Failed to update board");
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  if (loading) {
    return <div className="dashboard loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📋 Todo App</h1>
        <div className="header-right">
          <span className="user-email">{userEmail}</span>
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="left-panel">
          <div className="create-board-section">
            <h2>My Boards</h2>
            <form onSubmit={handleCreateBoard} className="create-board-form">
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Enter board name"
              />
              <button type="submit">+ Add Board</button>
            </form>
          </div>

          {error && <div className="error-message">{error}</div>}

          <BoardList
            boards={boards}
            selectedBoard={selectedBoard}
            onSelectBoard={setSelectedBoard}
            onDeleteBoard={handleDeleteBoard}
            onUpdateBoard={handleUpdateBoard}
          />
        </div>

        <div className="right-panel">
          {selectedBoard ? (
            <div className="board-selected">
              <h2>{selectedBoard.name}</h2>
              <p>Select a todo from the left or create a new one</p>
            </div>
          ) : (
            <div className="no-board-selected">
              <p>📌 Select a board to manage todos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
