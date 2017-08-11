var app = angular.module("miModule");

app.config(function($routeProvider) {

  $routeProvider

  .when("/welcome", {
    controller: "introCtrl",
    templateUrl: "../partials/welcome.html"
  })

  .when("/home", {
    controller: "homeCtrl",
    templateUrl: "../partials/home.html"
  })

  .when("/list", {
    controller: "listCtrl",
    templateUrl: "../partials/list.html"
  })

  .otherwise ({
    redirectTo: "/welcome"
  });

});
