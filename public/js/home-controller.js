var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory, $anchorScroll) {
  $anchorScroll();
  // Home Functions/Variables
  $scope.numOfSelectedPhotos = 0;
  // This boolean represents the selected/unselected state of photos in the home page
  $scope.photoSelected = false;

  $scope.homeInitialized = miFactory.getHomeInitializedBool();

  // This function is called whenever a photo is clicked in the home page (by ng-click)
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

  // This function runs when photo is selected (see below for deselection)
  $scope.addPhotoToBucket = function(imageID) {
    miFactory.addLikedPhotos(imageID);
  }

  // This function runs when photo is deselected
  $scope.removePhotoFromBucket = function(imageID) {
    miFactory.removeLikedPhotos(imageID);
  }

  // This is the array that stores image OBJECTS that are currently displayed in the home page
  // The image objects contain the id, the image URL, and the foreign key event ID
  $scope.homePhotos = miFactory.getHomePhotos();

  // This function runs when the home page loads.
  // This function runs only once per refresh of the home page.

  if ($scope.homeInitialized == false) {
    miFactory.initialSetupHome();
  }
  else {
    miFactory.removeAllLikedPhotos();
  }



  //JQuery

  // When home page is scrolled, jquery checks if the distance from the top is more than 200
  // If more than 200, the "go back to top button" shows, otherwise it would hide
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.goToTop').fadeIn();
    } else {
      $('.goToTop').fadeOut();
    }
  });

  // When "go back to top button" is clicked, the page scrolls back to the top in 1000 milliseconds
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
