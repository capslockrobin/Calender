window.addEventListener("load", main);

function main() {
    //calendar.js
    setCurrYearMonth();
    loadMonths();
    loadYears();
    loadDays();
    addToggleEventListener();


    //activeDay.js
    setELToAllDays();
    setActiveDayOnLoad();

    //clockdate.js
    setTodaysDate();
    startClock();

    //todo js
    loadFirstDate();
    setTodoListHeaderDate();
    dateNowOnClick();
    initTodos();
    filterListBasedOnDate();
    todoCountForDate();
    addFromEventListeners();
    addButtomToggleEventListener();
    addDateNowEventListener();
    addChangeDayButtoms();

    //holidayAPI.js
    observeMonthAndYear();
    setMonthAndYear();
}