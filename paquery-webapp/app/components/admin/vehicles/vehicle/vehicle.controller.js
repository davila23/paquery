(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminVehicleController', AdminVehicleController);

    AdminVehicleController.$inject = ['$scope', '$state', '$stateParams', 'VehiclesService', '$uibModal', 'ProfileService', 'LogisticOperatorService', 'UserService'];

    function AdminVehicleController($scope, $state, $stateParams, VehiclesService, $uibModal, ProfileService, LogisticOperatorService, UserService) {
        var vm = this;
        angular.extend(vm, {
            vehicle: $stateParams.vehicle || {},
            saveVehicle: saveVehicle,
            goToVehicles: goToVehicles,
            //openDriversModal: openDriversModal,
            action: $stateParams.vehicle ? 'update' : 'create',
            isFormValid: isFormValid,
            checkVisibility: checkVisibility
        });

        init();

        function init() {
            getVehicleTypes();
            getPageAdmin();
            getLogisticsOperators();
        }


        function getPageAdmin() {
            ProfileService.getUserProfile()
                .then(function (response) {
                    // console.log(response);
                    vm.pageAuth = response.data.userRoleActions;
                    vm.userLoggedRoleID = response.data.userRoleID
                });
        }
        // function setDriverName() {
        //     if ($stateParams.vehicle) {
        //         vm.selectedDriver = {
        //             name: '',
        //             lastName: '',
        //             id: $stateParams.vehicle.driverID
        //         };
        //         var nameStrings = $stateParams.vehicle.driverName.split(" ");
        //         for (var i = 0; i < nameStrings.length; i++) {
        //             if (i === 0) {
        //                 vm.selectedDriver.name = $stateParams.vehicle.driverName.split(" ")[0];
        //             } else {
        //                 vm.selectedDriver.lastName = vm.selectedDriver.lastName + nameStrings[i];
        //                 if (i !== nameStrings.length - 1) {
        //                     vm.selectedDriver.lastName = vm.selectedDriver.lastName + ' ';
        //                 }
        //             }
        //         }
        //     }
        // }

        function getVehicleTypes() {
            VehiclesService.getVehicleTypes()
                .then(function(response) {
                    vm.carTypes = response.data;
                    if (vm.action === 'create') {
                        vm.vehicle.vehicleTypeObject = vm.carTypes[0];
                    } else {
                        var done = false;
                        for (var i = 0; i < vm.carTypes.length && !done; i++) {
                            if (vm.carTypes[i].value === $stateParams.vehicle.vehicleType) {
                                vm.vehicle.vehicleTypeObject = vm.carTypes[i];
                                done = true;
                            }
                        }
                        if (!done) {
                            vm.vehicle.vehicleTypeObject = vm.carTypes[0];
                        }
                    }
                });
        }

        function createVehicle() {
            if (!vm.vehicle.logisticOperator)
            {
                vm.vehicle.logisticOperator = { id: null };
            }

            VehiclesService.saveVehicle(vm.name || 'name', vm.vehicle.detail || '', vm.vehicle.model, vm.vehicle.vehicleBrand, vm.vehicle.vehiclePatent, vm.vehicle.vehicleTypeObject.value, vm.vehicle.active || false, vm.vehicle.logisticOperator.id,/*vm.selectedDriver.id,*/ 1 || vm.vehicle.insurance)
                .then(function(response) {
                    $state.go("admin.vehicles");
                });
        }

        function updateVehicle() {
            if (!vm.vehicle.logisticOperator)
            {
                vm.vehicle.logisticOperator = { id: null };
            }
            VehiclesService.updateVehicle(vm.vehicle.id, vm.name || 'name', vm.vehicle.detail || '', vm.vehicle.model, vm.vehicle.vehicleBrand, vm.vehicle.vehiclePatent, vm.vehicle.vehicleTypeObject.value, vm.vehicle.active || false, vm.vehicle.logisticOperator.id,/*vm.selectedDriver.id,*/ 1 || vm.vehicle.insurance)
                .then(function(response) {
                    $state.go("admin.vehicles");
                });
        }

        function isFormValid(form) {
            var valid;
            valid = form.$valid /*&& vm.selectedDriver*/;
            // vm.showDriverError = !vm.selectedDriver;
            return valid;
        }

        function saveVehicle(form) {
            vm.submitClicked = true;
            if (isFormValid(form)) {
                if (vm.action === 'create') {
                    createVehicle();
                } else {
                    updateVehicle();
                }
            }
        }

        function goToVehicles() {
            $state.go('admin.notifications');
        }

        function checkVisibility(field) {
            if (field == 'opl')
                return (vm.userLoggedRoleID === UserService.allUserRoles().Administrador.id);
        }

        function getLogisticsOperators() {

            LogisticOperatorService.getAll(0, 0, true)
                .then(function (response) {
                    var found = false;
                    vm.logisticOperators = response.data;
                    if (!$stateParams.vehicle) {
                        vm.vehicle.logisticOperator = response.data[0];
                    } else {
                        for (var i = 0; i < vm.logisticOperators.length; i++) {
                            if (vm.logisticOperators[i].id === vm.vehicle.ownerID) {
                                vm.vehicle.logisticOperator = vm.logisticOperators[i];
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        vm.vehicle.logisticOperator = vm.logisticOperators[0];
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        // function openDriversModal() {
        //     modalInstances();
        // }

        // function modalInstances() {
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         templateUrl: 'components/admin/vehicles/driverSelector/driverSelector.html',
        //         controller: 'DriverSelectorController',
        //         controllerAs: 'vm',
        //         size: 'modal-lg',
        //         backdrop: 'static',
        //         keyboard: true
        //     });
        //
        //     modalInstance.result.then(function(driver) {
        //         vm.selectedDriver = driver;
        //         vm.showDriverError = false;
        //     });
        // }

    }

})();
