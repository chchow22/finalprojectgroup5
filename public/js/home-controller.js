var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, miFactory) {
  $scope.homePhotos = miFactory.getHomePhotos();
  $scope.getMoreHomePhotos = function() {
    miFactory.getMoreHomePhotos();
    $scope.jQuery();
  };

  miFactory.initialSetupHome();


  miFactory.getPhotos();

  $scope.jQuery = function () {
    miFactory.jQuery();
  };


});
