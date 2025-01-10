// let addBtn = document.querySelector(".inButton");
// let storedNotes = document.querySelector(".storedNotes");
// let inputPrompt = document.querySelector(".noteInput");

// addBtn.addEventListener("click", function () {
//   const parentDiv = document.createElement("div");
//   parentDiv.setAttribute("class", "subs");
//   let newNote = document.createElement("div");
//   // Create a new div on each click
//   newNote.setAttribute("class", "addedNotes");
//   newNote.textContent = inputPrompt.value;
//   inputPrompt.value = null;
//   // Create a del brn on each click

//   let delBtn = document.createElement("button");
//   delBtn.setAttribute("class", "X");
//   delBtn.textContent = "X";

//   let editBtn = document.createElement("button");
//   editBtn.setAttribute("class", "editBtn");
//   editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"> </i>';

//   let updateBtn = document.querySelector(".updateBtn");

//   editBtn.addEventListener("click", function () {
//     inputPrompt.value = newNote.textContent;
//     updateBtn.addEventListener("click", function () {
//       newNote.textContent = null;
//       newNote.textContent = inputPrompt.value;
//     });
//   });

//   let checkBox = document.createElement("input");
//   checkBox.setAttribute("type", "checkbox");
//   checkBox.setAttribute("class", "chk");

//   checkBox.addEventListener("change", function () {
//     if (checkBox.checked) {
//       newNote.classList.add("line-through");
//     } else {
//       newNote.classList.remove("line-through");
//     }
//   });

//   let update;

//   parentDiv.append(checkBox, newNote, delBtn, editBtn);
//   storedNotes.append(parentDiv);

//   delBtn.addEventListener("click", function () {
//     parentDiv.remove();
//   });
// });
///************************ SECOND ITERATION *********************************** */
// let addBtn = document.querySelector(".inButton");
// let storedNotes = document.querySelector(".storedNotes");
// let inputPrompt = document.querySelector(".noteInput");
// let updateBtn = document.querySelector(".updateBtn"); // Select the update button once

// let currentEditingNote = null; // Track the note being edited

// addBtn.addEventListener("click", function () {
//   // Create parent container for the task
//   const parentDiv = document.createElement("div");
//   parentDiv.setAttribute("class", "subs");

//   // Create a new note
//   let newNote = document.createElement("div");
//   newNote.setAttribute("class", "addedNotes");
//   newNote.textContent = inputPrompt.value;
//   inputPrompt.value = null;

//   // Create a delete button
//   let delBtn = document.createElement("button");
//   delBtn.setAttribute("class", "X");
//   delBtn.textContent = "X";

//   // Create an edit button
//   let editBtn = document.createElement("button");
//   editBtn.setAttribute("class", "editBtn");
//   editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

//   // Handle edit functionality
//   editBtn.addEventListener("click", function () {
//     inputPrompt.value = newNote.textContent; // Fill input with current text
//     currentEditingNote = newNote; // Track the note being edited
//     updateBtn.style.display = "inline-block"; // Show the update button
//   });

//   // Handle update functionality
//   updateBtn.addEventListener("click", function () {
//     if (currentEditingNote) {
//       currentEditingNote.textContent = inputPrompt.value; // Update note content
//       inputPrompt.value = null; // Clear the input field
//       currentEditingNote = null; // Reset editing state
//       updateBtn.style.display = "none"; // Hide the update button
//     }
//   });

//   // Create a checkbox
//   let checkBox = document.createElement("input");
//   checkBox.setAttribute("type", "checkbox");
//   checkBox.setAttribute("class", "chk");

//   // Handle checkbox functionality (strike-through)
//   checkBox.addEventListener("change", function () {
//     if (checkBox.checked) {
//       newNote.classList.add("line-through");
//     } else {
//       newNote.classList.remove("line-through");
//     }
//   });

//   // Append all elements to the parent div
//   parentDiv.append(checkBox, newNote, delBtn, editBtn);
//   storedNotes.append(parentDiv);

//   // Handle delete functionality
//   delBtn.addEventListener("click", function () {
//     parentDiv.remove();
//   });
// });

let addBtn = document.querySelector(".inButton");
let storedNotes = document.querySelector(".storedNotes");
let inputPrompt = document.querySelector(".noteInput");
let updateBtn = document.querySelector(".updateBtn");

let currentEditingNote = null; // Track the currently editing note

// Load Notes from Local Storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to Save Notes to Local Storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to Render Notes
function renderNotes() {
  storedNotes.innerHTML = ""; // Clear UI before rendering
  notes.forEach((note) => {
    createNoteElement(note);
  });
}

// Function to Create a Note Element
function createNoteElement(note) {
  const parentDiv = document.createElement("div");
  parentDiv.setAttribute("class", "subs");
  parentDiv.dataset.id = note.id; // Store note ID for reference

  // Note Text
  let newNote = document.createElement("div");
  newNote.setAttribute("class", "addedNotes");
  newNote.textContent = note.content;

  // Checkbox
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "chk");
  checkBox.checked = note.checked;

  checkBox.addEventListener("change", function () {
    note.checked = checkBox.checked;
    if (checkBox.checked) {
      newNote.classList.add("line-through");
    } else {
      newNote.classList.remove("line-through");
    }
    saveNotes();
  });

  // Delete Button
  let delBtn = document.createElement("button");
  delBtn.setAttribute("class", "X");
  delBtn.textContent = "X";

  delBtn.addEventListener("click", function () {
    notes = notes.filter((n) => n.id !== note.id); // Remove from notes array
    saveNotes(); // Update local storage
    parentDiv.remove(); // Remove from DOM
  });

  // Edit Button
  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "editBtn");
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

  editBtn.addEventListener("click", function () {
    inputPrompt.value = note.content; // Populate input with note content
    currentEditingNote = note; // Track the current note
    updateBtn.style.display = "inline-block"; // Show Update button
  });

  parentDiv.append(checkBox, newNote, delBtn, editBtn);
  storedNotes.append(parentDiv);
}

// Add New Note
addBtn.addEventListener("click", function () {
  if (inputPrompt.value.trim() === "") {
    alert("Please enter a note!");
    return;
  }

  let noteObj = {
    id: Date.now(), // Unique ID
    content: inputPrompt.value,
    checked: false,
  };

  notes.push(noteObj); // Add note to array
  saveNotes(); // Save to Local Storage
  createNoteElement(noteObj); // Add note to UI
  inputPrompt.value = ""; // Clear input field
});

// Update Note Event
updateBtn.addEventListener("click", function () {
  if (currentEditingNote) {
    currentEditingNote.content = inputPrompt.value; // Update the content
    saveNotes(); // Save changes to Local Storage
    renderNotes(); // Refresh the UI
    inputPrompt.value = ""; // Clear input field
    currentEditingNote = null; // Reset editing state
    updateBtn.style.display = "none"; // Hide Update button
  }
});

// Load Notes on Page Load
renderNotes();

//callback promices and async awaite and fetch
