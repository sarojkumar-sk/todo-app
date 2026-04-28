// 🔹 Load data
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// 🔹 Page load
window.onload = function () {
    renderNotes();

    // auto-save while typing
    document.getElementById("noteInput").addEventListener("input", autoSaveDraft);

    // load draft
    let draft = localStorage.getItem("draft");
    if (draft) {
        document.getElementById("noteInput").value = draft;
    }
};

// 🔹 Save note (button click)
function saveNote() {
    let input = document.getElementById("noteInput");

    if (input.value.trim() === "") return;

    notes.push(input.value);

    input.value = "";
    localStorage.removeItem("draft");

    saveToLocal();
    renderNotes();
}

// 🔹 Auto save draft
function autoSaveDraft() {
    let value = document.getElementById("noteInput").value;
    localStorage.setItem("draft", value);
}

// 🔹 Render notes
function renderNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach((note, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${note}
            <br>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// 🔹 Delete note
function deleteNote(index) {
    notes.splice(index, 1);
    saveToLocal();
    renderNotes();
}

// 🔹 Save to localStorage
function saveToLocal() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
