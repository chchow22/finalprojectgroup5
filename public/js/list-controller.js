var app = angular.module("miModule");

app.controller('listCtrl', function($scope, miFactory) {

  $scope.plannerEvents = miFactory.getPlannerEvents();
  $scope.bucketEvents = miFactory.getBucketEvents();
  $scope.getMoreBucketEvents = function() {
    miFactory.getMoreBucketEvents();
    $scope.jQuery();
  }


  $scope.jQuery = function () {
    $(document).ready(function() {
      $(".deletePlanner").on("click", function(event) {
        miFactory.deletePlanner(event.target.id);
      });
      $(".finishPlanner").on("click", function(event) {
        miFactory.finishPlanner(event.target.id);
      });
      $(".addToPlannerButton").on("click", function(event) {
        miFactory.addPlanner(event.target.id);
      });
    });
  };
  $scope.jQuery();
});
