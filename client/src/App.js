import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
        <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <Signup setToken={setToken} />} />
        <Route 
          path="/dashboard" 
          element={token ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
