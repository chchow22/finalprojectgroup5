var app = angular.module("miModule");

app.controller("plannerCtrl", function($scope, miFactory) {

  $scope.plannerEvents = miFactory.getPlannerEvents();

  $scope.deleteButtonClicked = function() {
    miFactory.deletePlanner(this.$index);
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
});
