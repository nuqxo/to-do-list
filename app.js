const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task
addBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({text, done: false});
    taskInput.value = "";
    saveAndRender();
};

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task" + (task.done ? " done" : "");
        li.innerHTML = `
            <span onclick="toggle(${index})">${task.text}</span>
            <span class="delete" onclick="removeTask(${index})">✖</span>
        `;
        taskList.appendChild(li);
    });
}

// Mark as completed
function toggle(index) {
    tasks[index].done = !tasks[index].done;
    saveAndRender();
}

// Remove task
function removeTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Save to localStorage
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
