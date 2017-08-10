var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, $timeout, miFactory) {

  function classToggle() {
    $(this).toggleClass('selected');
  }

  $timeout(function() {
    $('img').on('click', classToggle);
  }, 300);


  // $('img').on('click', function() {
  //   $(this).toggleClass('selected');
  // });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.goToTop').fadeIn();
    } else {
      $('.goToTop').fadeOut();
    }

    $('img').on('click', classToggle);

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
