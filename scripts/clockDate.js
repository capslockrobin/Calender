//Sets the current date and displays clock on the page

//Todays date
function setTodaysDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("todaysDate").innerText = new Date().toLocaleString("se-SE", options).toUpperCase();
}

//Clock
function clockTime() {
    const time = new Date().toLocaleTimeString();
    document.getElementById('clock').innerText = time;
}

function startClock() {
    clockTime();
    setInterval(clockTime, 1000);
}