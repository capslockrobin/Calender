window.addEventListener("load", main);

function main() {
    //calandar js
    setCurrYearMonth();
    loadMonths();
    loadYears();
    loadDays();
    addToggleEventListener();

    //script.js
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

    //holiday js
    observeMonthAndYear();
    setMonthAndYear();
}