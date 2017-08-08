var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  $scope.plannerEvents = miFactory.getPlannerEvents();
  $scope.bucketEvents = miFactory.getBucketEvents();

  $scope.getMoreBucketEvents = function() {
    miFactory.getMoreBucketEvents();
  }

});
