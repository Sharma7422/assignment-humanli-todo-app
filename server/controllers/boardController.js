const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      userId: req.user.uid,
    });
    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.uid });
    res.json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      { name: req.body.name },
      { new: true }
    );
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid,
    });
    res.json({ message: "Board deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
