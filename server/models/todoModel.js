// models/todoModel.js
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/todo_db'); // Replace with your database connection details

module.exports = {
  getAll: () => {
    return db.any('SELECT * FROM todos ORDER BY id');
  },

  add: (task) => {
    return db.one('INSERT INTO todos(task) VALUES($1) RETURNING id', [task]);
  },

  update: (id, updatedTask) => {
    return db.none('UPDATE todos SET task = $1 WHERE id = $2', [updatedTask, id]);
  },

  delete: (id) => {
    return db.none('DELETE FROM todos WHERE id = $1', [id]);
  },
};
