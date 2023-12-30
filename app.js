const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task !== '') {
        addTask(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
});


function addTask(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
        ${task}
        <span class="delete-btn">×</span>
    `;
    taskList.appendChild(li);
}


taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const taskItem = e.target.parentElement;
        removeTaskFromLocalStorage(taskItem);
        taskItem.remove();
    }
});


function removeTaskFromLocalStorage(taskItem) {
    const tasks = getTasksFromLocalStorage();
    const taskText = taskItem.firstChild.textContent.trim();
    tasks.splice(tasks.indexOf(taskText), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


clearBtn.addEventListener('click', function () {
    taskList.innerHTML = '';
    localStorage.clear();
});


function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        addTask(task);
    });
}


function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
