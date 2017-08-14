var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  // This function runs when the list page loads.
  // This function runs only once per refresh of the list page.
  miFactory.homeListTransition();

  // Array that stores all the OBJECTS of events that were placed in the bucket list
  // These event objects contain information of the event and all four image URLs
  $scope.bucketEvents = miFactory.getBucketEvents();

  // Function that triggers when "Add to Planner" is clicked (not the button on the modal, but the one on the page)
  // This function saves the index of the "Add to Planner" button to service.js
  // e.g. if the "add to planner" button of the first bucket list event is clicked,
  // 0 is passed into setPlannerIndex, and for second, 1 is passed in, and so on...
  $scope.savePlannerIndex = function() {
    miFactory.setPlannerIndex(this.$index);
  }

  // Function that triggers when "Add to Planner" is clicked (not the button on the page, but the one on the modal)
  // This function passes the date and time to service.js
  $scope.addButtonClicked = function () {
    var dateTime = $("#dateTimeInput").val();
    miFactory.addPlanner(dateTime);
    console.log(dateTime);
  }
});
