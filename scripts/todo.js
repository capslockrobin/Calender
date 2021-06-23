//Globale variables:
let dateNow = new Date(); //date set when change day
let dayTodos = []; //the specific date todos
let todos = []; //all todos from local storage
let idEdditTodo; //save id when you click on eddit
let date;
let date2;
let mobileDate;

function addChangeDayButtoms() {
    document.getElementById("next-day").addEventListener('click', nextDayButton);
    document.getElementById("last-day").addEventListener('click', previousDayButton);
}
/**
 * 
 * @param {Event} event 
 */
function processFormData(event) {
    event.preventDefault();

    if (validateForm(event)) {

        let newT = {
            Id: todos.length,
            todo: event.target.todo.value,
            start: event.target.start.value,
            end: event.target.end.value,
            dateOf: new Date(dateNow),
        }

        todos.push(newT);

        saveToLocalStorage(todos);
        filterListBasedOnDate();
        toggleForm();
        todoCountForDate();
    }
}

function addFromEventListeners() {
    const addForm = document.getElementById("add-todo");
    addForm.addEventListener("submit", processFormData);

    const edditForm = document.getElementById("eddit-todo-form");
    edditForm.addEventListener("submit", processEdditFormData)
}

function addButtomToggleEventListener() {
    const toggleButtom = document.getElementById("add-Buttom-Toogle");
    toggleButtom.addEventListener("click", toggleForm);
}

function toggleForm() {
    const frm_element = document.getElementById('add-todo');
    let vis = frm_element.style;

    if (vis.display == '' || vis.display == 'none') {
        vis.display = 'block';
    } else {
        vis.display = 'none';
    }
}

/**
 * 
 * @param {Event} event 
 * @returns 
 */
function validateForm(event) {
    let todo = event.target.todo.value;
    let start = event.target.start.value;
    let end = event.target.end.value;
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

function addDateNowEventListener() {
    document.addEventListener('click', dateNowOnClick);
}

function dateNowOnClick() {
    document.getElementById("calDays").onclick = function() {
        let e = window.event;
        date = new Date(e.toElement.id);
        date2 = (date == "Invalid Date" || date == "undefined") ? date2 : date;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("tasklist-date").innerText = date2.toLocaleString("se-SE", options).toUpperCase();

        if (!dateNow) {
            filterListBasedOnDate();
            dateNow = date2;
            return;
        }

        dateNow = date2;

        filterListBasedOnDate();
    }
}

function loadFirstDate() {
    date = new Date();
    date2 = date;
}

function setTodoListHeaderDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("tasklist-date").innerText = date.toLocaleString("se-SE", options).toUpperCase();
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

    let oldDayTodos = document.getElementById("todo-list-pop");
    oldDayTodos.textContent = "";

    for (let i = 0; i < dayTodos.length; i++) {
        if (typeof dayTodos[i] !== 'undefined') {
            //Create List Item
            let listItem = document.createElement("li");
            let divStartEnd = document.createElement("div");
            let divChangeDeleteBtn = document.createElement("div");

            let divTodo = document.createElement("div");
            let label = document.createElement("label");
            let startTime = document.createElement("span");
            let endTime = document.createElement("span");

            //button.edit
            let editButton = document.createElement("button");
            editButton.setAttribute("id", dayTodos[i].Id);
            editButton.addEventListener("click", edditTodo, true);

            //button.delete
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", dayTodos[i].Id);
            deleteButton.addEventListener("click", deleteTodo, true);

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
    let item = todos.find(x => x.Id == dayId);
    let index = todos.findIndex(element => element == item);

    todos.splice(index, 1);
    saveToLocalStorage(todos);
    filterListBasedOnDate();
    todoCountForDate();
}

function todoCountForDate() {
    const elements = document.getElementsByClassName("todo-count");
    if (elements.length == 1) {
        while (elements.length > 0) elements[0].remove();
    }
    const options2 = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    //removing old elements to recount
    todos.forEach(x => {
        dates.forEach(y => {
            let todoDate = new Date(x.dateOf);
            if (todoDate.toDateString() == y.toDateString()) {
                let dateId = new Date(y).toLocaleString("se-SE", options2);
                let thisDay = document.getElementById(dateId);
                if (!thisDay) {
                    return;
                }

                const elements = document.getElementsByClassName("todo-count");
                while (elements.length > 0) elements[0].remove();

                thisDay.classList.remove("has-todos");
            }
        })
    })


    //adding 
    todos.forEach(x => {
        dates.forEach(y => {
            let todoDate = new Date(x.dateOf);
            if (todoDate.toDateString() == y.toDateString()) {
                let result = todos.filter((x) => new Date(x.dateOf).toDateString() == y.toDateString());

                let dateId = new Date(y).toLocaleString("se-SE", options2);
                let thisDay = document.getElementById(dateId);
                if (!thisDay) {
                    return;
                }

                if (!thisDay.classList.contains("has-todos")) {
                    let todoCount = document.createElement("p");
                    todoCount.className = "todo-count";
                    todoCount.innerText = "";
                    todoCount.innerText = result.length;
                    thisDay.classList.add("has-todos");
                    thisDay.appendChild(todoCount);
                }
            }
        })
    })
}

function edditTodo(event) {
    toggleEdditForm();
    idEdditTodo = event.target.attributes.id.textContent;
}

function toggleEdditForm() {
    let frm_element = document.getElementById('eddit-todo-form');
    let vis = frm_element.style;
    if (vis.display == '' || vis.display == 'none') {
        vis.display = 'block';
    } else {
        vis.display = 'none';
    }
}

/**
 * 
 * @param {Event} event 
 */
function processEdditFormData(event) {
    event.preventDefault();
    if (validateEditForm(event)) {
        const newTodo = event.target.edditTodo.value;
        const newStart = event.target.edditStart.value;
        const newEnd = event.target.edditEnd.value;

        todos.forEach(element => {
            if (idEdditTodo == element.Id) {
                element.todo = newTodo;
                element.start = newStart;
                element.end = newEnd;
            }
        });

        filterListBasedOnDate();
        toggleEdditForm();
        saveToLocalStorage(todos);
    }
}

/**
 * 
 * @param {Event} event 
 * @returns 
 */
function validateEditForm(event) {
    const todo = event.target.edditTodo.value;
    const start = event.target.edditStart.value;
    const end = event.target.edditEnd.value;
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

function nextDayButton() {
    dateNow.setDate(dateNow.getDate() + 1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("tasklist-date").innerText = dateNow.toLocaleString("se-SE", options).toUpperCase();

    let activeHtml = document.getElementsByClassName("active-day");
    let oldActiveDay;
    for (let i = 0, n = activeHtml.length; i < n; ++i) {
        oldActiveDay = activeHtml[i].id;
    }

    let activeMonth = new Date(oldActiveDay).getMonth();
    let activeYear = new Date(oldActiveDay).getFullYear();
    let dayCount = new Date(activeYear, (activeMonth + 1), 0).getDate();

    const options2 = { year: "numeric", month: "numeric", day: "numeric" };
    let id = dateNow.toLocaleString("se-SE", options2);

    filterListBasedOnDate();

    if (oldActiveDay.includes(dayCount)) {

        document.getElementsByClassName("dropdown-item")[activeMonth + 1].click();
        document.getElementById(id).classList.add("active-day");
        let monthList = document.getElementById("months");
        monthList.style.display = "none";
        return;
    }

    document.getElementById(oldActiveDay).classList.remove("active-day");
    document.getElementById(oldActiveDay).nextElementSibling.classList.add("active-day");
    mobileDate = new Date(oldActiveDay);
    mobileDate.setDate(mobileDate.getDate() + 1)

}

function previousDayButton() {
    dateNow.setDate(dateNow.getDate() - 1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("tasklist-date").innerText = dateNow.toLocaleString("se-SE", options).toUpperCase();

    let activeHtml = document.getElementsByClassName("active-day");
    let oldActiveDay;
    for (let i = 0, n = activeHtml.length; i < n; ++i) {
        oldActiveDay = activeHtml[i].id;
    }

    let activeMonth = dateNow.getMonth();
    const options2 = { year: "numeric", month: "numeric", day: "numeric" };
    let id = dateNow.toLocaleString("se-SE", options2);

    filterListBasedOnDate();

    if (oldActiveDay.includes("01")) {
        document.getElementsByClassName("dropdown-item")[activeMonth].click();
        document.getElementById(id).classList.add("active-day");
        let monthList = document.getElementById("months");
        monthList.style.display = "none";
        return;
    }
    
    document.getElementById(oldActiveDay).previousElementSibling.classList.add("active-day");
    document.getElementById(oldActiveDay).classList.remove("active-day");
    mobileDate = new Date(oldActiveDay);
    mobileDate.setDate(mobileDate.getDate() - 1);
}