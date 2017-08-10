var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {

  function classToggle() {
    $(this).toggleClass('selected');
  }

  $scope.photoSelected = false

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

  $scope.homePhotos = miFactory.getHomePhotos();
  $scope.getMoreHomePhotos = function() {
    miFactory.getMoreHomePhotos();
  };

  miFactory.initialSetupHome();

  miFactory.getPhotos();


});
