var app = angular.module("myPython", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "view/inicio.html",
    controller: "inicioController"
  })
});