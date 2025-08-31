import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      }])
      setNewTask('')
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="container">
      <h1>TodoList</h1>
      <form className="todo-input" onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <button
              className="complete-btn"
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? '✓' : '○'}
            </button>
            <span className="task-text">{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
