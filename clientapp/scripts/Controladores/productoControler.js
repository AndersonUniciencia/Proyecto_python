app.controller('productoController', function(productoService) {
    var vm = this;

    vm.productos = [];
    vm.cargando = true;
    vm.error = null;

    vm.init = function(){
        productoService.getProductos().then(function(response){
            var datos =  response.data;
            console.log(datos);
            vm.productos = datos;
            vm.cargando = false;
        });
    }

    vm.mostrarError = function(e){
        console.log(e);
    }

    vm.init();
});