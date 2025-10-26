class Todo {
    constructor() {
        this.tasks = []; 
        this.term = ''; 

        this.taskList = document.getElementById('taskList');
        this.searchInput = document.getElementById('searchInput');
        this.newTaskInput = document.getElementById('newTaskInput');
        this.newTaskDate = document.getElementById('newTaskDate');
        this.addTaskBtn = document.getElementById('addTaskBtn');

        this.loadFromLocalStorage();

        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.searchInput.addEventListener('input', (e) => {
            this.term = e.target.value.trim();
            if (this.term.length < 2) this.term = ''; 
            this.draw();
        });

        this.taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('task-text')) {
                this.startEditText(e.target);
            } else if (e.target.classList.contains('task-date')) {
                this.startEditDate(e.target);
            } else if (e.target.classList.contains('delete-btn')) {
                const index = parseInt(e.target.dataset.index);
                this.removeTask(index);
            } else if (e.target.classList.contains('task-checkbox')) {
                const index = parseInt(e.target.dataset.index);
                this.toggleComplete(index);
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.edit-input') && !e.target.closest('.edit-date-input') && 
                !e.target.classList.contains('task-text') && !e.target.classList.contains('task-date')) {
                this.saveAllEdits();
            }
        });

        this.draw();
    }
   
    draw() {
        this.taskList.innerHTML = '';
        const filteredTasks = this.getFilteredTasks();

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.dataset.index = index;
            checkbox.checked = task.completed || false;

            const textSpan = document.createElement('span');
            textSpan.classList.add('task-text');
            if (task.completed) textSpan.classList.add('completed');
            textSpan.dataset.index = index; 
            let displayText = task.text;
            if (this.term) {
                const regex = new RegExp(this.term, 'gi');
                displayText = displayText.replace(regex, `<span class="highlight">${this.term}</span>`);
            }
            textSpan.innerHTML = displayText;

            const dateSpan = document.createElement('span');
            dateSpan.classList.add('task-date');
            dateSpan.dataset.index = index;
            dateSpan.textContent = task.date ? `(Termin: ${new Date(task.date).toLocaleString()})` : '(Brak terminu)';

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.dataset.index = index; 

            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(dateSpan);
            li.appendChild(deleteBtn);
            this.taskList.appendChild(li);
        });
    }

    getFilteredTasks() {
        if (!this.term) return this.tasks;
        return this.tasks.filter(task => task.text.toLowerCase().includes(this.term.toLowerCase()));
    }

    addTask() {
        const text = this.newTaskInput.value.trim();
        const date = this.newTaskDate.value; 

        if (text.length < 3 || text.length > 255) {
            alert('Zadanie musi mieć 3-255 znaków!');
            return;
        }
        if (date && new Date(date) <= new Date()) {
            alert('Data musi być w przyszłości lub pusta!');
            return;
        }

        this.tasks.push({ text, date: date || null, completed: false });
        this.saveToLocalStorage();
        this.draw();
        this.newTaskInput.value = '';
        this.newTaskDate.value = '';
    }

    removeTask(index) {
        if (isNaN(index) || index < 0 || index >= this.tasks.length) {
            return;
        }
        this.tasks.splice(index, 1);
        this.saveToLocalStorage();
        this.draw();
    }

    toggleComplete(index) {
        if (isNaN(index) || index < 0 || index >= this.tasks.length) {
            return;
        }
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveToLocalStorage();
        this.draw();
    }

    startEditText(span) {
        const index = parseInt(span.dataset.index);
        if (isNaN(index) || index < 0 || index >= this.tasks.length) {
            return;
        }
        const input = document.createElement('input');
        input.classList.add('edit-input');
        input.value = this.tasks[index].text;
        input.dataset.index = index;
        span.replaceWith(input);
        input.focus();
    }

    startEditDate(span) {
        const index = parseInt(span.dataset.index);
        if (isNaN(index) || index < 0 || index >= this.tasks.length) {
            return;
        }
        const input = document.createElement('input');
        input.type = 'datetime-local';
        input.classList.add('edit-date-input');
        input.value = this.tasks[index].date || '';
        input.dataset.index = index;
        span.replaceWith(input);
        input.focus();
    }

    saveAllEdits() {
        const textEdits = this.taskList.querySelectorAll('.edit-input');
        textEdits.forEach(input => {
            const index = parseInt(input.dataset.index);
            if (isNaN(index) || index < 0 || index >= this.tasks.length) {
                return;
            }
            const newText = input.value.trim();
            if (newText.length >= 3 && newText.length <= 255) {
                this.tasks[index].text = newText;
            } else {
                alert('Edytowane zadanie musi mieć 3-255 znaków!');
            }
            const span = document.createElement('span');
            span.classList.add('task-text');
            if (this.tasks[index].completed) span.classList.add('completed');
            span.dataset.index = index;
            span.textContent = this.tasks[index].text;
            input.replaceWith(span);
        });

        const dateEdits = this.taskList.querySelectorAll('.edit-date-input');
        dateEdits.forEach(input => {
            const index = parseInt(input.dataset.index);
            if (isNaN(index) || index < 0 || index >= this.tasks.length) {
                return;
            }
            const newDate = input.value;
            if (newDate && new Date(newDate) <= new Date()) {
                alert('Edytowana data musi być w przyszłości lub pusta!');
                return;
            }
            this.tasks[index].date = newDate || null;
            const span = document.createElement('span');
            span.classList.add('task-date');
            span.dataset.index = index;
            span.textContent = this.tasks[index].date ? `(Termin: ${new Date(this.tasks[index].date).toLocaleString()})` : '(Brak terminu)';
            input.replaceWith(span);
        });

        this.saveToLocalStorage();
        this.draw(); 
    }

    saveToLocalStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('todoTasks');
        if (saved) {
            this.tasks = JSON.parse(saved);
        }
    }
}

const todoApp = new Todo();