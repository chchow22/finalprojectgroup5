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
    $('img').on('click', function() {
      $(this).toggleClass('selected');
    });

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
  }

});
