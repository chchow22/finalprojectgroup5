var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {
  // Home Functions/Variables
  $scope.numOfSelectedPhotos = miFactory.getLikedPhotos().length;
  // This boolean represents the selected/unselected state of photos in the home page
  $scope.photoSelected = false;

  // This function is called whenever a photo is clicked in the home page (by ng-click)
  $scope.addOrRemovePhotoFromBucket = function() {
    if (this.photoSelected) {
      $scope.addPhotoToBucket(this.$index);
      $scope.numOfSelectedPhotos += 1;
    }
    else {
      $scope.removePhotoFromBucket(this.$index);
      $scope.numOfSelectedPhotos -= 1;
    }
  }

  // This function runs when photo is selected (see below for deselection)
  $scope.addPhotoToBucket = function(index) {
    miFactory.addLikedPhotos(index);
  }

  // This function runs when photo is deselected
  $scope.removePhotoFromBucket = function(index) {
    miFactory.removeLikedPhotos(index);
  }

  // This is the array that stores image OBJECTS that are currently displayed in the home page
  // The image objects contain the id, the image URL, and the foreign key event ID
  $scope.homePhotos = miFactory.getHomePhotos();

  // This function runs when the home page loads.
  // This function runs only once per refresh of the home page.

  if ($scope.numOfSelectedPhotos == 0) {
    miFactory.initialSetupHome();
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

  if ($scope.numOfSelectedPhotos == 0) {
  $('.rightIcon').hide();
}
  $('.imageContainer').on('click', function() {
    $('.rightIcon').show('slow');
  });


});
