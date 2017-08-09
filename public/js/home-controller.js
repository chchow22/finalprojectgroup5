var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {

  $timeout(function() {
    $('img').on('click', function() { 
      $(this).toggleClass('selected');
    });
  }, 100);


  // $('img').on('click', function() {
  //   $(this).toggleClass('selected');
  // });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.goToTop').fadeIn();
    } else {
      $('.goToTop').fadeOut();
    }

    $('img').on('click', function() {
      $(this).toggleClass('selected');
    });

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
