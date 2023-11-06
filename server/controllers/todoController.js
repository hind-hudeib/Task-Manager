const todoModel = require('../models/todoModel');

const listTodos = (req, res) => {
  const todos = todoModel.getAll();
  res.render('index', { todos });
};

const addTodo = (req, res) => {
  const { task } = req.body;
  todoModel.add({ task });
  res.redirect('/');
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const updatedTodo = { task: req.body.task };
  todoModel.update(id, updatedTodo);
  res.redirect('/');
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  todoModel.delete(id);
  res.redirect('/');
};

module.exports = {
  listTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
