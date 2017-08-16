var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  miFactory.homeListTransition();
  $scope.numOfPlannerEvents = miFactory.getPlannerEvents().length;

  $scope.bucketEvents = miFactory.getBucketEvents();

  $scope.savePlannerIndex = function() {
    miFactory.setPlannerIndex(this.$index);
  }

  $scope.addButtonClicked = function () {
    var dateTime = $("#dateTimeInput").val();
    miFactory.addPlanner(dateTime);
    $scope.numOfPlannerEvents += 1;
    $('.rightIcon').show(1000);
  }

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.goToTop').fadeIn();
    } else {
      $('.goToTop').fadeOut();
    }
  });

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
