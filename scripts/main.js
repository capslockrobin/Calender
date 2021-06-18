window.addEventListener("load", main);

function main() {
    //calendar js
    setCurrYearMonth();
    loadMonths();
    loadYears();
    loadDays();
    addToggleEventListener();


    //activeDay.js
    setELToAllDays();
    setActiveDayOnLoad();

    //clockdate js
    setTodaysDate();
    clockTime();

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

    //holiday js
    observeMonthAndYear();
    setMonthAndYear();
}