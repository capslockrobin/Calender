window.addEventListener('load', main);

function main() {
    setTodaysDate();
    clockTime();
}

function setTodaysDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("todaysDate").innerText = new Date().toLocaleString("se-SE", options).toUpperCase();
}

function clockTime() {

    var time = new Date().toLocaleTimeString();
    document.getElementById('clock').innerText = time;
    setTimeout(clockTime, 1000);
}



function processFormData(){

    if(validateForm()){
         let todo = document.getElementById('todo');
        let newTodo = todo.value;
        let start = document.getElementById('start');
        let newStart = start.value;
        let end = document.getElementById('end');
        let newEnd = end.value;
        // let dateOf = document.getElementById('dateOf');
        // let newdateOf = dateOf.value;

        let newT = {
            todo: newTodo,
            start: newStart,
            end: newEnd,
            // dateOf: newdateOf
        };
        todos.push(newT);
        console.log(todos);

        toggleForm();
    }

   

}

function toggleForm(){
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

const todos = [
    { todo: "bajsa", start: '09:00', end: '17:00', dateOf: "2021-06-20" },
    { todo: "äta", start: '09:00', end: '17:00', dateOf: "2021-06-20" },
    { todo: "sova", start: '09:00', end: '17:00', dateOf: "2021-06-20" },
];