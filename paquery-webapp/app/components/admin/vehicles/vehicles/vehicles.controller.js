(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminVehiclesController', AdminVehiclesController);

    AdminVehiclesController.$inject = ['$state', 'VehiclesService'];

    function AdminVehiclesController($state, VehiclesService) {
        var vm = this;
        angular.extend(vm, {
            editVehicle: editVehicle,
            deleteVehicle: deleteVehicle,
            getVehicles: VehiclesService.getVehicles
        });

        init();

        function init() {
            VehiclesService.getVehicleTypes()
                .then(function(response) {
                    vm.vehicleTypes = response.data;
                });
        }

        function editVehicle(vehicle) {
            $state.go('admin.vehicle', { vehicle: vehicle });
        }

        function deleteVehicle(vehicleId) {
          VehiclesService.deleteVehicle(vehicleId).then(function () {
            $state.reload();
          })
        }

    }

})();
