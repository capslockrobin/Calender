// document.addEventListener("click", activeDay);
window.addEventListener("load", main);

function main() {
    let divs = document.querySelectorAll(".day");
    divs.forEach((el) =>
        el.addEventListener("click", activeDay));
}

let id = ""

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

    if (id !== window.event.toElement.id) {
        document.getElementById(id).classList.remove("active-day");
    }

    id = window.event.toElement.id;

    document.getElementById(id).classList.add("active-day");
}