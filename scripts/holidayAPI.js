//Makes API call to fetch Swedish holidays

//Observes currentMonth and currentYear to detect
//changes in their innerText and fires setMonthAndYear if so
function observeMonthAndYear() {
    const monthListener = document.getElementById("currentMonth");
    const yearListener = document.getElementById("currentYear");

    const MutationObserver = window.MutationObserver;

    const monthObserver = new MutationObserver(setMonthAndYear);
    monthObserver.observe(monthListener, {
        childList: true,
    });

    const yearObserver = new MutationObserver(setMonthAndYear);
    yearObserver.observe(yearListener, {
        childList: true,
    });
}

//Gets the currentMonth and currentYear innerText values
//from the page to dynamically populate the month and year
//variables for the getHolidaysAPI function
function setMonthAndYear() {
    const monthsList = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
    ];

    const monthText = document.getElementById("currentMonth").innerText;
    const month = monthsList.indexOf(monthText) + 1;
    const year = document.getElementById("currentYear").innerText;

    getHolidaysAPI(month, year);
}

function getHolidaysAPI(month, year) {
    let holidays = [];
    const url = "https://sholiday.faboul.se/dagar/v2.1/" + year + "/" + month;

    async function getHolidays() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    getHolidays().then((response) => {
        response.dagar.forEach((element) => {
            if (element.helgdag) {
                holidays.push(element);
            }
        });

        for (let i = 0; i < holidays.length; i++) {
            if (document.getElementById(holidays[i].datum).classList.contains("has-holidays")) {
                return;
            }

            document.getElementById(document.getElementById(holidays[i].datum).classList.add("has-holidays"));
            document.getElementById(holidays[i].datum).innerHTML += "<p class='holiday'>" + holidays[i].helgdag + "</p>";
        }
        return holidays;
    }).catch((response) => {
        console.error(response);
    });
}