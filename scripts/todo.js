

let dateNow;

function processFormData() {

    if (validateForm()) {
        let todo = document.getElementById('todo');
        let newTodo = todo.value;
        let start = document.getElementById('start');
        let newStart = start.value;
        let end = document.getElementById('end');
        let newEnd = end.value;

        let newT = 
            {
                Id: todos.length,
                todo: newTodo,
                start: newStart,
                end: newEnd,
                dateOf: dateNow,
            }
        
        todos.push(newT);
        console.log(todos);
        filterListBasedOnDate();
        toggleForm();

        saveToLocalStorage(todos);
            
    }
}

function toggleForm() {
    var frm_element = document.getElementById('add-todo');

    var vis = frm_element.style;

    if (vis.display == '' || vis.display == 'none') {
        vis.display = 'block';
    } else {
        vis.display = 'none';
    }
}

function validateForm() {
    var x = document.forms["add-todo"]["todo"].value;
    let start = document.forms["add-todo"]["start"].value;
    let end = document.forms["add-todo"]["end"].value;
    if (x == "" || start == "" || end == "") {
        alert("Fyll i alla värden i din todo!");
        return false;
    } else {
        return true;
    }
}

let dayTodos;
let todos = [ ];



document.addEventListener('click', dateNowOnClick);
let date = new Date();
let date2 = date;

window.onload = function() {
    date = new Date();
    dateNow = date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("tasklist-date").innerText = date.toLocaleString("se-SE", options).toUpperCase();
    dateNowOnClick();
    initTodos();
    filterListBasedOnDate();
}

function dateNowOnClick() {
    document.getElementById("calDays").onclick = function(e) {
        var e = window.event;
        console.log(e);
        date = new Date(e.toElement.id);
        date2 = (date == "Invalid Date" || date == "undefined") ? date2 : date;

        console.log(date2);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("tasklist-date").innerText = date2.toLocaleString("se-SE", options).toUpperCase();

        if (e.target.childElementCount > 0) {
            document.getElementById("tasklist-date").innerText =
                date2.toLocaleString("se-SE", options).toUpperCase() + " " + e.target.children[0].innerText;
        }

        dateNow = date2;

        filterListBasedOnDate();
    }
}

function filterListBasedOnDate() {

    dayTodos = todos.map(x => {
        {
            let todoDate = new Date(x.dateOf);
           
            if(todoDate.toDateString() == dateNow.toDateString())
                {
                    return x;
                }          
        }
    });

    let oldDayTodos = document.getElementById("todo-list-pop");
    oldDayTodos.textContent = "";

    for (var i = 0; i < dayTodos.length; i++) {
        var li = document.createElement("li");
        if (typeof dayTodos[i] !== 'undefined') {
 
            //Create List Item
            var listItem = document.createElement("li");

            //label
            var label = document.createElement("label");
            //input (text)
            var editInput = document.createElement("input"); // text
            //button.edit
            var editButton = document.createElement("button");
            //button.delete
            var deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", dayTodos[i].Id);
            deleteButton.addEventListener("click", deleteTodo, true);
            // deleteButton.addEventListener("click", deleteTodo())
            
            //Each element needs modifying

            editInput.type = "text";

            editButton.innerText = "Ändra";
            editButton.className = "edit";
            deleteButton.innerText = "Ta bort";
            deleteButton.className = "delete";

            label.innerText = dayTodos[i].todo;


            listItem.appendChild(label);
            listItem.appendChild(editInput);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);

            document.getElementById("todo-list-pop").appendChild(listItem);
        }
    }
}

// let testare = document.getElementsByClassName("delete");
// testare.addEventListener("click", deleteTodo());

// let deleteButtons = document.getElementsByClassName("delete");
//     deleteButtons.forEach((deleteButton) =>
//         deleteButton.addEventListener("click", deleteTodo));

function deleteTodo(event){
    console.log(event)
    let dayId = event.target.attributes.id;
    console.log(dayId);
    todos.splice(dayId, 1);

    saveToLocalStorage(todos);
    filterListBasedOnDate();
}

function saveToLocalStorage(todos) {
    localStorage.setItem("Todo",JSON.stringify(todos))
}

function initTodos(){
    const todoString = localStorage.getItem("Todo");
    todos = JSON.parse(todoString || "[]"); 
    console.log(todos);
}

