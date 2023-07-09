angular.module('myPython').factory('settings', function () {

    var url = "http://127.0.0.1:8000/";

    
    var sdo = {
        //Url base para todos los request
        baseUrl: url,
        //Tamaño por defecto para las páginas
        paginaSize: 50
    }

    return sdo;
});