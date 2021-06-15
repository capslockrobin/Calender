// window.addEventListener('load', main);

// function main() {
//     setTodaysDate();
//     clockTime();
// }

function setTodaysDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("todaysDate").innerText = new Date().toLocaleString("se-SE", options).toUpperCase();
}

function clockTime() {

    var time = new Date().toLocaleTimeString();
    document.getElementById('clock').innerText = time;
    setTimeout(clockTime, 1000);
}