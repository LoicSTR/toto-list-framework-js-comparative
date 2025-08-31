class TodoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.taskInput = document.getElementById("taskInput");
    this.addButton = document.getElementById("addTask");
    this.taskList = document.getElementById("taskList");

    this.addButton.addEventListener("click", () => this.addTask());
    this.taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    this.renderTasks();
  }

  addTask() {
    const taskText = this.taskInput.value.trim();
    if (taskText) {
      this.tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false,
      });
      this.saveTasks();
      this.renderTasks();
      this.taskInput.value = "";
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  renderTasks() {
    this.taskList.innerHTML = "";
    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      const completeBtn = document.createElement("button");
      completeBtn.className = "complete-btn";
      completeBtn.textContent = task.completed ? "✓" : "○";
      completeBtn.onclick = () => this.toggleTask(task.id);

      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = task.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "×";
      deleteBtn.onclick = () => this.deleteTask(task.id);

      li.appendChild(completeBtn);
      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      this.taskList.appendChild(li);
    });
  }
}

// Initialiser l'application
document.addEventListener("DOMContentLoaded", () => {
  new TodoList();
});
