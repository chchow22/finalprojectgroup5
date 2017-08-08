var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, miFactory) {
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
});
