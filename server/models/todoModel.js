// TodoModel.js
const pool = require("../db");

class TodoModel {
  async createTodo(text) {
    const newTodo = await pool.query("INSERT INTO todo (text) VALUES($1) RETURNING *", [text]);
    return newTodo.rows[0];
  }

  async getAllTodos() {
    const allTodos = await pool.query("SELECT * FROM todo");
    return allTodos.rows;
  }

  async getTodoById(id) {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    return todo.rows[0];
  }

  async updateTodoDoneStatus(id) {
    const updateQuery = "UPDATE todo SET done = true WHERE id = $1";
    await pool.query(updateQuery, [id]);
  }

  async deleteTodo(id) {
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
  }
}

module.exports = new TodoModel();
