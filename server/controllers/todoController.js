const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      boardId: req.body.boardId,
      userId: req.user.id,
      completed: req.body.completed || false,
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      boardId: req.params.boardId,
      userId: req.user.id,
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
