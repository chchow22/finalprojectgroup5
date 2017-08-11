var app = angular.module("miModule");

app.controller("plannerCtrl", function($scope, miFactory) {

  $scope.plannerEvents = miFactory.getPlannerEvents();
  console.log(miFactory.getPlannerEvents());
  $scope.deleteButtonClicked = function() {
    miFactory.deletePlanner(this.$index);
  }

  $scope.finishButtonClicked = function() {
    miFactory.finishPlanner(this.$index);
  }

});
