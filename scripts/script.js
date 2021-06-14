// document.addEventListener("click", activeDay);
window.addEventListener("load", main);

function main() {
    let divs = document.querySelectorAll(".day");
    divs.forEach((el) =>
        el.addEventListener("click", activeDay));
    setActiveDayOnLoad();
}

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

function activeDay() {
    if (id === "" || id === null) {
        id = window.event.toElement.id;
        let day = document.getElementById(id);

        if (!day || !day.classList.contains("day")) {
            return;
        }

        document.getElementById(id).classList.add("active-day");
        return;
    }

    if (window.event.toElement.id && id !== window.event.toElement.id) {
        document.getElementById(id).classList.remove("active-day");
    }
    if (!window.event.toElement.id) {
        return;
    }

    id = window.event.toElement.id;
    day = document.getElementById(id);
    if (day.classList.contains("active-day")) {
        console.log("heja")
        day.classList.remove("active-day");
        console.log(dateNow);
        dateNow = null;
        // filterListBasedOnDate();
        return;
    } else {
        day.classList.add("active-day");
        return;
    }
}

// function activeDay(e) {
//     let calDay = document.getElementById(e.target.attributes.id.textContent);
//     console.log(calDay);

//     if (calDay.classList.contains("active-day")) {
//         calDay.classList.remove("active-day");
//     } else {
//         calDay.classList.add("active-day");
//     }
// }


function setActiveDayOnLoad() {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    let todaysDate = new Date().toLocaleString("se-SE", options);
    document.getElementById(todaysDate).classList.add("active-day");
    id = todaysDate;
}