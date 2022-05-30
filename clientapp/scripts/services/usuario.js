angular.module('myPython').factory('usuarioServices', function ($rootScope, $http, settings) {

    var url = settings.baseUrl;
    var ds = {
        autentificar : function(usuario, clave){
            return $http({
                method: "POST",
                url: url + "api/login", 
                data: "username="+usuario + "&password=" + clave,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        enLinea : function(){
            var token = sessionStorage.getItem('token');
            if(token)
                return  true;
            else
                return false
        }
    }
    return ds;
});