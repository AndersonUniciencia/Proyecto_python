var app = angular.module('myPython');
app.service('usuarioServices', function($http, settings) {
    var url = settings.baseUrl;

    this.ping = function(){
        return $http.get( url + "api/ping");
    }

    this.autenticar = function(usuario, clave){
        
        return $http({
            method: 'POST',
            url: url + "api/login",
            data: "username=" + usuario + "&password=" + clave,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    this.estaLinea = function(){
        var token = sessionStorage.getItem('token');
        if(token)
            return  true;
        else
            return false
    }

    this.getUsuarioLinea = function(){
        var user = sessionStorage.getItem("usuario");

        return JSON.parse(user);
    }
});