(function () {
        'use strict';

        angular
            .module('PaQuery')
            .controller('AdminZoneController', AdminZoneController);

        AdminZoneController.$inject = ['zonesService', 'DistributionZoneService', '$scope', '$stateParams', '$state'];

        function AdminZoneController(zonesService, DistributionZoneService, $scope, $stateParams, $state) {
            var vm = this;

            const time_debounce = 500;

            const noFindValue = {
                label: 'No se han encontrado resultados',
                value: ''
            };

            angular.extend(vm, {
                zone: $stateParams.zone || {distributionZones: []},
                distributionZones: [],
                save: save,
                action: $stateParams.zone ? 'update' : 'save',
                // zoneId: $stateParams.zone ? $stateParams.zone.ID : undefined,
                errorMessage: '',
                addZone: addZone,
                removeZone: removeZone
            });

            init();

            function init() {
                getDistributionZones();
                if (vm.action === 'create') {
                    vm.zone.distributionZones = [];
                }

                if (vm.zone && vm.zone.id)
                    zonesService.getZone(vm.zone.id)
                        .then(function(resp) { vm.zone = resp.data })
                        .catch(function(){ vm.errorMessage = "Error al recuperar datos de la Zona"})

            }

            function createZone() {
                zonesService.createZone(vm.zone).then(function (response) {
                    $state.go("admin.zones");
                }).catch(function () {
                    vm.errorMessage = 'Se ha producido un error en el alta.';
                });
            }

            function updateZone() {
                zonesService.updateZone(vm.zone).then(function (response) {
                    $state.go("admin.zones");
                });
            }


            function isFormValid(form) {
                var valid = true;
                // if (!vm.distributionZones.postalCode.length && vm.distributionZones.name.length) {
                //     vm.errorMessage = 'Debe seleccionar al menos una ciudad'
                //     valid = false;
                // }
                return valid;
            }

            function save(form) {
                vm.errorMessage = '';
                vm.submitClicked = true;
                if (isFormValid(form))
                    if (vm.action === 'update') {
                        updateZone();
                    } else {
                        createZone();
                    }
            }

            function getDistributionZones() {
                DistributionZoneService.getAllDistributionZone().then(function (response) {
                    // for (var dzone of response.data) {
                    //     vm.distributionZones;
                    //     vm.distributionZones.push(dzone);
                    // }
                    vm.distributionZones = response;
                    vm.zone.dzone = vm.distributionZones[0];
                })
                .catch(function (err) {
                    console.log(err);
                });
            }

            function addZone() {
                if (vm.zone.distributionZones.length) {
                    for (var i = 0; i < vm.zone.distributionZones.length; i++) {
                        if (vm.zone.dzone.id !== vm.zone.distributionZones[i].id) {
                            vm.errorOL = false;
                        } else if (vm.zone.dzone.id === vm.zone.distributionZones[i].id) {
                            vm.errorOL = "No se pueden ingresar Operadores Logicos iguales";
                            return false;
                        }
                    }
                    if (!vm.errorOL && vm.zone.distributionZones.length < vm.distributionZones.length) {
                        vm.zone.distributionZones.push(vm.zone.dzone);
                    }
                } else {
                    vm.zone.distributionZones.push(vm.zone.dzone);
                }
            }

            function removeZone(elem) {
                vm.zone.distributionZones.splice(vm.zone.distributionZones.indexOf(elem), 1);
            }
        }
    }
)();
