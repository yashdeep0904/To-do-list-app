// State management
let tasks = [];

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Initialize the app
function init() {
    // Persist and retrieve structured task items across browser sessions using window.localStorage.
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CREATE: Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// UPDATE: Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// DELETE: Remove a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// UPDATE: Edit a task
function editTask(id, liElement, currentText) {
    // Create inline editing UI
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'action-btn save-btn';
    
    saveBtn.onclick = () => {
        const newText = input.value.trim();
        if (newText) {
            tasks = tasks.map(task => 
                task.id === id ? { ...task, text: newText } : task
            );
            saveTasks();
            renderTasks();
        }
    };

    // Clear li and append edit UI
    liElement.innerHTML = '';
    liElement.appendChild(input);
    liElement.appendChild(saveBtn);
    input.focus();
}

// READ: Render tasks dynamically
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);

        // Task Text
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-btn edit-btn';
        editBtn.onclick = () => editTask(task.id, li, task.text);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Boot up the application
init();