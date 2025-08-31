const express = require("express");
const app = express();
const port = 3000;

// Middleware pour parser le body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("."));

// Stockage en mémoire des todos
let tasks = [];

// Route pour ajouter une todo
app.post("/add-task", (req, res) => {
  const { title } = req.body;
  const task = {
    id: Date.now(),
    title,
    completed: false,
  };
  tasks.push(task);

  res.send(`
        <div id="task-${task.id}" class="todo-item">
            <input type="checkbox" onchange="toggleTodo(${task.id})">
            <span>${task.title}</span>
            <button onclick="deleteTodo(${task.id})">Supprimer</button>
        </div>
    `);
});

// Route pour supprimer une tâche
app.delete("/delete-task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.sendStatus(200);
});

// Route pour basculer l'état d'une tâche
app.put("/toggle-task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
