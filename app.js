const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

// Save all notes to localStorage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

// Add a new note
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
    `;

    // Add event listener for delete
    note.querySelector(".trash").addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    // Add event listener for save
    note.querySelector(".save").addEventListener("click", () => {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

// Load saved notes from localStorage or create one empty note by default
(function () {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));

    if (lsNotes && lsNotes.length > 0) {
        lsNotes.forEach((lsNote) => addNote(lsNote));
    } else {
        // Create one empty note by default
        addNote();
    }
})();

// Add note when the "Add Note" button is clicked
addBtn.addEventListener("click", () => {
    addNote();
});
