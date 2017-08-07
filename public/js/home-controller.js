var app = angular.module('miModule');

app.controller('homeCtrl', function($scope, miFactory) {
  $('img').on('click', function() {
    $(this).toggleClass('selected');
  });
});
