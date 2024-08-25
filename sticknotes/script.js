const noteText = document.getElementById("note-text");
const addNoteBtn = document.getElementById("addnote");
const noteContainer = document.getElementById("container");
const newNoteText = document.getElementById("new-note-text");


function addCloseEventListener(button, note){
    button.addEventListener("click" , ()=>{
        noteContainer.removeChild(note)
    })
}

//adding event listener to existing elemetns
document.querySelectorAll(".close").forEach(button =>{
    const note = button.parentElement;
    addCloseEventListener(button, note)
})

addNoteBtn.addEventListener("click", () => {

    let tempNode = document.createElement("div");
    tempNode.classList.add("note");

    let tempP = document.createElement("p");
    tempP.innerText = newNoteText.value;
    tempNode.appendChild(tempP); //flush the value in textarea
    newNoteText.value = "";

    let tempCloseBtn = document.createElement("button");
    tempCloseBtn.innerText = "X";
    tempCloseBtn.classList.add("close");
    tempNode.appendChild(tempCloseBtn);

    // Add event listener to the close button
    addCloseEventListener(tempCloseBtn, tempNode);

    noteContainer.appendChild(tempNode);
});

