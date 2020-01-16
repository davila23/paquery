(function () {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminLogOpController', AdminLogisticOperatorController);

    AdminLogisticOperatorController.$inject = ['$state', '$stateParams', 'LogisticOperatorService', 'MarketplaceService', 'zonesService', 'PaqueryPointService'];

    function AdminLogisticOperatorController($state, $stateParams, LogisticOperatorService, MarketplaceService, zonesService, PaqueryPointService) {
        var vm = this;

        angular.extend(vm, {
            logisticOperator: $stateParams.logisticOperator || {zones: [], paqueryPoints: []},
            paqueryPoints: [],
            zones: [],
            action: $stateParams.logisticOperator ? 'update' : 'save',
            save: save,
            addZone: addZone,
            removeZone: removeZone,
            addMarketplace: addMarketplace,
            removeMP: removeMP,
            getPaqueryPoints: getPaqueryPoints,
            removePaqueryPoint: removePaqueryPoint,
            addPaqueryPoint: addPaqueryPoint
        });

        init();

        function init() {
            getMarketPlaces();
            getZones();
            getPaqueryPoints();
            if (vm.action === 'create') {
                vm.logisticOperator.marketplaces = [];
                vm.logisticOperator.zones = [];
                vm.logisticOperator.paqueryPoints = [];
            }
        }

        function getMarketPlaces() {
            MarketplaceService.getAll(0, 0, true)
                .then(function (response) {
                    var found = false;
                    vm.marketplaces = response.data;
                    for (var i = 0; i < vm.marketplaces.length; i++) {
                        if (vm.marketplaces[i].id === vm.logisticOperator.marketplaceID) {
                            vm.logisticOperator.marketplace = vm.marketplaces[i];
                            found = true;
                        }
                    }
                    if (!found) {
                        vm.logisticOperator.marketplace = vm.marketplaces[0];
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function createLogisticOperators() {
            // var idsLO = [];
            // for (var lO of vm.logisticOperator.marketplaces) {
            //   idsLO.push({id:lO.id});
            // }
            LogisticOperatorService.create(vm.logisticOperator.name, vm.logisticOperator.detail, vm.logisticOperator.phone, vm.logisticOperator.contactName, /*idsLO,*/ vm.logisticOperator.published, vm.logisticOperator.isPrivate, vm.logisticOperator.zones,vm.logisticOperator.paqueryPoints)
                .then(function (response) {
                    $state.go("admin.logisticOperators");
                });
        }

        function updateLogisticOperators() {
            // var idsLO = [];
            // for (var lO of vm.logisticOperator.marketplaces) {
            //   idsLO.push({id:lO.id});
            // }
            LogisticOperatorService.update(vm.logisticOperator.id, vm.logisticOperator.name, vm.logisticOperator.detail, vm.logisticOperator.phone, vm.logisticOperator.contactName, /*idsLO,*/ vm.logisticOperator.published, vm.logisticOperator.isPrivate, vm.logisticOperator.zones,vm.logisticOperator.paqueryPoints)
                .then(function (response) {
                    $state.go("admin.logisticOperators");
                });
        }

        function addMarketplace() {
            if (vm.logisticOperator.marketplaces.length) {
                for (var i = 0; i < vm.logisticOperator.marketplaces.length; i++) {
                    if (vm.logisticOperator.marketplace.id !== vm.logisticOperator.marketplaces[i].id) {
                        vm.errorOPL = false;
                    } else if (vm.logisticOperator.marketplace.id === vm.logisticOperator.marketplaces[i].id) {
                        vm.errorOPL = "No se pueden ingresar Marketplaces iguales";
                        return false;
                    }
                }
                if (!vm.errorOP && vm.logisticOperator.marketplaces.length < vm.marketplaces.length) {
                    vm.logisticOperator.marketplaces.push(vm.logisticOperator.marketplace);
                }
            } else {
                vm.logisticOperator.marketplaces.push(vm.logisticOperator.marketplace);
            }
        }

        function removeMP(elem) {
            vm.logisticOperator.marketplaces.splice(vm.logisticOperator.marketplaces.indexOf(elem), 1);
        }

        function save(form) {
            vm.checkSubmit = true;
            if (form.$valid) {
                if (vm.action === 'update') {
                    updateLogisticOperators();
                } else {
                    createLogisticOperators();
                }
            }
        }


        function getZones() {
            zonesService.getZones(0, 100, false).then(function (response) {
                for (var zone of response.data) {
                    vm.zones;
                    vm.zones.push(zone);
                }
                vm.logisticOperator.zone = vm.zones[0];
            })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function addZone() {
            if (vm.logisticOperator.zones.length) {
                for (var i = 0; i < vm.logisticOperator.zones.length; i++) {
                    if (vm.logisticOperator.zone.id !== vm.logisticOperator.zones[i].id) {
                        vm.errorOPL = false;
                    } else if (vm.logisticOperator.zone.id === vm.logisticOperator.zones[i].id) {
                        vm.errorOPL = "No se pueden ingresar Zonas iguales";
                        return false;
                    }
                }
                if (!vm.errorOPL && vm.logisticOperator.zones.length < vm.zones.length) {
                    vm.logisticOperator.zones.push(vm.logisticOperator.zone);
                }
            } else {
                vm.logisticOperator.zones.push(vm.logisticOperator.zone);
            }
        }

        function removeZone(elem) {
            vm.logisticOperator.zones.splice(vm.logisticOperator.zones.indexOf(elem), 1);
        }


        function getPaqueryPoints() {
            PaqueryPointService.getAll().then(function (response) {
                for (var point of response.data) {
                    vm.paqueryPoints;
                    vm.paqueryPoints.push(point);
                }
                vm.logisticOperator.paqueryPoint = vm.paqueryPoints[0];
            })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function addPaqueryPoint() {
            if (vm.logisticOperator.paqueryPoints.length) {
                for (var i = 0; i < vm.logisticOperator.paqueryPoints.length; i++) {
                    if (vm.logisticOperator.paqueryPoint.id !== vm.logisticOperator.paqueryPoints[i].id) {
                        vm.errorOPL = false;
                    } else if (vm.logisticOperator.paqueryPoint.id === vm.logisticOperator.paqueryPoints[i].id) {
                        vm.errorOPL = "No se pueden ingresar PaqueryPoints iguales";
                        return false;
                    }
                }
                if (!vm.errorOPL && vm.logisticOperator.paqueryPoints.length < vm.paqueryPoints.length) {
                    vm.logisticOperator.paqueryPoints.push(vm.logisticOperator.paqueryPoint);
                }
            } else {
                vm.logisticOperator.paqueryPoints.push(vm.logisticOperator.paqueryPoint);
            }
        }

        function removePaqueryPoint(elem) {
            vm.logisticOperator.paqueryPoints.splice(vm.logisticOperator.paqueryPoints.indexOf(elem), 1);
        }
    }
})();
