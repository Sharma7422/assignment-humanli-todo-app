const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/todoController");

router.post("/", auth, controller.createTodo);
router.get("/:boardId", auth, controller.getTodos);
router.put("/:id", auth, controller.updateTodo);
router.delete("/:id", auth, controller.deleteTodo);

module.exports = router;
