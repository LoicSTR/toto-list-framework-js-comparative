
        function todoList() {
            return {
                tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
                newTask: '',

                addTask() {
                    if (this.newTask.trim()) {
                        this.tasks.push({
                            id: Date.now(),
                            text: this.newTask.trim(),
                            completed: false
                        });
                        this.newTask = '';
                        this.saveTasks();
                    }
                },

                deleteTask(id) {
                    this.tasks = this.tasks.filter(task => task.id !== id);
                    this.saveTasks();
                },

                toggleTask(id) {
                    this.tasks = this.tasks.map(task => 
                        task.id === id ? { ...task, completed: !task.completed } : task
                    );
                    this.saveTasks();
                },

                saveTasks() {
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            }
        }
