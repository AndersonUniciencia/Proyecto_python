angular.module('myPython').factory('settings', function() {
    var url = "http://127.0.0.1:8000/";
    
    var sdo = {
        //Url base para todos los request
        baseUrl: url,
        //Tamaño por defecto para las páginas
        paginaSize: 50
    }

    return sdo;
});

angular.module('myPython').factory("RequestHeadersInterceptor", function()
{
    var request = function request(config)
    {
        console.log("request", config)
        config.headers["x-api-key"] = "00998-123-99912";
        return config;
    };

    return {
        request: request
    };
});

angular.module('myPython').factory('myHttpInterceptor', function() {
    return {
        // optional method
        'request': function(config) {
            //console.log("request",config)
            var token  = sessionStorage.getItem("token");

            if(token)
                config.headers["Authorization"] = "bearer " + token;
            // do something on success
            return config;
        },
        // optional method
        'response': function(response) {
            //console.log("response", response)
            var token = response.headers("Token");
            
            if(token)
                sessionStorage.setItem("token", token);
            //console.log( response.headers("Token"));
            // do something on success
            return response;
        },
        // optional method
        'responseError': function(rejection) {
            // do something on error
            var error = rejection.data.detail;
            if(error == "No pudo validar las credenciales"){
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("usuario");
                window.location.reload();
            }
            //console.log(rejection.data.detail);
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        }
    };
  });
