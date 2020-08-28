//variables grabbing todays date and time
var today = $("#currentDay");
var eventHour = parseInt(moment().format('H'));
var schedule = [];

//function updates time every second
setInterval(function () {
    var currentDate = moment();
    var date = currentDate.format('MMMM Do YYYY, h:mm:ss a')
    today.text(date);
}, 1000);


//function initializes the schedule, grabbing any saved events from local storage and color coding events based on if they are past, present or in the future.
function init() {
    var storedEvents = JSON.parse(localStorage.getItem("schedule"));
    if (storedEvents) {
        schedule = storedEvents;
    }
    var collection = $(".time-block");
    collection.each(function (index, element) {
        var time = parseInt($(element).attr("data-hour"));
        if (eventHour > time) {
            $("[data-hour=" + time + "]").addClass("past");
        } else if (eventHour < time) {
            $("[data-hour=" + time + "]").addClass("future");
        } else {
            $("[data-hour=" + time + "]").addClass("present");
        }
    })

    renderEvents();
}

//function renders the schedule array from local storage to it's specific time block
function renderEvents() {
    for (var i = 0; i < schedule.length; i++) {
        var index = schedule[i];
        var time = index.hour;

        $("[data-hour=" + time + "]").val(index.eventTitle);

    }
}

//function stores saved events in local storage
function storeEvents() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

//click event for save button that sends each event to be stored in local storage.
$("button").on("click", function (event) {
    event.preventDefault();
    var $input = $(this).prev();

    var userEvent = {
        eventTitle: $input.val(),
        hour: $input.attr("data-hour")
    };

    schedule.push(userEvent);
    storeEvents();
    renderEvents();

});

init();


