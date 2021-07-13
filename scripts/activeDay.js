//Sets and toggles the selected day in the calendar

let id;
let id2;

function activeDay(e) {
    if (mobileDate) {
        console.log(mobileDate);
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        let id = mobileDate.toLocaleString("sv-SE", options);

        let oldMobileDate = document.getElementById(id);
        if (oldMobileDate) {
            oldMobileDate.classList.remove("active-day");
        }

        mobileDate = null;
    }
    if (!id) {
        id = e.target.attributes.id.textContent;
        let day = document.getElementById(id);

        if (!day || !day.classList.contains("calendar-day")) {
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

    //Togglar active day om man klickar på samma element igen
    //Onödig funktionalitet, men lämnar kvar den för jag 
    //har ändå svettats med den. Se avgränsningar i README.md
    //ang. "det ska gå avmarkera vald dag".
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
    const todaysDate = new Date().toLocaleString("sv-SE", options);
    document.getElementById(todaysDate).classList.add("active-day");
    id = todaysDate;
}

function setELToAllDays() {
    const days = document.querySelectorAll(".calendar-day");
    days.forEach((el) =>
        el.addEventListener("click", activeDay));
}