var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {
  $scope.numOfSelectedPhotos = 0;
  $scope.photoSelected = false;

  $scope.homeInitialized = miFactory.getHomeInitializedBool();

  $scope.addOrRemovePhotoFromBucket = function(imageID) {
    if (this.photoSelected == true) {
      $scope.addPhotoToBucket(imageID);
      $scope.numOfSelectedPhotos += 1;
    }
    else {
      $scope.removePhotoFromBucket(imageID);
      $scope.numOfSelectedPhotos -= 1;
    }
  }

  $scope.addPhotoToBucket = function(imageID) {
    miFactory.addLikedPhotos(imageID);
  }

  $scope.removePhotoFromBucket = function(imageID) {
    miFactory.removeLikedPhotos(imageID);
  }

  $scope.homePhotos = miFactory.getHomePhotos();

  if ($scope.homeInitialized == false) {
    miFactory.initialSetupHome();
  }
  else {
    miFactory.removeAllLikedPhotos();
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

  if ($scope.homeInitialized == false) {
  $('.rightIcon').hide();
}
  $('.imageContainer').on('click', function() {
    $('.rightIcon').show('slow');
  });


});
