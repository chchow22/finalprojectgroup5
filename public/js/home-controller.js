var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {

  // Home Functions/Variables
  $scope.photoSelected = false
  $scope.addOrRemovePhotoFromBucket = function() {

    if (this.photoSelected) {
      $scope.addPhotoToBucket(this.$index);
    }
    else {
      $scope.removePhotoFromBucket(this.$index);
    }
  }
  $scope.addPhotoToBucket = function(index) {
    miFactory.addLikedPhotos(index);
  }
  $scope.removePhotoFromBucket = function(index) {
    miFactory.removeLikedPhotos(index);
  }

  $scope.homePhotos = miFactory.getHomePhotos();
  $scope.getMoreHomePhotos = function() {
    miFactory.getMoreHomePhotos();
  };
  miFactory.initialSetupHome();
  miFactory.getPhotos();


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
