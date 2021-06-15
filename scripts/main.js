window.addEventListener("load", main);

function main() {
    //calander js
    setCurrYearMonth();
    loadMonths();
    loadYears();
    loadDays();

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
    addFromEventListeners();
    addButtomToggleEventListener();
    addDateNowEventListener();

    //holiday js
    observeMonthAndYear();
    setMonthAndYear();
}