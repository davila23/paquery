(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('FrontPackagesHistoryController', FrontPackagesHistoryController);

    FrontPackagesHistoryController.$inject = ['$scope','$state', 'FrontPackageService', 'PackagesService','$filter','DELIVERY_TERM'];

    function FrontPackagesHistoryController($scope, $state, FrontPackageService, PackagesService, $filter, DELIVERY_TERM) {
        var vm = this;
        angular.extend(vm, {
            getPackages: FrontPackageService.getPackagesHistory,
            showPackage: showPackage,
            getParse: getParse,
            getJsonData: getJsonData
        });

        init();

        function init() {
            getPackagesStatus();
            getPackagesTypes();
            getPackagesSizes();
            //setDatePickers();
        }

        // function setDatePickers() {
        //     angular.element('#date-time-picker-1').datetimepicker();
        //     angular.element("#date-time-picker-1").on("dp.change", function(newVal) {
        //         vm.filterDate.fromDate = newVal.date._d;
        //     });
        // }

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
                    $state.go('front.viewPackage', { obj: response.data });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        $scope.nombreCsv = 'paquetes_historial' + $filter('date')(new Date(), 'yyyy-MM-dd');

        $scope.headerList = {
            externalCode: 'Externo',
            shippingScheduleDestination: 'Nombre destinatario',
            caption: 'Descripción',
            user: 'Usuario',
            creationDate: 'Creación',
            status: 'Estado',
            marketPlaceName: 'Empresa',
            shippingScheduleSendDate: 'Fecha de entrega',
            deliveryTerm: 'Plazo'
        };

        function getParse(data){
            var log = [];
            angular.forEach(data, function(value) {
                var exp = {};
                exp.externalCode = value.externalCode;
                exp.shippingScheduleDestination = value.shippingScheduleDestination? value.shippingScheduleDestination.name:'';
                exp.caption = value.caption;
                exp.user = value.user? value.user.email: '';
                exp.creationDate = value.creationDate? $filter('date')(new Date(value.creationDate),'dd-MM-yyyy HH:mm:ss'):'';
                exp.status = value.status? _.findWhere(vm.packagesStatus, {value: value.status}).name : '';
                exp.marketPlaceName = value.marketPlace? value.marketPlace.name: '';
                exp.shippingScheduleSendDate = value.shippingScheduleDestination? $filter('date')(new Date(value.shippingScheduleDestination.scheduledDate),'dd-MM-yyyy HH:mm:ss') : '';
                exp.deliveryTerm = value.deliveryTerm? _.findWhere(DELIVERY_TERM, {value: value.deliveryTerm}).name: '';
                this.push(exp);
            },log);
            return log;
        }

        function getJsonData() {
            var status = vm.packages? vm.packages.status.value: null;
            return vm.getPackages(0,100000, true, false, undefined, vm.searchWord || null, status || null, null);
        }

    }

})();
