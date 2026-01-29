const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes (no auth middleware needed)
app.use("/api/auth", require("./routes/authRoutes"));

// Protected routes
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

const PORT = process.env.PORT || 8301;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
