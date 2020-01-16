(function () {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminWorkZoneController', AdminWorkZoneController);

    AdminWorkZoneController.$inject = ['GeoLocationService', 'WorkzoneService', '$scope', '$stateParams', '$state'];

    function AdminWorkZoneController(GeoLocationService, WorkzoneService, $scope, $stateParams, $state) {
        var vm = this;

        const time_debounce = 500;

        const noFindValue = {
            label: 'No se han encontrado resultados',
            value: ''
        };

        angular.extend(vm, {
            workzone: $stateParams.workzone || {name: '', cities: []},
            city: {label: '', value: ''},
            save: save,
            action: $stateParams.workzone ? 'update' : 'save',
            workzoneId: $stateParams.workzone ? $stateParams.workzone.ID : undefined,
            isFormValid: isFormValid,
            errorMessage: '',
            dropCity: dropCity
        });

        init();

        function init() {

        }

        $scope.searchCities = function () {
            this.searchUser = new SearchCities();
            return this.searchUser;
        };

        function SearchCities() {
            this.options = {
                html: true,
                minLength: 1,
                outHeight: 100,
                maxWidth: 300,
                source: function (request, response) {

                    if (!request.term) return;

                    GeoLocationService.geoAutocomplete(request.term).then(function (result) {
                        // console.log(result);

                        var predictions = [];
                        angular.forEach(result.data.predictions, function (value) {

                            var find = _.find(vm.workzone.cities, function (c) {
                                return c.name == value.description;
                            });

                            if (!find) {
                                var exp = {};
                                exp.label = value.description;
                                exp.value = value.description;
                                exp.city = {
                                    name: value.description,
                                    externalPlaceID: value.place_id,
                                    externalRefernceID: value.reference
                                };
                                this.push(exp);
                            }

                        }, predictions);

                        if (!predictions.length) {
                            predictions.push(noFindValue);
                        }

                        response(predictions);

                    }).catch(function () {
                        vm.errorMessage = 'Se ha producido un error inesperado. Consulte con el administrador del sistema.';
                    });
                }
            };
            this.events = {
                change: function (event, ui) {
                    vm.search = '';
                },
                select: function (event, ui) {
                    vm.search = '';
                    if (ui.item.label === noFindValue.label)
                        return;

                    vm.workzone.cities.push(ui.item.city);
                }
            };
        }

        $scope.changeClass = function (options) {
            var widget = options.methods.widget();
            // remove default class, use bootstrap style
            widget.removeClass('ui-menu ui-corner-all ui-widget-content').addClass('dropdown-menu');
        };

        function dropCity(c) {
            vm.workzone.cities = vm.workzone.cities.filter(function (item) {
                return item.name !== c.name;
            });
        }

        function updateWorkzone() {
            WorkzoneService.create(vm.workzone).then(function (response) {
                $state.go("admin.workzones");
            }).catch(function () {
                vm.errorMessage = 'Se ha producido en la actualización del registro.';
            });
        }

        function createWorkzone() {
            WorkzoneService.create(vm.workzone).then(function (response) {
                $state.go("admin.workzones");
            }).catch(function () {
                vm.errorMessage = 'Se ha producido un error en el alta.';
            });
        }

        function isFormValid(form) {
            var valid = true;
            if (!vm.workzone.cities.length) {
                vm.errorMessage = 'Debe seleccionar al menos una ciudad'
                valid = false;
            }
            return valid;
        }

        function save(form) {
            vm.errorMessage = '';
            vm.submitClicked = true;
            if (isFormValid(form))
                createWorkzone();

        }

    }

})();
