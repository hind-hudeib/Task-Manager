const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todoRouter')
const app = express();

app.use(cors());
app.use('/todos', todoRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
