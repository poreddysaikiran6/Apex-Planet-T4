// Todo app functionality
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.querySelector('#todoInput');
        this.prioritySelect = document.querySelector('#prioritySelect');
        this.todoList = document.querySelector('#todoList');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';

        this.init();
    }

    init() {
        // Add todo event listener
        document.querySelector('#addTodoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Filter event listeners
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentFilter = btn.dataset.filter;
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderTodos();
            });
        });

        // Initial render
        this.renderTodos();
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        const priority = this.prioritySelect.value;

        if (text) {
            const todo = {
                id: Date.now(),
                text,
                priority,
                completed: false,
                createdAt: new Date()
            };

            this.todos.push(todo);
            this.saveTodos();
            this.todoInput.value = '';
            this.renderTodos();
        }
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        this.saveTodos();
        this.renderTodos();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.renderTodos();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    getPriorityEmoji(priority) {
        switch (priority) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '';
        }
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <span class="priority-indicator">${this.getPriorityEmoji(todo.priority)}</span>
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="btn-toggle" onclick="todoApp.toggleTodo(${todo.id})">
                        ${todo.completed ? '↩️' : '✅'}
                    </button>
                    <button class="btn-delete" onclick="todoApp.deleteTodo(${todo.id})">🗑️</button>
                </div>
            `;

            this.todoList.appendChild(li);
        });
    }
}

// Initialize Todo App
const todoApp = new TodoApp(); 