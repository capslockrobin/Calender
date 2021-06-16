//Sets and toggles the selected day in the calendar

let id;
let id2;

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
        if (!document.getElementById(id)) {
            id = e.target.attributes.id.textContent;
            document.getElementById(id).classList.add("active-day");
            return;
        }

        document.getElementById(id).classList.remove("active-day");
    }
    if (!e.target.attributes.id.textContent) {
        return;
    }
    id = e.target.attributes.id.textContent;
    let day = document.getElementById(id);
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
    const todaysDate = new Date().toLocaleString("se-SE", options);
    document.getElementById(todaysDate).classList.add("active-day");
    id = todaysDate;
}

function setELToAllDays() {
    const days = document.querySelectorAll(".day");
    days.forEach((el) =>
        el.addEventListener("click", activeDay));
}