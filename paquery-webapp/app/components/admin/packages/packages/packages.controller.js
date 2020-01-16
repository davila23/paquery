(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminPackagesController', AdminPackagesController);

    AdminPackagesController.$inject = ['PackagesService', '$state', '$http', 'UrlHelper', '$scope', '$filter', 'DELIVERY_TERM','ProfileService'];

    function AdminPackagesController(PackagesService, $state, $http, UrlHelper, $scope, $filter, DELIVERY_TERM, ProfileService) {
        var vm = this;
        angular.extend(vm, {
            getPackages: getPackages,//PackagesService.getPage,
            showAddressDetails: showAddressDetails,
            deletePackage:deletePackage,
            cancelPackage:cancelPackage,
            showPackage: showPackage,
            getParse: getParse,
            getJsonData: getJsonData,
            authentication: authentication,
            refreshPackages: refreshPackages,
            labelPackage: labelPackage,
        });

        init();


        function getPackages(page, take, desc, isScheduled, userId, search, status, sortColumn, city) {
            var searchArrived = vm.searchArrived;
            if (!searchArrived)
            {
                searchArrived = "";
            }
            angular.element("#input2").val("");
            vm.searchArrived = "";

            return PackagesService.getPage(page, take, desc, isScheduled, userId, search, status, sortColumn, city, searchArrived);

        }

        function init() {
            getUserProfile();
            getPackagesStatus();
            getPackagesTypes();
            getPackagesSizes();
            getDeliveryTerms();

        }

        function labelPackage(id) {
            PackagesService.labelPackage(id);
        }

        function getDeliveryTerms() {
            vm.deliveryTerms = DELIVERY_TERM;
        }

        function getPackagesStatus() {
            PackagesService.getPackagesStatus()
                .then(function(response) {
                    vm.packagesStatus = response.data.filter(function(item) {
                        return item.name !== 'Cancelado' && item.name !== 'Entregado';
                    });
                    vm.packagesStatus.unshift( { name:"Todos", value: null });
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

        function getPackagesSizes() {
            PackagesService.getPackagesSize()
                .then(function(response) {
                    vm.packagesSizes = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function showPackage(obj) {
            var photo = obj.avatar;
                 PackagesService.getPackage(obj.id)
                .then(function(response) {
                    response.data.avatar = photo;
                    $state.go('admin.viewPackage', { obj: response.data });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function showAddressDetails(pack) {
            if (pack && pack.shippingScheduleDestination && pack.shippingScheduleDestination.distributionZone)
                return pack.shippingScheduleDestination.shippingAddress.addressDetail + ' #(' + pack.shippingScheduleDestination.distributionZone.description + ')';

            return pack.shippingScheduleDestination.shippingAddress.addressDetail;
        }

        function cancelPackage(packageId) {
            PackagesService.cancelPackageById(packageId).then(function () {
                $state.reload();
            });
        }

        function deletePackage(packageId) {
          PackagesService.deletePackage(packageId).then(function () {
            $state.reload();
          });
        }

        $scope.nombreCsv = 'paquetes_' + $filter('date')(new Date(), 'yyyy-MM-dd');

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
            rollContainerPosition: 'Rollcontainer/Posición',
            originName: 'Nombre Origen',
            originAddress: 'Dirección Origen',
            destinyAddress: 'Dirección destino',
            destinyComment: 'Destino Comentarios',
            destinyAddressComment: 'Destino Dir Comentarios'
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
                    exp.deliveryTerm = value.deliveryTerm ? _.findWhere(DELIVERY_TERM, { value: value.deliveryTerm }).name : '';
                    exp.rollContainerPosition = value.rollContainerPosition

                    exp.destinyAddress = value.shippingScheduleDestination.shippingAddress.addressDetail
                    exp.destinyComment = value.shippingScheduleDestination.comment
                    exp.destinyAddressComment = value.shippingScheduleDestination.shippingAddress ? value.shippingScheduleDestination.shippingAddress.comment : ""

                    exp.originName = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.name : '';
                    exp.originAddress = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.shippingAddress.addressDetail : '';

                    this.push(exp);
                },log);
                return log;
        }

        function getJsonData() {
            var status = vm.packages? vm.packages.status.value: null;
            return vm.getPackages(0,100000, true, false, undefined, vm.searchWord || null, status || null, null);
        }

        function getUserProfile() {
            ProfileService.getUserProfile()
                .then(function (response) {
                    vm.getUserFinish = true;
                    vm.paqueryAdmin = response.data.mainPaqueryAdmin;
                    vm.authPageRol = response.data.userRoleActions;
                    vm.auth = vm.authPageRol.length > 0;
                    vm.userName = response.data.name + ' ' + response.data.lastName;
                    vm.profilePicture = response.data.avatarImg;
                    vm.user = response.data;
                });
        }

        function authentication(viewPermison) {
            try {
                return (vm.authPageRol.includes(viewPermison) || vm.authPageRol.length==0)
            } catch (e) {
                return false;
            }
        }

        function refreshPackages() {
            $state.reload();
        }
    }

})();
