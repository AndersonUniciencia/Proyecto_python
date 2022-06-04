var app = angular.module('myPython');
app.service('ordenService', function($http, settings) {
    var baseUrl = settings.baseUrl;

    this.getOrdenes = function(desde, hasta){
        var url = "api/ordenes";
        url += "?desde="+desde + "&hasta=" + hasta;

        return $http.get(baseUrl + url);
    }
});