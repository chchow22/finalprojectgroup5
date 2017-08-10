var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {

  // Home Functions/Variables
  $scope.photoSelected = false
  $scope.addOrRemovePhotoFromBucket = function() {
    if ($scope.photoSelected) {
      $scope.addPhotoToBucket();
    }
    else {
      $scope.removePhotoFromBucket();
    }
  }
  $scope.addPhotoToBucket = function() {
    console.log(this);
  }
  $scope.removePhotoFromBucket = function() {
    console.log(this);

  }

  $scope.homePhotos = miFactory.getHomePhotos();
  $scope.getMoreHomePhotos = function() {
    miFactory.getMoreHomePhotos();
  };
  miFactory.initialSetupHome();
  miFactory.getPhotos();

  // Home-List transition functions
  $scope.homeListTransition = function() {
    miFactory.homeListTransition();
  }


  //JQuery
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
