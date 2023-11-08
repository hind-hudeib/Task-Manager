const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (text) VALUES($1) RETURNING *",
      [text]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/done/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateQuery = "UPDATE todo SET done = true WHERE id = $1";

    await pool.query(updateQuery, [id]);

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});