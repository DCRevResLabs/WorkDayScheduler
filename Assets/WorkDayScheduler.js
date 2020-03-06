var timeAndDay = document.querySelector("#time-of-day");
var timeNow;
var storedEvent = {};
var storedEvents = {};
var storedEventsList = [];
renderTime();
hourColour();

function renderTime() {
  timeNow = document.createElement("h3");
  timeNow.setAttribute("class", "alert alert-primary text-center");
  timeAndDay.appendChild(timeNow);
  liveTime();
}

function liveTime() {
  timeNow.textContent = moment().format("MMMM Do YYYY, h:mm a");
  setInterval(liveTime, 30000);
}

function hourColour() {
  $(".time-block").each(function() {
    const now = parseInt(moment().format("H"));
    const span = parseInt($(".time-block").attr("data-time"));
    if (span < now) {
      $(".time-block").attr(
        "class",
        "alert-danger alert text-center time-block"
      );
    } else if (now == span) {
      $(".time-block").attr(
        "class",
        "alert-primary alert text-center time-block"
      );
    } else {
      $(".time-block").attr(
        "class",
        "alert-success alert text-center time-block"
      );
    }
  });
}

function renderEvents() {
  // for all stored events
  $(".event-entry").each(function() {
    var dataTime = $(this)
      .parent()
      .parent()
      .attr("data-time");
    var lock = $(this)
      .next()
      .children();
    if (
      storedEvents.hasOwnProperty(dataTime) === true &&
      storedEvents[dataTime] !== ""
    ) {
      lock.attr("value", "locked");
      lock.html('<i class="fa fa-lock"></i>');
      $(this).attr("contentEditable", "false");
      $(this).text(storedEvents[dataTime]);
    } else {
      lock.attr("value", "unlocked");
      lock.html('<i class="fa fa-unlock"></i>');
      $(this).attr("contentEditable", "true");
    }
  });
}

function displayStoredEvents() {
  storedEventsList = JSON.parse(localStorage.getItem("storedEvents"));
  if (storedEventsList !== null) {
    storedEvents = storedEventsList;
  }
  renderEvents();
}
displayStoredEvents();

$(".lock").on("click", function() {
  var eventTime = $(this)
    .parent()
    .parent()
    .parent()
    .attr("data-time");

  if ($(this).attr("value") == "locked") {
    $(this).attr("value", "unlocked");
    $(this).html('<i class="fa fa-unlock"></i>');
    $(".event-entry").attr("contentEditable", "true");
    clearEntry();
  } else {
    $(this).attr("value", "locked");
    $(this).html('<i class="fa fa-lock"></i>');
    $(".event-entry").attr("contentEditable", "false");
    storedEvents[eventTime] = $(this)
      .parent()
      .prev()
      .text()
      .trim();
    storeEntry();
    displayStoredEvents();
  }
});

function clearEntry() {
  console.log("clear entry fired");
}

function storeEntry() {
  localStorage.setItem("storedEvents", JSON.stringify(storedEvents));
  console.log("store entry fired");
}
