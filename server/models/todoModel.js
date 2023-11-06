const pool = require("../db");
module.exports = {
  getAll: async () => {
    try {
      const result = await pool.query("SELECT * FROM todos ORDER BY id");
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  add: async (task) => {
    try {
      const result = await pool.query("INSERT INTO todos(task) VALUES($1) RETURNING id", [task]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (id, updatedTask) => {
    try {
      await pool.query("UPDATE todos SET task = $1 WHERE id = $2", [updatedTask, id]);
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    } catch (error) {
      throw error;
    }
  },
};
