(function () {
    'use strict';

    angular.module('myPython').controller('inicioController', InicioController);

    function InicioController($scope, usuarioServices) {

        var vm = $scope;

        //vm.admin = usuarioServices.estaEnRol("Administrador");
        //vm.empleado = usuarioServices.estaEnRol("Empleado");
        vm.autenticado = false;
        vm.usuario = [];
        vm.cargando = false;
        vm.error = null;


        vm.init = function() {

            vm.autenticado = usuarioServices.enLinea();
        };

        vm.init();
    }
})();
