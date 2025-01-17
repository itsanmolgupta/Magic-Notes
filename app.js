console.log("Welcome to Magic Notes app.")
showNotes();
// If users adds a note add it to a local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click",function(e){
    let addTxt = document.getElementById("addTxt");
    let noteTitle = document.getElementById("noteTitle");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : noteTitle.value,
        text : addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    noteTitle.value = "";
    addTxt.value = "";
    showNotes();
})

// function to show notes from local storage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
        <div class="noteCard card mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" title="Delete Note">Delete Note</button>
        </div>
    </div>
    `

    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`
    }
}

// function to delete a note
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}
// function to search a note
let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none";
        }
    })
})