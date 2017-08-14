var app = angular.module('miModule');

app.directive("homeImage", function() {
  return {
    restrict: "E",
    templateUrl: '../partials/homeImages.html',
    replace: false
  }
});
