// 🔹 Page load par saved tasks load karo
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        createTask(task);
    });
}

// 🔹 Task create karne ka function
function createTask(taskText) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = taskText;

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    // ✏️ Edit / Save functionality
    editBtn.onclick = function () {
        if (editBtn.innerText === "Edit") {
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.value = span.innerText;

            li.replaceChild(newInput, span);
            editBtn.innerText = "Save";

            // Enter press = Save
            newInput.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    editBtn.click();
                }
            });

        } else {
            let newSpan = document.createElement("span");
            let newInput = li.querySelector("input");

            newSpan.innerText = newInput.value;

            li.replaceChild(newSpan, newInput);
            span = newSpan;
            editBtn.innerText = "Edit";

            updateLocalStorage(); // 🔥 save after edit
        }
    };

    // 🗑 Delete functionality
    deleteBtn.onclick = function () {
        li.remove();
        updateLocalStorage(); // 🔥 save after delete
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

// ➕ Add new task
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    createTask(task);      // task create
    updateLocalStorage();  // 🔥 save

    input.value = "";
}

// 💾 Local Storage update
function updateLocalStorage() {
    let tasks = [];
    let listItems = document.querySelectorAll("#taskList li");

    listItems.forEach(function(li) {
        let text = li.innerText
            .replace("Edit", "")
            .replace("Delete", "")
            .trim();
        tasks.push(text);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ⌨️ Enter key = Add task
document.getElementById("taskInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// 🔄 Page load par tasks load karo
loadTasks();