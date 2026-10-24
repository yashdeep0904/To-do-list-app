let tasks = [];

// Soft color themes for tasks
const colorThemes = [
    { bg: 'linear-gradient(135deg, #a8e0ff, #8fd3f4)', shadow: '#6ba7c7' }, // Blue
    { bg: 'linear-gradient(135deg, #ffc4cf, #ff8fa3)', shadow: '#d16b7e' }, // Pink
    { bg: 'linear-gradient(135deg, #ffd3b6, #ffb88c)', shadow: '#cc8e66' }, // Orange
    { bg: 'linear-gradient(135deg, #ffffff, #f0f3fa)', shadow: '#cbd4e6' }  // White/Default
];

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Initialize the app
function init() {
    const storedTasks = localStorage.getItem('tasks_3d');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks).map(task => {
            if (!task.createdAt) task.createdAt = getCurrentTime();
            if (!task.themeIndex) task.themeIndex = Math.floor(Math.random() * colorThemes.length);
            return task;
        });
        saveTasks();
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks_3d', JSON.stringify(tasks));
}

// Add Task
function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.unshift({
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: getCurrentTime(),
            themeIndex: Math.floor(Math.random() * colorThemes.length)
        });
        
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

// Toggle Task
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Edit Task
function editTask(id, liElement, currentText) {
    liElement.innerHTML = ''; 

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'input-field';
    input.style.flex = '1';
    input.style.padding = '8px 12px';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'btn btn--primary';
    saveBtn.style.padding = '0 16px';
    
    saveBtn.onclick = () => {
        const newText = input.value.trim();
        if (newText) {
            tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
            saveTasks();
            renderTasks();
        }
    };

    liElement.appendChild(input);
    liElement.appendChild(saveBtn);
    input.focus();
}

// Render UI
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'task-item--completed' : ''}`;
        
        const theme = colorThemes[task.themeIndex] || colorThemes[3];
        li.style.setProperty('--item-bg', theme.bg);
        li.style.setProperty('--item-shadow', theme.shadow);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-item__checkbox';
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(task.id);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-item__content';

        const textSpan = document.createElement('span');
        textSpan.className = 'task-item__text';
        textSpan.textContent = task.text;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'task-item__time';
        timeSpan.textContent = task.createdAt; 

        contentDiv.appendChild(textSpan);
        contentDiv.appendChild(timeSpan);

        // Action Buttons Wrapper
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-item__actions';

        // View Button
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'View';
        viewBtn.className = 'btn-action btn-action--view';
        viewBtn.onclick = () => alert(`📌 Task: ${task.text}\n🕒 Added at: ${task.createdAt}\n✅ Status: ${task.completed ? 'Completed' : 'Active'}`);

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'btn-action btn-action--edit';
        editBtn.onclick = () => editTask(task.id, li, task.text);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn-action btn-action--delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        actionsDiv.appendChild(viewBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(contentDiv);
        li.appendChild(actionsDiv);

        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Boot up
init();