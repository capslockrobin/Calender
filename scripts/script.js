document.addEventListener("click", activeDay);

let id = "";

function activeDay() {
    if (id === "") {
        id = window.event.toElement.id;
        let day = document.getElementById(id);

        if (!day || !day.classList.contains("day")) {
            return;
        }

        document.getElementById(id).classList.add("active-day");
    }

    if (id !== window.event.toElement.id) {
        document.getElementById(id).classList.remove("active-day");
    }

    id = window.event.toElement.id;
    let day = document.getElementById(id);
    if (!day || !day.classList.contains("day")) {
        return;
    }

    document.getElementById(id).classList.add("active-day");
}