let tasks = [];
const tasklist = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('task-counter');  // Renamed variable

function addTaskToDom(task) {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}"${task.Done ? ' checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <h2 class="delete" data-id="${task.id}">Delete</h2>
    `;

    // const checkbox = li.querySelector('.custom-checkbox');  // Select the checkbox element

    // checkbox.addEventListener('change', function () {
    //     markTaskAsComplete(task.id);  // Call markTaskAsComplete when the checkbox changes
    // });

    tasklist.appendChild(li);  // Used appendChild instead of append for better performance
}

function renderList() {
    tasklist.innerHTML = '';  // Clearing innerHTML

    tasks.forEach(function(task) {
        addTaskToDom(task);
    });

    tasksCounter.textContent = tasks.length;  // Changed innerHTML to textContent for better security
}

// Inside the markTaskAsComplete function
function markTaskAsComplete(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].Done = !tasks[taskIndex].Done;
        renderList();
        showNotification('Task completed');
        
        // Add or remove 'checked' class based on task completion
        const li = document.getElementById('taskId');
        if (tasks[taskIndex].Done) {
            li.classList.add('checked');
        } else {
            li.classList.remove('checked');
        }
    } else {
        showNotification('Task not found');
    }
}


function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderList();
}

function addTask(text) {
    if (text) {
        const task = {
            text,
            id: Date.now().toString(),
            Done: false
        };
        tasks.push(task);
        showNotification('Task added');
        renderList();
    } else {
        showNotification('Task cannot be added');
    }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value.trim();  // Trim whitespace from input
        if (text === '') {
            showNotification('Task cannot be empty');
        } else {
            addTask(text);
            e.target.value = '';
        }
    }
}

tasklist.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const taskId = event.target.getAttribute('data-id');
        deleteTask(taskId);
    }
});

addTaskInput.addEventListener('keypress', handleInputKeyPress);
