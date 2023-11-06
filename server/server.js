const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const todoRouter = require('./routes/todoRouter')
const app = express();

app.use(cors());
app.use('/todos', todoRouter);



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
