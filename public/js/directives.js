var app = angular.module('miModule');

app.directive("homeImage", function() {
  return {
    restrict: "E",
    template: '<img ng-repeat = "homePhoto in homePhotos" ng-src = {{homePhoto.img_url}} style = "width: 320px;height:200px;" ng-class="{\'selected\': photoSelected}" ng-click="photoSelected = !photoSelected">',
    replace: true
  }
});
