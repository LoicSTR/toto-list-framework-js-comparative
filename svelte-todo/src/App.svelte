<script>
  let tasks = $state([]);
  let newTask = $state('');

  $effect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  function addTask() {
    if (!newTask.trim()) return;
    tasks = [...tasks, { id: Date.now(), text: newTask.trim(), completed: false }];
    newTask = '';
  }
  function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); }
  function toggleTask(id) { tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t); }
</script>


<main>
  <div class="container">
    <h1>TodoList</h1>
    <form class="todo-input" onsubmit={e => { e.preventDefault(); addTask(); }}>
      <input
        type="text"
        bind:value={newTask}
        placeholder="Ajouter une tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
    <ul class="task-list">
      {#each tasks as task (task.id)}
        <li class="task-item" class:completed={task.completed}>
          <button
            class="complete-btn"
            onclick={() => toggleTask(task.id)}
          >
            {task.completed ? '✓' : '○'}
          </button>
          <span class="task-text">{task.text}</span>
          <button
            class="delete-btn"
            onclick={() => deleteTask(task.id)}
          >
            ×
          </button>
        </li>
      {/each}
    </ul>
  </div>
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
  }

  .todo-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  input[type="text"] {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }

  .task-list {
    list-style: none;
  }

  .task-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: white;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .task-item.completed {
    opacity: 0.7;
  }

  .task-item.completed .task-text {
    text-decoration: line-through;
    color: #7f8c8d;
  }

  .task-text {
    flex: 1;
    margin: 0 1rem;
  }

  .delete-btn {
    background-color: #e74c3c;
    padding: 0.5rem 1rem;
  }

  .delete-btn:hover {
    background-color: #c0392b;
  }

  .complete-btn {
    background-color: #2ecc71;
    padding: 0.5rem 1rem;
  }

  .complete-btn:hover {
    background-color: #27ae60;
  }
</style>
