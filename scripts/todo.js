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
        todoCountForDate();


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
    var todo = document.forms["add-todo"]["todo"].value;
    let start = document.forms["add-todo"]["start"].value;
    let end = document.forms["add-todo"]["end"].value;
    if (todo == "" || start == "" || end == "") {
        alert("Fyll i alla värden i din todo!");
        return false;
    } else if (start > end) {
        alert("Du kan inte ha en tidigare sluttid än starttid");
        return false;
    } else {
        return true;
    }
}

let dayTodos;
let todos = [];



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
    todoCountForDate();
}

function dateNowOnClick() {
    document.getElementById("calDays").onclick = function() {
        var e = window.event;
        date = new Date(e.toElement.id);
        date2 = (date == "Invalid Date" || date == "undefined") ? date2 : date;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("tasklist-date").innerText = date2.toLocaleString("se-SE", options).toUpperCase();

        if (e.target.childElementCount > 0) {
            document.getElementById("tasklist-date").innerText =
                date2.toLocaleString("se-SE", options).toUpperCase() + " " + e.target.children[0].innerText;
        }

        if (!dateNow) {
            filterListBasedOnDate();
            dateNow = date2;
            return;
        }

        dateNow = date2;
        filterListBasedOnDate();
    }
}

function filterListBasedOnDate() {

    dayTodos = todos.filter(x => {
        {
            let todoDate = new Date(x.dateOf);
            if (!dateNow) {
                x = null;
                return x;
            }
            if (todoDate.toDateString() == dateNow.toDateString()) {
                return x;
            }
        }
    });

    console.log(dayTodos);

    dayTodos.sort((a, b) => {
        let aString = a.start.replace(':', '.');
        let bString = b.start.replace(':', '.');

        let aTime = parseFloat(aString);
        let bTime = parseFloat(bString);

        if (aTime > bTime) {
            return 1;
        }
        if (aTime < bTime) {
            return -1;
        }
        return 0;
    });

    console.log(dayTodos);

    let oldDayTodos = document.getElementById("todo-list-pop");
    oldDayTodos.textContent = "";

    for (var i = 0; i < dayTodos.length; i++) {
        // var li = document.createElement("li");
        if (typeof dayTodos[i] !== 'undefined') {
            //Create List Item
            var listItem = document.createElement("li");
            var divStartEnd = document.createElement("div");
            var divChangeDeleteBtn = document.createElement("div");
            //label
            var divTodo = document.createElement("div");
            var label = document.createElement("label");
            var startTime = document.createElement("span");
            var endTime = document.createElement("span");
            //input (text)
            var editInput = document.createElement("input"); // text

            //button.edit
            var editButton = document.createElement("button");
            editButton.setAttribute("id", dayTodos[i].Id);
            editButton.addEventListener("click", edditTodo, true);
            //button.delete
            var deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", dayTodos[i].Id);
            deleteButton.addEventListener("click", deleteTodo, true);

            //Each element needs modifying

            // editInput.type = "text";
            divStartEnd.className = "divStartEnd";
            divChangeDeleteBtn.className = "divChangeDeleteBtn";

            editButton.innerText = "Ändra";
            editButton.className = "edit";
            deleteButton.innerText = "Ta bort";
            deleteButton.className = "delete";


            divTodo.className = "divTodo";
            label.innerText = "todo: " + dayTodos[i].todo;
            label.className = "todo";
            startTime.innerText = "Startar " + dayTodos[i].start;
            startTime.className = "startTid";
            endTime.innerText = "Slutar " + dayTodos[i].end;
            endTime.className = "slutTid";

            divTodo.appendChild(label);

            divStartEnd.appendChild(startTime);
            divStartEnd.appendChild(endTime);

            // divChangeDeleteBtn.appendChild(editInput);
            divChangeDeleteBtn.appendChild(editButton);
            divChangeDeleteBtn.appendChild(deleteButton);

            listItem.appendChild(divTodo);
            listItem.appendChild(divStartEnd);
            listItem.appendChild(divChangeDeleteBtn);

            document.getElementById("todo-list-pop").appendChild(listItem);
        }
    }
}

function deleteTodo(event) {
    let dayId = event.target.attributes.id.textContent;
    var item = todos.find(x => x.Id == dayId);
    var index = todos.findIndex(element => element == item);

    todos.splice(index, 1);
    saveToLocalStorage(todos);
    filterListBasedOnDate();
}

function todoCountForDate() {
    let dateArr = [];
    let thisDayTodos = todos.filter((x) => {
        {
            dates.forEach(element => {

                let todoDate = new Date(x.dateOf);
                if (todoDate.toDateString() == element.toDateString()) {
                    dateArr.push(element);
                }
            });
        }
    });

    const options2 = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    let hasTodos = false;
    todos.forEach((x) => {
        dates.forEach((element) => {
            let todoDate = new Date(x.dateOf);

            if (todoDate.toDateString() == element.toDateString()) {
                let result = dateArr.filter((x) => x.toDateString() == element.toDateString());

                result.forEach((dateTodo) => {
                    if (dateTodo.toDateString() == element.toDateString()) {
                        let random = new Date(element).toLocaleString("se-SE", options2);
                        let thisDay = document.getElementById(random);
                        let test = document.createElement("p");

                        test.className = "todo-count";
                        // test.innerText = result.length;
                        // if (thisDay.childElementCount > 0) {
                        //     return;
                        // }
                        console.log(thisDay.childElementCount);
                        console.log(result.length);
                        if (thisDay.classList.contains("has-todos")) {
                            hasTodos = true;
                        }

                        if (!hasTodos) {
                            hasTodos = true;

                            test.innerText = "";
                            test.innerText =
                                result.length;
                            thisDay.classList.add("has-todos");
                            thisDay.appendChild(test);
                        }

                        hasTodos = false;

                        test.innerText = "";
                        test.innerText = result.length;
                        thisDay.classList.add("has-todos");
                        thisDay.appendChild(test);
                    }
                });

                // console.log(thisDay);
            }
        });
    });
}

let idEdditTodo;
let indexToChange;

function edditTodo(event) {
    console.log("najs");
    toggleEdditForm();
    idEdditTodo = event.target.attributes.id.textContent;
    var item = todos.find(x => x.Id == idEdditTodo);
    indexToChange = todos.findIndex(element => element == item);
}

function toggleEdditForm() {
    var frm_element = document.getElementById('eddit-todo-form');

    var vis = frm_element.style;

    if (vis.display == '' || vis.display == 'none') {
        vis.display = 'block';
    } else {
        vis.display = 'none';
    }
}

function processEdditFormData() {
    if (validateEditForm()) {
        let todo = document.getElementById("eddit-todo");
        let newTodo = todo.value;
        let start = document.getElementById("eddit-start");
        let newStart = start.value;
        let end = document.getElementById("eddit-end");
        let newEnd = end.value;

        todos.forEach(element => {
            console.log("editing" + element.Id);
            if (idEdditTodo == element.Id) {
                element.todo = newTodo;
                element.start = newStart;
                element.end = newEnd;
            }
        });
        console.log(todos);
        filterListBasedOnDate();
        toggleEdditForm();

        saveToLocalStorage(todos);
    }
}

function validateEditForm() {
    var todo = document.forms["eddit-todo-form"]["eddit-todo"].value;
    let start = document.forms["eddit-todo-form"]["eddit-start"].value;
    let end = document.forms["eddit-todo-form"]["eddit-end"].value;
    if (todo == "" || start == "" || end == "") {
        alert("Fyll i alla värden i din todo!");
        return false;
    } else if (start > end) {
        alert("Du kan inte ha en tidigare sluttid än starttid");
        return false;
    } else {
        return true;
    }
}


function saveToLocalStorage(todos) {
    localStorage.setItem("Todo", JSON.stringify(todos))
}

function initTodos() {
    const todoString = localStorage.getItem("Todo");
    todos = JSON.parse(todoString || "[]");
}