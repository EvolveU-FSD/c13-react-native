const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const todos = [
  { name: "Buy Milk", complete: false },
  { name: "Buy Eggs", complete: true },
  { name: "Buy Bread", complete: false },
];
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json(todos);
});
app.post("/", (req, res) => {
  const newTodo = req.body;
  console.log(newTodo, "newTodo");
  todos.push(newTodo);
  res.sendStatus(201);
});

app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos[id];
  todo.complete = !todo.complete;
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
