(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('PickupHistoryController', PickupHistoryController);

    PickupHistoryController.$inject = ['$scope', '$state', 'MarketplaceService', 'PickupService', '$filter', 'DELIVERY_TERM', 'DATE_OPTS', 'UserService', 'ProfileService'];

    function PickupHistoryController($scope, $state, MarketplaceService, PickupService, $filter, DELIVERY_TERM, DATE_OPTS, UserService, ProfileService) {
        var vm = this;
        angular.extend(vm, {
            getPackages: PickupService.getPackagesHistory,
            showPackage: showPackage,
            getParse: getParse,
            getJsonData: getJsonData,
            // getMarketplaces: MarketplaceService.getAll,
            // opts: DATE_OPTS,
            // marketPlace: {id: null},
            // date: {
            //     startDate: null,
            //     endDate: null
            // },
            // checkMPFilterEnabled: checkMPFilterEnabled,
            isPquerView: $state.params.isPaquerView === true ? true : false
        });

        init();

        function init() {
            getPackagesStatus();
            getPackagesTypes();
            getPackagesSizes();
            getMarketplaces();
            // setDatePickers();
            // getPageAdmin();
        }

        function setDatePickers() {
            angular.element('#date-time-picker-1').datetimepicker();
            angular.element("#date-time-picker-1").on("dp.change", function(newVal) {
                vm.filterDate.fromDate = newVal.date._d;
            });
        }

        function getPackagesSizes() {
            PickupService.getPackagesSize()
                .then(function(response) {
                    vm.packagesSizes = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function getPackagesTypes() {
            PickupService.getPackagesTypes()
                .then(function(response) {
                    vm.packagesTypes = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function getPackagesStatus() {
            PickupService.getPackagesStatus()
                .then(function(response) {
                    vm.packagesStatus = response.data;
                })
                .catch(function(error) {

                    console.log(error);
                })
        }

        function showPackage(packageID) {
            PickupService.getPackage(packageID)
                .then(function(response) {
                    $state.go('admin.viewPickupPackage', { obj: response.data });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        $scope.nombreCsv = 'paquetes_historico_' + $filter('date')(new Date(), 'yyyy-MM-dd');

        $scope.headerList = {
            externalCode: 'Externo',
            shippingScheduleOrigin: 'Paquery Point',
            caption: 'Descripción',
            user: 'Usuario',
            creationDate: 'Creación',
            status: 'Estado',
            marketPlaceName: 'Empresa',
            shippingScheduleSendDate: 'Fecha de entrega',
            deliveryTerm: 'Plazo',
            packageSize: 'Tamaño',
            // rollContainerPosition: 'Rollcontainer/Posición',
            originAddress: 'Dirección Origen',
            // destinyComment: 'Destino Comentarios',
            // destinyAddressComment: 'Destino Dir Comentarios'
        };

        function getParse(data) {
            var log = [];
            angular.forEach(data, function (value) {

                var exp = {};
                exp.externalCode = value.externalCode;
                exp.shippingScheduleOrigin = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.name : '';
                exp.caption = value.caption;
                exp.user = value.user ? value.user.email : '';
                exp.creationDate = value.creationDate ? $filter('date')(new Date(value.creationDate), 'dd-MM-yyyy HH:mm:ss') : '';
                exp.status = value.status ? _.findWhere(vm.packagesStatus, { value: value.status }).name : '';
                exp.marketPlaceName = getNameMarketPlaceByPackage(value);
                exp.shippingScheduleSendDate = value.status == 21 ? $filter('date')(new Date(value.cancelationDate), 'dd-MM-yyyy HH:mm:ss') : value.deliveryDate ?
                                                                            $filter('date')(new Date(value.deliveryDate), 'dd-MM-yyyy HH:mm:ss') : '';
                                                                            // (value.shippingScheduleDestination ? $filter('date')(new Date(value.shippingScheduleDestination.scheduledDate), 'dd-MM-yyyy HH:mm:ss')
                                                                            // : '');

                exp.deliveryTerm = value.deliveryTerm ? _.findWhere(DELIVERY_TERM, { value: value.deliveryTerm }).name : '';
                exp.packageSize = _.findWhere(vm.packagesSizes, { value: value.packageSize }).name;
                // exp.rollContainerPosition = value.rollContainerPosition
                //
                exp.originAddress = value.shippingScheduleOrigin.shippingAddress.addressDetail
                // exp.destinyComment = value.shippingScheduleDestination.comment
                // exp.destinyAddressComment = value.shippingAddress ? value.shippingAddress.comment : ""

                this.push(exp);
            }, log);
            return log;
        }

        function getNameMarketPlaceByPackage(paqueryPackage) {
            var found = false;
            var i = 0;
            var marketplace = null;
            while (i < vm.marketplaces.length && !found) {
                if (vm.marketplaces[i].id == paqueryPackage.ownerID
                    && paqueryPackage.ownerType == 40) {
                    marketplace = vm.marketplaces[i];
                    found = true;
                }
                i++;
            }
            return marketplace ? marketplace.name : ' ';
        }

        function getJsonData() {
            var status = vm.packages? vm.packages.status.value: null;
            return vm.getPackages(0,1000000, true, false, undefined, vm.searchWord || null, status || null, null, null, null, vm.date.startDate, vm.date.endDate, vm.marketPlace ? vm.marketPlace.id : null);
        }

        function getMarketplaces() {
            MarketplaceService.getAll(0, 0, true)
                .then(function(response) {
                    vm.marketplaces = response.data;
                    vm.marketplaces.unshift( { name:"Seleccione MarketPlace", id: null });
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

        function getPageAdmin() {
            ProfileService.getUserProfile()
                .then(function (response) {
                    console.log(response);
                    vm.pageAuth = response.data.userRoleActions;
                    vm.userLoggedRoleID = response.data.userRoleID
                    vm.userLoggedID = response.data.id
                });
        }

        function checkMPFilterEnabled() {
            return UserService.allUserRoles().Administrador.id == vm.userLoggedRoleID;
        }

    }

})();
