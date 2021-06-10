window.addEventListener(
    "load",
    observeMonthAndYear,
    setMonthAndYear,
    getHolidaysAPI
);

function observeMonthAndYear() {
    var monthListener = document.getElementById("currentMonth");
    var yearListener = document.getElementById("currentYear");

    var MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

    var observer = new MutationObserver(setMonthAndYear);
    observer.observe(monthListener, {
        childList: true,
    });

    var observer2 = new MutationObserver(setMonthAndYear);
    observer2.observe(yearListener, {
        childList: true,
    });
}

function setMonthAndYear() {
    let monthsList = [
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

    let monthText = document.getElementById("currentMonth").innerText;
    let month = monthsList.indexOf(monthText) + 1;
    let year = document.getElementById("currentYear").innerText;

    // console.log(monthText);
    // console.log(month);
    // console.log(year);
    getHolidaysAPI(month, year);
}

function getHolidaysAPI(month, year) {
    let holidays = [];
    const url = "https://sholiday.faboul.se/dagar/v2.1/" + year + "/" + month;

    async function getHolidays() {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    getHolidays().then((response) => {
        response.dagar.forEach((element) => {
            if (element.helgdag) {
                holidays.push(element);
            }
        });

        for (let i = 0; i < holidays.length; i++) {
            console.log(document.getElementById(holidays[i].datum))

            document.getElementById(holidays[i].datum).innerText = holidays[i].helgdag;
        }
        return holidays;
    });

    // console.log(holidays);

    // holidays.forEach(element => {
    //     console.log(element);
    // });

    // function addHoliday() {
    //     holidays.forEach((element) => {
    //         console.log(element);
    //     });
    // }

    // addHoliday();
}

function addToCalendar() {

}