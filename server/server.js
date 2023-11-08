const express = require("express");
const app = express();
const cors = require("cors");
const todoController = require("./controllers/todoController");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
