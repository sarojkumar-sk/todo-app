// 🔹 Global array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🔹 Page load hote hi render
window.onload = function () {
    renderTasks();
};

// 🔹 Add Task
function addTask() {
    let input = document.getElementById("taskInput");
    let category = document.getElementById("category").value;

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        category: category
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

// 🔹 Render Tasks (screen par dikhana)
function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${task.text} (${task.category})
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// 🔹 Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// 🔹 Edit Task
function editTask(index) {
    let newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

// 🔹 Save in LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
