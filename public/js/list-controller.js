var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  miFactory.homeListTransition();

  $scope.plannerEvents = miFactory.getPlannerEvents();
  $scope.bucketEvents = miFactory.getBucketEvents();
  $scope.getMoreBucketEvents = function() {
    miFactory.getMoreBucketEvents();
  }

  $scope.savePlannerIndex = function() {
    miFactory.setPlannerIndex(this.$index);
  }
  $scope.addButtonClicked = function (date, time) {
    miFactory.addPlanner(this.$index, date, time);
  }

  $scope.deleteButtonClicked = function() {
    miFactory.deletePlanner(this.$index);
  }

  $scope.finishButtonClicked = function() {
    miFactory.finishPlanner(this.$index);
  }
});
