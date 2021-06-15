const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const startYear = 2015;
const endYear = 2025;
let year = 0;
let month = 0;
let dates = [];

function loadMonths() {
    for (let i = 0; i < months.length; i++) {
        let monthDiv = document.createElement("div");
        monthDiv.innerHTML = months[i];
        monthDiv.classList.add("dropdown-item");

        monthDiv.onclick = (function() {
            const selectedMonth = i;
            return function() {
                month = selectedMonth;
                document.getElementById("currentMonth").innerHTML = months[month];
                loadDays();
                return month;
            }
        })();

        document.getElementById("months").appendChild(monthDiv);
    }
}

function loadYears() {
    document.getElementById("years").innerHTML = "";

    for (let i = startYear; i <= endYear; i++) {
        let yearDiv = document.createElement("div");
        yearDiv.innerHTML = i;
        yearDiv.classList.add("dropdown-item");

        yearDiv.onclick = (function() {
            let selectedYear = i;
            return function() {
                year = selectedYear;
                document.getElementById("currentYear").innerHTML = year;
                loadDays();
                return year;
            }
        })();

        document.getElementById("years").appendChild(yearDiv);
    }
}

function toggleMonths() {
    let monthList = document.getElementById("months");
    if (monthList.style.display === "none") {
        monthList.style.display = "block";
    } else {
        monthList.style.display = "none";
    }
}

function toggleYears() {
    let yearList = document.getElementById("years");
    if (yearList.style.display === "none") {
        yearList.style.display = "block";
    } else {
        yearList.style.display = "none";
    }
}

function loadDays() {
    document.getElementById("calDays").innerHTML = "";

    const mockDate = new Date(year, month, 0);
    const totalDays = daysInChosenMonth(month, year);
    const dayofweek = mockDate.getDay(); // find where to start calendar day of week

    for (let i = 0; i <= dayofweek; i++) {
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("empty");
        dayDiv.classList.add("day");
        document.getElementById("calDays").appendChild(dayDiv);
    }

    for (let i = 0; i < totalDays; i++) {
        const dayNumber = i + 1;
        let dayDiv = document.createElement("div");

        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const dateIdPart = new Date(year + "-" + (month + 1) + "-" + (i + 1)).toLocaleString("se-SE", options);
        const dateIdPartString = String(dateIdPart);
        const dateId = new Date(dateIdPart);

        dates.push(dateId);
        dayDiv.id = dateIdPartString;
        dayDiv.className = "day";
        dayDiv.classList.add("calendar-day");
        dayDiv.innerHTML = dayNumber;

        document.getElementById("calDays").appendChild(dayDiv);
    }

    let clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calDays").appendChild(clear);
    todoCountForDate();
}

function daysInChosenMonth(month, year) {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}

/*------------------------------------------------------------------
Split out into setCurrYearMonth function and moved to main 
-------------------------------------------------------------------
window.addEventListener('load', function() {
    const date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("currentMonth").innerHTML = months[month];
    document.getElementById("currentYear").innerHTML = year;
    loadMonths();
    loadYears();
    loadDays();
});
*/

function setCurrYearMonth() {
    const date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("currentMonth").innerHTML = months[month];
    document.getElementById("currentYear").innerHTML = year;
}