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

  // When "been there done that" button on planner event clicked, this function triggers
  // Passes in index of that planner event
  // e.g. if button of the first bucket list event is clicked, 0 is passed into finishPlanner
  $scope.finishButtonClicked = function() {
    miFactory.finishPlanner(this.$index);
  }

});
