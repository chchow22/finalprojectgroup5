var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  $scope.plannerEvents = miFactory.getPlannerEvents();
  $scope.bucketEvents = miFactory.getBucketEvents();
  $scope.getMoreBucketEvents = function() {
    miFactory.getMoreBucketEvents();

  }

  $scope.addButtonClicked = function () {
    miFactory.addPlanner(this.$index);
  }

  $scope.deleteButtonClicked = function() {
    miFactory.deletePlanner(this.$index);
  }

  $scope.finishButtonClicked = function() {
    miFactory.finishPlanner(this.$index);
  }

});
