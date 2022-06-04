app.controller('inicioController', function($scope, $timeout, usuarioServices) {
    //Indica si esta autenticado
    $scope.autenticado = false;
    //Contiene el usuario
    $scope.user = [];
    //Indica la version del aplicativo
    $scope.version = null;

    //$scope.cargando = false;
    $scope.error = null;
    $scope.usuario = null;
    $scope.clave = null;

    $scope.cargando = true;

    $scope.init = function() {

        //Valida si esta conectado
        $scope.autenticado = usuarioServices.estaLinea();
        if($scope.autenticado)
            $scope.usuario = usuarioServices.getUsuarioLinea();
        //Valida la conexion de las api´s
        usuarioServices.ping().then(function(data){
            $scope.version = data.data.version;
        });
        
        $timeout(function(){
            $scope.cargando = false;
        })
        
    };

    /**
     * Autentica el usuario
     */
    $scope.autenticar = function(usuario, clave){
        $scope.cargando = true;
        //var usuario = $scope.usuario;
        //var clave = $scope.clave;
        console.log(usuario, clave);
        if(!usuario || !clave)
            $scope.mostarError("No se ha diligenciado los campos");

        
        //Obtiene los datos de autenticacion
        usuarioServices.autenticar(usuario, clave).then(function(request){
            
            var data = request.data;
            //Guarda el token
            sessionStorage.setItem('token', data.access_token);
            //Guarda el usuario
            $scope.user = data.usuario;
            var usuario = JSON.stringify(data.usuario);
            sessionStorage.setItem('usuario', usuario);
            
            $scope.autenticado = true;  
            $scope.cargando = false;      
        });
    }

    $scope.salir = function(){

    }

    /**
     * Muestra el error
     */
    $scope.mostarError = function(e){
        console.log(e)
        $scope.cargando = false;
    }

    $scope.init();
});
