let dateNow;

function processFormData() {

    if (validateForm()) {
        let todo = document.getElementById('todo');
        let newTodo = todo.value;
        let start = document.getElementById('start');
        let newStart = start.value;
        let end = document.getElementById('end');
        let newEnd = end.value;

        let newT = {
            todo: newTodo,
            start: newStart,
            end: newEnd,
            dateOf: dateNow,
        };
        todos.push(newT);
        console.log(todos);
        filterListBasedOnDate();
        toggleForm();
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
const todos = [
    { todo: "bajsa", start: '09:00', end: '17:00', dateOf: new Date() },
    { todo: "äta", start: '09:00', end: '17:00', dateOf: new Date() },
    { todo: "sova", start: '09:00', end: '17:00', dateOf: new Date() },
];



document.addEventListener('click', dateNowOnClick);
let date = new Date();
let date2 = date;

window.onload = function() {
    date = new Date();
    dateNow = date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("tasklist-date").innerText = date.toLocaleString("se-SE", options).toUpperCase();
    dateNowOnClick();
    filterListBasedOnDate();
}

function dateNowOnClick() {


        var e = window.event;
        date = new Date(e.toElement.id);
        date2 = (date == "Invalid Date" || date == "undefined") ? date2 : date;

        console.log(date2);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("tasklist-date").innerText = date2.toLocaleString("se-SE", options).toUpperCase();
        dateNow = date2;
        filterListBasedOnDate();
    
}

function filterListBasedOnDate(){
    dayTodos = todos.map(x => {
        if(x.dateOf.toDateString() == dateNow.toDateString())
        {
            return x;
        }
    });
    console.log(dayTodos);
  
    let oldDayTodos = document.getElementById("todo-list-pop");
    oldDayTodos.textContent = "";

    for(var i = 0; i < dayTodos.length; i++) {
        var li = document.createElement("li");
        if(typeof dayTodos[i] !== 'undefined'){
            // li.innerText = dayTodos[i].todo;
            // console.log(li);

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
            
            //Each element needs modifying
            
            editInput.type = "text";
            
            editButton.innerText = "Edit";
            editButton.className = "edit";
            deleteButton.innerText = "Delete";
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