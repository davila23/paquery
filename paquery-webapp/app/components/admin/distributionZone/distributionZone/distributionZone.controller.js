(function () {
        'use strict';

        angular
            .module('PaQuery')
            .controller('AdminDistributionZoneController', AdminDistributionZoneController);

        AdminDistributionZoneController.$inject = ['GeoLocationService', 'DistributionZoneService', '$scope', '$stateParams', '$state'];

        function AdminDistributionZoneController(GeoLocationService, DistributionZoneService, $scope, $stateParams, $state) {
            var vm = this;

            const time_debounce = 500;

            const noFindValue = {
                label: 'No se han encontrado resultados',
                value: ''
            };

            angular.extend(vm, {
                distributionZone: $stateParams.distributionZone || {name: '', postalCode: '', active: true},
                save: save,
                action: $stateParams.distributionZone ? 'update' : 'save',
                distributionZoneId: $stateParams.distributionZone ? $stateParams.distributionZone.ID : undefined,
                isFormValid: isFormValid,
                errorMessage: '',
            });

            init();

            function init() {
            }

            function createDistributionZone() {
                DistributionZoneService.createDistributionZone(vm.distributionZone).then(function (response) {
                    $state.go("admin.distributionZones");
                }).catch(function () {
                    vm.errorMessage = 'Se ha producido un error en el alta.';
                });
            }

            function updateDistributionZone() {
                DistributionZoneService.updateDistributionZone(vm.distributionZone).then(function (response) {
                    $state.go("admin.distributionZones");
                });
            }

            function isFormValid(form) {
                var valid = true;
                if (!vm.distributionZone.postalCode.length && vm.distributionZone.name.length) {
                    vm.errorMessage = 'Debe seleccionar al menos una ciudad'
                    valid = false;
                }
                return valid;
            }

            function save(form) {
                vm.errorMessage = '';
                vm.submitClicked = true;
                if (isFormValid(form))
                    if (vm.action === 'update') {
                        updateDistributionZone();
                    } else {
                        createDistributionZone();
                    }
            }
        }
    }

)();
