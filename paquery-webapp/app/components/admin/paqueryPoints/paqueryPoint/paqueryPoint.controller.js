(function () {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminPaqueryPointController', AdminPaqueryPointController);

    AdminPaqueryPointController.$inject = ['$state', '$stateParams', 'PaqueryPointService', 'AppTypesService', 'zonesService', '$q','$scope'];

    function AdminPaqueryPointController($state, $stateParams, PaqueryPointService, AppTypesService, zonesService, $q,$scope) {
        var vm = this;
        var initialPromises = {};

        angular.extend(vm, {
            paqueryPoint: $stateParams.paqueryPoint || {
                country: '',
                locationAddress: {country: {}, postalCode: ''},
                zones: [],
                currentServices: [],
                days: [],
                workingScheduleTimes: [{daysOFWeek: []}]
            },
            workingScheduleTimes: [{daysOFWeek: []}],
            zones: [],
            country: {},
            currentServices: [],
            days: [],
            locationAddress: {country: {}, postalCode: ''},
            action: $stateParams.paqueryPoint ? 'update' : 'save',
            save: save,
            addZone: addZone,
            removeZone: removeZone,
            removeService: removeService,
            addService: addService,
            getDaysOfWeek: getDaysOfWeek,
            addDay: addDay,
            removeDay: removeDay
        });

        function createPaqueryPoint() {

            PaqueryPointService.create(vm.paqueryPoint.name, vm.paqueryPoint.address, vm.paqueryPoint.detail, vm.paqueryPoint.phone, vm.paqueryPoint.locationAddress.postalCode, vm.paqueryPoint.contactName, vm.paqueryPoint.volume, vm.paqueryPoint.isPrivate, vm.paqueryPoint.locationAddress, vm.paqueryPoint.zones, vm.paqueryPoint.currentServices, vm.paqueryPoint.workingScheduleTimes,vm.paqueryPoint.active)
                .then(function (response) {
                    $state.go("admin.paqueryPoints");
                });
        }

        function showNameService() {
        }

        function updatePaqueryPoint() {
            PaqueryPointService.updatePaqueryPoint(vm.paqueryPoint).then(function (response) {
                $state.go("admin.paqueryPoints");
            });
        }

        function getPaqueryPoint() {
            initialPromises.paqueryPoint = $q.defer();

            if ($stateParams.paqueryPoint && $stateParams.paqueryPoint && $stateParams.paqueryPoint.id) {
                PaqueryPointService.getById($stateParams.paqueryPoint.id)
                    .then(resp => {
                        vm.paqueryPoint = resp.data
                        initialPromises.paqueryPoint.resolve();
                    });
            } else {
                initialPromises.paqueryPoint.resolve()
            }
        }

        init();

        function init() {
            getServices();
            getDaysOfWeek();
            getCountries();
            getZones();
            getPaqueryPoint();
            if (vm.action === 'create') {
                vm.paqueryPoint.currentServices = [];
                vm.paqueryPoint.zones = [];
                vm.paqueryPoint.days = [];
            }
            resolveAllPromises()
        }

        function resolveAllPromises() {

            $q.all([initialPromises.paqueryPoint.promise, initialPromises.services.promise, initialPromises.days.promise])
                .then(() => {
                    var services = [];

                    _.forEach(vm.paqueryPoint.currentServices, (csInt) => {
                        const cs = _.find(vm.currentServices, (serv) => serv.value === csInt)
                        if (!cs)
                            throw "Error mapeando servicios de PaqueryPoint";
                        services.push(cs);
                    });
                    vm.paqueryPoint.currentServices = services;
                });
        }

        function getCountries() {
            AppTypesService.getCountries().then(function (response) {
                vm.countries = response.data;
                if (vm.countries.length) {
                    var countryId = $stateParams.paqueryPoint ? $stateParams.paqueryPoint.locationAddress.country.id : vm.countries[0].id;
                    loadCities(countryId);
                    watchCountryChanges();
                }
            })
                .catch(function (err) {
                    console.log(err);
                });
        }


        function getDaysOfWeek() {
            initialPromises.days = $q.defer();
            PaqueryPointService.getDaysOfWeek()
                .then(function (response) {
                    for (var day of response.data) {
                        vm.days;
                        vm.days.push(day);
                    }
                    vm.paqueryPoint.day = vm.days[0];
                    initialPromises.days.resolve();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function getZones() {
            zonesService.getZones(0, 100, false).then(function (response) {
                for (var zone of response.data) {
                    vm.zones;
                    vm.zones.push(zone);
                }
                vm.paqueryPoint.zone = vm.zones[0];
            })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function addZone() {
            if (vm.paqueryPoint.zones.length) {
                for (var i = 0; i < vm.paqueryPoint.zones.length; i++) {
                    if (vm.paqueryPoint.zone.id !== vm.paqueryPoint.zones[i].id) {
                        vm.errorPP = false;
                    } else if (vm.paqueryPoint.zone.id === vm.paqueryPoint.zones[i].id) {
                        vm.errorPP = "No se pueden ingresar Operadores Logicos iguales";
                        return false;
                    }
                }
                if (!vm.errorPP && vm.paqueryPoint.zones.length < vm.zones.length) {
                    vm.paqueryPoint.zones.push(vm.paqueryPoint.zone);
                }
            } else {
                vm.paqueryPoint.zones.push(vm.paqueryPoint.zone);
            }
        }

        function addService() {
            if (vm.paqueryPoint.currentServices.length) {
                for (var i = 0; i < vm.paqueryPoint.currentServices.length; i++) {
                    if (vm.paqueryPoint.currentService.value !== vm.paqueryPoint.currentServices[i].value) {
                        vm.errorPP = false;
                    } else if (vm.paqueryPoint.currentService.value === vm.paqueryPoint.currentServices[i].value) {
                        vm.errorPP = "No se pueden ingresar Servicios iguales";
                        return false;
                    }
                }
                if (!vm.errorPP && vm.paqueryPoint.currentServices.length < vm.currentServices.length) {
                    vm.paqueryPoint.currentServices.push(vm.paqueryPoint.currentService);
                }
            } else {
                vm.paqueryPoint.currentServices.push(vm.paqueryPoint.currentService);
            }
        }

        function removeZone(elem) {
            vm.paqueryPoint.zones.splice(vm.paqueryPoint.zones.indexOf(elem), 1);
        }

        function getServices() {
            initialPromises.services = $q.defer();
            PaqueryPointService.getServices()
                .then(function (response) {
                    for (var currentService of response.data) {
                        vm.currentServices;
                        vm.currentServices.push(currentService);
                    }
                    vm.paqueryPoint.currentService = vm.currentServices[0];
                    initialPromises.services.resolve();
                });
        }

        function removeService(elem) {
            vm.paqueryPoint.currentServices.splice(vm.paqueryPoint.currentServices.indexOf(elem), 1);
        }


        function watchCountryChanges() {
            $scope.$watch('vm.paqueryPoint.locationAddress.country', function (newVal) {
                if (newVal.id!=undefined) {
                    loadCities(newVal.id);
                }
            });
        }

        function loadCities(countryId) {
            AppTypesService.getCities(countryId)
                .then(function (response) {
                    vm.cities = response.data;
                });
        }

        function isFormValid(form) {
            var valid = true;
            _.forEach(vm.paqueryPoint.workingScheduleTimes, (working) => {
                if (!working.daysOFWeek.length) {
                    vm.errorPP = 'Debe seleccionar al menos un dia de atencíon'
                    valid = false;
                }
                if (working.initHour==undefined && working.finishHour==undefined) {
                    vm.errorPP = 'Horario debe ser de 00  a 23 HS'
                    valid = false;
                }
            });
            return valid;
        }

        function save(form) {
            vm.checkSubmit = true;
            if (isFormValid(form) && form.$valid) {
                if (vm.action === 'update') {
                    updatePaqueryPoint();
                } else {
                    createPaqueryPoint();
                }
            }
        }

        function addDay() {
            if (vm.paqueryPoint.workingScheduleTimes.days.length) {
                for (var i = 0; i < vm.paqueryPoint.workingScheduleTimes.days.length; i++) {
                    if (vm.paqueryPoint.day.value !== vm.paqueryPoint.workingScheduleTimes.days[i].value) {
                        vm.errorPP = false;
                    } else if (vm.paqueryPoint.day.value === vm.paqueryPoint.workingScheduleTimes.days[i].value) {
                        vm.errorPP = "No se pueden ingresar Servicios iguales";
                        return false;
                    }
                }
                if (!vm.errorPP && vm.paqueryPoint.workingScheduleTimes.days.length < vm.days.length) {
                    vm.paqueryPoint.workingScheduleTimes.days.push(vm.paqueryPoint.day);
                }
            } else {
                vm.paqueryPoint.workingScheduleTimes.days.push(vm.paqueryPoint.day);
            }
        }

        function removeDay(elem) {
            vm.paqueryPoint.workingScheduleTimes.days.splice(vm.paqueryPoint.workingScheduleTimes.days.indexOf(elem), 1);
        }
    }
})();
