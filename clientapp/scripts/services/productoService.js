var app = angular.module('myPython');
app.service('productoService', function($http, settings) {
    var baseUrl = settings.baseUrl;

    this.getProductos = function(){
        return $http.get(baseUrl + "api/productos");
    }
});