(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminPackagesHistoryController', AdminPackagesController);

    AdminPackagesController.$inject = ['$scope', '$state', 'MarketplaceService', 'PackagesService', '$filter', 'DELIVERY_TERM', 'DATE_OPTS', 'UserService', 'ProfileService'];

    function AdminPackagesController($scope, $state, MarketplaceService, PackagesService, $filter, DELIVERY_TERM, DATE_OPTS, UserService, ProfileService) {
        var vm = this;
        angular.extend(vm, {
            getPackages: PackagesService.getPackagesHistory,
            showPackage: showPackage,
            getParse: getParse,
            getJsonData: getJsonData,
            getMarketplaces: MarketplaceService.getAll,
            opts: DATE_OPTS,
            marketPlace: {id: null},
            date: {
                startDate: null,
                endDate: null
            },
            checkMPFilterEnabled: checkMPFilterEnabled,
            isPquerView: $state.params.isPaquerView === true ? true : false
        });

        init();

        function init() {
            getPackagesStatus();
            getPackagesTypes();
            getPackagesSizes();
            getMarketplaces();
            setDatePickers();
            getPageAdmin();
        }

        function setDatePickers() {
            angular.element('#date-time-picker-1').datetimepicker();
            angular.element("#date-time-picker-1").on("dp.change", function(newVal) {
                vm.filterDate.fromDate = newVal.date._d;
            });
        }

        function getPackagesSizes() {
            PackagesService.getPackagesSize()
                .then(function(response) {
                    vm.packagesSizes = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function getPackagesTypes() {
            PackagesService.getPackagesTypes()
                .then(function(response) {
                    vm.packagesTypes = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function getPackagesStatus() {
            PackagesService.getPackagesStatus()
                .then(function(response) {
                    vm.packagesStatus = response.data;
                })
                .catch(function(error) {

                    console.log(error);
                })
        }

        function showPackage(obj) {
            PackagesService.getPackage(obj.id)
                .then(function(response) {
                    $state.go('admin.viewPackage', { obj: response.data });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        $scope.nombreCsv = 'paquetes_historico_' + $filter('date')(new Date(), 'yyyy-MM-dd');

        $scope.headerList = {
            externalCode: 'Externo',
            shippingScheduleDestination: 'Nombre destinatario',
            caption: 'Descripción',
            user: 'Usuario',
            creationDate: 'Creación',
            status: 'Estado',
            marketPlaceName: 'Empresa',
            shippingScheduleSendDate: 'Fecha de entrega',
            deliveryTerm: 'Plazo',
            packageSize: 'Tamaño',
            visit1: '1er Visita',
            visit2: '2da Visita',
            rollContainerPosition: 'Rollcontainer/Posición',
            destinyAddress: 'Dirección destino',
            destinyComment: 'Destino Comentarios',
            destinyAddressComment: 'Destino Dir Comentarios'
        };

        if (vm.isPquerView)
        {
            $scope.headerList.Paquer = "Paquer";
            $scope.headerList.PaquerName = "Nombre Paquer";
            $scope.headerList.OriginName = 'Nombre Origen';
            $scope.headerList.OriginAddress = 'Dirección Origen';
        }

        function getParse(data) {
            var log = [];
            angular.forEach(data, function (value) {
                var visit1, visit2 = undefined;
                if (value.visits.length > 0) {
                    visit1 = value.visits[0];
                }
                if (value.visits.length > 1) {
                    visit2 = value.visits[1];
                }

                var exp = {};
                exp.externalCode = value.package.externalCode;
                exp.shippingScheduleDestination = value.shippingScheduleDestination ? value.shippingScheduleDestination.name : '';
                exp.caption = value.package.caption;
                exp.user = value.user ? value.user.email : '';
                exp.creationDate = value.package.creationDate ? $filter('date')(new Date(value.package.creationDate), 'dd-MM-yyyy HH:mm:ss') : '';
                exp.status = value.package.status ? _.findWhere(vm.packagesStatus, { value: value.package.status }).name : '';
                exp.marketPlaceName = value.marketPlace ? value.marketPlace.name : '';
                exp.shippingScheduleSendDate = value.package.status == 21 ? $filter('date')(new Date(value.package.cancelationDate), 'dd-MM-yyyy HH:mm:ss') : value.package.deliveryDate ?
                                                                            $filter('date')(new Date(value.package.deliveryDate), 'dd-MM-yyyy HH:mm:ss') :
                                                                            (value.shippingScheduleDestination ? $filter('date')(new Date(value.shippingScheduleDestination.scheduledDate), 'dd-MM-yyyy HH:mm:ss')
                                                                            : '');

                exp.deliveryTerm = value.package.deliveryTerm ? _.findWhere(DELIVERY_TERM, { value: value.package.deliveryTerm }).name : '';
                exp.packageSize = _.findWhere(vm.packagesSizes, { value: value.package.packageSize }).name;

                exp.visit1 = visit1 ? $filter('date')(new Date(visit1.creationDate), 'dd-MM-yyyy HH:mm:ss') : '';
                exp.visit2 = visit2 ? $filter('date')(new Date(visit2.creationDate), 'dd-MM-yyyy HH:mm:ss') : '';
                exp.rollContainerPosition = value.package.rollContainerPosition

                exp.destinyAddress = value.shippingAddress.addressDetail
                exp.destinyComment = value.shippingScheduleDestination.comment
                exp.destinyAddressComment = value.shippingAddress ? value.shippingAddress.comment : ""

                if (vm.isPquerView) {
                    exp.Paquer = value.driver ? value.driver.email : '';
                    exp.PaquerName = value.driver ? value.driver.name + ' ' + value.driver.lastName : '';

                    exp.OriginName = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.name : '';
                    exp.OriginAddress = value.shippingAddressOrigin ? value.shippingAddressOrigin.addressDetail : '';

                }

                this.push(exp);
            }, log);
            return log;
        }

        function getJsonData() {
            var status = vm.packages? vm.packages.status.value: null;
            return vm.getPackages(0,1000000, true, false, undefined, vm.searchWord || null, status || null, null, null, null, vm.date.startDate, vm.date.endDate, vm.marketPlace.id);
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
                    // console.log(response);
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
