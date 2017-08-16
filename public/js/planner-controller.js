var app = angular.module("miModule");

app.controller("plannerCtrl", function($scope, miFactory) {

  // Array that contains all planner event OBJECTS
  // These objects have the event name, event ID, date, and time
  $scope.plannerEvents = miFactory.getPlannerEvents();

  // When delete button on planner event clicked, this function triggers
  // Passes in index of that planner event
  // e.g. if button of the first bucket list event is clicked, 0 is passed into deletePlanner
  $scope.deleteButtonClicked = function() {
    miFactory.deletePlanner(this.$index);
  }

  $scope.savePlannerIndex = function() {
    miFactory.setPlannerIndex(this.$index);
  }

  $scope.editButtonClicked = function() {
    var dateTime = $("#dateTimeInput2").val();
    miFactory.editPlannerDateTime(dateTime);
  }
  //JQuery

  // When home page is scrolled, jquery checks if the distance from the top is more than 200
  // If more than 200, the "go back to top button" shows, otherwise it would hide
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.goToTop').fadeIn();
    } else {
      $('.goToTop').fadeOut();
    }
  });

  // When "go back to top button" is clicked, the page scrolls back to the top in 1000 milliseconds
  $('.goToTop').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
});
