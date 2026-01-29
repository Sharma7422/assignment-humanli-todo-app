const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load .env file
const envConfig = dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));


const PORT = envConfig.parsed.PORT || 8301;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
