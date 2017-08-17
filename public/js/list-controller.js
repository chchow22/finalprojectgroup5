var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  // This function runs when the list page loads.
  // This function runs only once per refresh of the list page.
  miFactory.homeListTransition();
  $scope.numOfPlannerEvents = miFactory.getPlannerEvents().length;
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
    $scope.numOfPlannerEvents += 1;
    $('.rightIcon').show(1000);
  }

  $scope.deleteButtonClicked = function() {
    miFactory.deleteBucketEvent(this.$index);
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

  if ($scope.numOfPlannerEvents == 0) {
  $('.rightIcon').hide();
  }

});
