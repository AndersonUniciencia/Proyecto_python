app.controller('ordenController', function(ordenService) {
    var vm = this;

    vm.filtros = {Desde: null, Hasta: null};
    vm.ordenes = [];
    vm.cargando = true;
    vm.error = null;

    vm.init = function(){
        var fecha = new Date();
        fecha.setHours(0, 0, 0, 0);
        vm.filtros.Hasta = angular.copy(fecha);

        fecha.setMonth(fecha.getMonth() - 1);
        vm.filtros.Desde = fecha;
        vm.filtrar();
    }

    vm.filtrar = function(){
        vm.ordenes = [];
        vm.error = null;
        vm.cargando = true;
        var fechaDesde = moment(vm.filtros.Desde).format("YYYY-MM-DD");
        var fechaHasta = moment(vm.filtros.Hasta).format("YYYY-MM-DD");
        console.log(vm.filtros)
        ordenService.getOrdenes(fechaDesde, fechaHasta).then(function(data){
            var data = data.data;
            vm.ordenes = data;
            //console.log(vm.ordenes);
            vm.cargando = false;
        }).catch(function(e){
            vm.mostrarError(e);
        });
    }

    vm.mostrarError = function(e){
        console.log(e);
    }

    vm.init();
});