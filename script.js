let notes = JSON.parse(localStorage.getItem("notes")) || [];

window.onload = function () {
    renderNotes();

    document.getElementById("noteInput").addEventListener("input", autoSaveDraft);

    let draft = localStorage.getItem("draft");
    if (draft) {
        document.getElementById("noteInput").value = draft;
    }
};

// Save note
function saveNote() {
    let input = document.getElementById("noteInput");

    if (input.value.trim() === "") return;

    notes.push(input.value);

    input.value = "";
    localStorage.removeItem("draft");

    saveToLocal();
    renderNotes();
}

// Auto save
function autoSaveDraft() {
    let value = document.getElementById("noteInput").value;
    localStorage.setItem("draft", value);
}

// Render
function renderNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach((note, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <div>${note}</div>
            <div class="actions">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Delete
function deleteNote(index) {
    notes.splice(index, 1);
    saveToLocal();
    renderNotes();
}

// ✅ Edit (main feature)
function editNote(index) {
    let newText = prompt("Edit your note:", notes[index]);

    if (newText !== null && newText.trim() !== "") {
        notes[index] = newText;
        saveToLocal();
        renderNotes();
    }
}

// Save
function saveToLocal() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
