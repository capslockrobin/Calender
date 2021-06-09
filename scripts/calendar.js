const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const startYear = 2015;
const endYear = 2025;
let year = 0;
let month = 0;

function loadMonths() {
    for (var i = 0; i < months.length; i++) {
        var monthDiv = document.createElement("div");
        monthDiv.innerHTML = months[i];
        monthDiv.classList.add("dropdown-item");

        monthDiv.onclick = (function() {
            var selectedMonth = i;
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

    for (var i = startYear; i <= endYear; i++) {
        var yearDiv = document.createElement("div");
        yearDiv.innerHTML = i;
        yearDiv.classList.add("dropdown-item");

        yearDiv.onclick = (function() {
            var selectedYear = i;
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
    var monthList = document.getElementById("months");
    if (monthList.style.display === "none") {
        monthList.style.display = "block";
    } else {
        monthList.style.display = "none";
    }
}

function toggleYears() {
    var yearList = document.getElementById("years");
    if (yearList.style.display === "none") {
        yearList.style.display = "block";
    } else {
        yearList.style.display = "none";
    }
}

function loadDays() {
    document.getElementById("calDays").innerHTML = "";

    var mockDate = new Date(year, month, 0);
    var totalDays = daysInChosenMonth(month, year);
    var dayofweek = mockDate.getDay(); // find where to start calendar day of week

    for (var i = 0; i <= dayofweek; i++) {
        var dayDiv = document.createElement("div");
        dayDiv.classList.add("empty");
        dayDiv.classList.add("day");
        document.getElementById("calDays").appendChild(dayDiv);
    }

    for (var i = 0; i < totalDays; i++) {
        var dayNumber = i + 1;
        var dayDiv = document.createElement("div");
        dayDiv.id = year + "-" + (month + 1) + "-" + (i + 1);
        dayDiv.className = "day";
        dayDiv.innerHTML = dayNumber;

        document.getElementById("calDays").appendChild(dayDiv);
    }

    var clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calDays").appendChild(clear);
}

function daysInChosenMonth(month, year) {
    var date = new Date(year, month + 1, 0);
    return date.getDate();
}

window.addEventListener('load', function() {
    var date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("currentMonth").innerHTML = months[month];
    document.getElementById("currentYear").innerHTML = year;
    loadMonths();
    loadYears();
    loadDays();
});