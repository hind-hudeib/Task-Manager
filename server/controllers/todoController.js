// TodoController.js
const express = require("express");
const router = express.Router();
const TodoModel = require("../models/todoModel");

// Create a todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = await TodoModel.createTodo(text);
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await TodoModel.getAllTodos();
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a todo by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.getTodoById(id);
    res.json(todo);
  } catch (err) {
    console.error(err.message);
  }
});

// Update todo status to "done"
router.put("/done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TodoModel.updateTodoDoneStatus(id);
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TodoModel.deleteTodo(id);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
