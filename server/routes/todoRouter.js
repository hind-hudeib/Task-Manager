const express = require('express');
const router = express.Router();
const todoController = require('./controllers/todoController');

router.get('/', todoController.listTodos);

router.post('/add', todoController.addTodo);

router.put('/:id/update', todoController.updateTodo);

router.delete('/:id/delete', todoController.deleteTodo);

module.exports = router;
