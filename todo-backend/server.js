const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let currentId = 1;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const task = { id: currentId++, title, description, status, dueDate };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex !== -1) {
    const { title, description, status, dueDate } = req.body;
    tasks[taskIndex] = { id, title, description, status, dueDate };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).send('Task not found');
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
