var app = angular.module("myPython", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/Ordenes", {
    templateUrl : "view/ordenes.html",
    controller: "ordenController",
    controllerAs: "ctr"
  })
  .when("/Productos", {
    templateUrl : "view/productos.html",
    controller: "productoController",
    controllerAs: "ctr"
  })
});
app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('myHttpInterceptor');
});