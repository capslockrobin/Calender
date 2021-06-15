// window.addEventListener("load", main);

// function main() {
//     let divs = document.querySelectorAll(".day");
//     divs.forEach((el) =>
//         el.addEventListener("click", activeDay));
//     setActiveDayOnLoad();
// }

let id;
let id2;

// function activeDay() {
//     if (id === "" || id === null) {
//         id = window.event.toElement.id;
//         let day = document.getElementById(id);

//         if (!day || !day.classList.contains("day")) {
//             return;
//         }

//         document.getElementById(id).classList.add("active-day");
//         return;
//     }

//     if (window.event.toElement.id && id !== window.event.toElement.id) {
//         document.getElementById(id).classList.remove("active-day");
//     }
//     if (!window.event.toElement.id) {
//         return;
//     }

//     id = window.event.toElement.id;

//     document.getElementById(id).classList.add("active-day");
// }

function activeDay(e) {
    if (id === "" || id === null) {
        id = e.target.attributes.id.textContent;
        let day = document.getElementById(id);

        if (!day || !day.classList.contains("day")) {
            return;
        }

        document.getElementById(id).classList.add("active-day");
        return;
    }

    if (e.target.attributes.id.textContent && id !== e.target.attributes.id.textContent) {
        document.getElementById(id).classList.remove("active-day");
    }
    if (!e.target.attributes.id.textContent) {
        return;
    }

    id = e.target.attributes.id.textContent;
    day = document.getElementById(id);
    if (day.classList.contains("active-day")) {
        day.classList.remove("active-day");
        dateNow = null;
        return;
    } else {
        day.classList.add("active-day");
        return;
    }
}

function setActiveDayOnLoad() {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    let todaysDate = new Date().toLocaleString("se-SE", options);
    console.log(todaysDate);
    document.getElementById(todaysDate).classList.add("active-day");
    id = todaysDate;
}

function setELToAllDays(){
    let days = document.querySelectorAll(".day");
    days.forEach((el) =>
        el.addEventListener("click", activeDay));
}