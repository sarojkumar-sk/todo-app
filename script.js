let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${task.text}
        <span class="tag ${task.category.toLowerCase()}">${task.category}</span>
      </span>

      <span class="actions">
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </span>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let category = document.getElementById("category").value;

  if (input.value === "") return;

  tasks.push({
    text: input.value,
    category: category
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

// Load tasks on start
renderTasks();
