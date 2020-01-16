(function() {
    angular.module('PaQuery')
        .controller('PickupViewController', PickupViewController);

    PickupViewController.$inject = ['$scope', '$state', 'PickupService', '$uibModal', 'PackageUpdatePosition', 'ProfileService', 'UserService', 'DriverService', 'W3wSerice', '$window', '$filter', 'serverErrorsNotifier'];

    function PickupViewController($scope, $state, PickupService, $uibModal, PackageUpdatePosition, ProfileService, UserService, DriverService, W3wSerice, $window, $filter, serverErrorsNotifier) {
        var vm = this,
            paramPackage = $state.params.obj,
            previusUrl = $state.params.previusUrl;
        if (!paramPackage) {
            $state.go('admin.dashboard');
        }
        if (!previusUrl)
        {
            previusUrl = 'admin.pickupPackages';
        }


        getPageAdmin();

        angular.extend(vm, {
            openStatusModal: openStatusModal,
            openPaquersModal : openPaquersModal,
            goBack : goBack,
            showBackgroundMap: true,
            destiny: {
                addressInformation: {
                    stringValue: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.addressDetail : '',
                    location: {
                        lat: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.lat : undefined,
                        lng: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.lng : undefined
                    },
                    address: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.addressDetail : '',
                    w3w: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.geoKey : '',
                    immediately: {
                        status: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.isImmediateDelivery : '',
                        date: paramPackage && paramPackage.shippingScheduleDestination && paramPackage.shippingScheduleDestination.scheduledDate ? moment(paramPackage.shippingScheduleDestination.scheduledDate).format('DD/MM/YYYY hh:mm') : ''
                    }
                }
            },
            origin: {
                addressInformation: {
                    stringValue: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.addressDetail : '',
                    location: {
                        lat: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.lat : '',
                        lng: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.lng : ''
                    },
                    address: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.addressDetail : '',
                    w3w: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.geoKey : '',
                    immediately: {
                        status: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.isImmediateDelivery : '',
                        date: paramPackage && paramPackage.shippingScheduleOrigin ? moment(paramPackage.shippingScheduleOrigin.scheduledDate).format('DD/MM/YYYY hh:mm') : ''
                    }
                }
            },
            package: paramPackage,
            // destinyAddress: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress : '',
            originAddress: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress : '',
            submit: submit,
            checkDisabled: checkDisabled,
            isCanceled: isCanceled,
            criterioDisabledFechas: criterioDisabledFechas,
            criterioDisabledSignature: criterioDisabledSignature,
            updateAddress: updateAddress,
            previusUrl: previusUrl,
            waypoints: [],
            scheduledDate: null,
            scheduledDateRetiro: null
    });

        init();

        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        };

        function dateToString(date) {

            if(!date)
                return date;

            return padStr(date.getDate()) + '/' +
                padStr(1 + date.getMonth()) + '/'+
                date.getFullYear() + " " +
                padStr(date.getHours()) + ':'+
                padStr(date.getMinutes());
        }

        function stringToDate(someString) {
            if (someString.lenght < 10) {
                return null;
            }
            // Verifica si el string es fecha en formato ISO (2016-11-06T03:00:00.000Z)
            // O fecha en nuestro formato (06/11/2016 hh:mm:ss)
            if(someString.split("T").length == 2) {
                var numbers = someString.split("T")[0].match(/\d+/g);
                var hsmmss = someString.split("T")[1].match(/\d+/g);
                //Sumo +3 en las hs porque el servidor devuelve en -3 las fechas
                //hsmmss[0] = padStr(parseInt(hsmmss[0]) + 3);
                return new Date(numbers[0], numbers[1]-1, numbers[2], hsmmss[0], hsmmss[1], hsmmss[2]);
            } else {
                var numbers = someString.match(/\d+/g);
                var hsmmss = someString.match(/\d+/g);
                //Sumo +3 en las hs porque el servidor devuelve en -3 las fechas
                //hsmmss[0] = padStr(parseInt(hsmmss[0]) + 3);
                return new Date(numbers[0], numbers[1]-1, numbers[2], hsmmss[0], hsmmss[1], hsmmss[2]);
            }
        }

        function init() {

            if (vm.originAddress) {
                vm.showOrigin = true;
            }
            if (vm.destinyAddress) {
                vm.showDestiny = true;
            }

            //vm.destiny.datepicker.show = vm.destiny.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
            // if (vm.originAddress && !vm.destinyAddress || !vm.originAddress && vm.destinyAddress) {
            //     vm.singleMarker = true;
            // }

            if (!paramPackage) {
                $state.go("admin.dashboard");
            }

            if (vm.package) {
                vm.initialPackageStatusId = vm.package.status;

                if(vm.package.shippingScheduleDestination && vm.package.shippingScheduleDestination.scheduledDate !== null) { //2018-06-06T13:43:06.967Z"
                    vm.package.shippingScheduleDestination.scheduledDate = moment(vm.package.shippingScheduleDestination.scheduledDate, 'YYYY-MM-DDTHH:mm').subtract(3,'h');
                    vm.scheduledDate = new Date(vm.package.shippingScheduleDestination.scheduledDate);
                    // vm.package.shippingScheduleDestination.scheduledDate ? stringToDate(vm.package.shippingScheduleDestination.scheduledDate) : '';
                }

                if(vm.package.shippingScheduleOrigin){
                    vm.package.shippingScheduleOrigin.scheduledDate = moment(vm.package.shippingScheduleOrigin.scheduledDate, 'YYYY-MM-DDTHH:mm').subtract(3,'h');
                    vm.scheduledDateRetiro = new Date(vm.package.shippingScheduleOrigin.scheduledDate);
                    //vm.package.shippingScheduleOrigin.scheduledDate ? stringToDate(vm.package.shippingScheduleOrigin.scheduledDate) : '';
                    //vm.scheduledDateRetiro = vm.package.shippingScheduleOrigin.scheduledDate? stringToDate(vm.package.shippingScheduleOrigin.scheduledDate): '';
                }

                if (vm.package.deliveryDate)
                {
                    vm.package.deliveryDate = new Date(moment(vm.package.deliveryDate, 'YYYY-MM-DDTHH:mm').subtract(3, 'h'));

                    //vm.package.deliveryDate = stringToDate(vm.package.deliveryDate);
                }

                getPackageSizes();
                getPackageTypes();
                getPosiblePackagesStatus();
            }

            //Datepicker
            vm.onDateSetDestiny = function($dates, newDate, oldDate){
              vm.destiny.addressInformation.immediately.date = moment(vm.date.destiny).format('DD/MM/YYYY hh:mm');
              vm.destiny.datepicker.open = false;
              angular.element('.input-date#dateDestiny').addClass('fg-toggled');
              $scope.$broadcast('origin-date-changed');
            };

            if (paramPackage && paramPackage.shippingScheduleDestination && paramPackage.shippingScheduleDestination.shippingAddress) {
                vm.showDestinyW3W = paramPackage.shippingScheduleDestination.shippingAddress.geoKey && paramPackage.shippingScheduleDestination.shippingAddress.addressDetail === "";
            }
        }
        $scope.$watch('vm.destiny.datepicker.open', function (newValue) {
            try{
                vm.destiny.datepicker.show = vm.destiny.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
            }catch(e){}
        });

        function getPackageSizes() {
            PickupService.getPackagesSize().then(function(response) {
                vm.packageSizes = response.data;
                for (var i = 0; i < vm.packageSizes.length; i++) {
                    if (vm.packageSizes[i].value === vm.package.packageSize) {
                        vm.package.packageSize = vm.packageSizes[i];
                        if (vm.package.packageSize.name === 'Personalizado') {
                            vm.showRateInput = true;
                            vm.startRate = vm.package.rate;
                            if (vm.package.rate) {
                                vm.packageRate = vm.package.rate;
                            }
                            if (vm.package.currentPackageStatus && vm.package.currentPackageStatus.name === 'Pendiente') {
                                vm.disablePackageStatus = true;
                                vm.disableRateInput = false;
                            } else {
                                vm.disableRateInput = true;
                                vm.disablePackageStatus = false;
                            }
                        }
                    }
                }
            }, function(error) {
                console.log(error);
            });
        }

        function getPackageTypes() {
            PickupService.getPackagesTypes().then(function(response) {
                vm.packagesTypes = response.data;

                for (var i = 0; i < vm.packagesTypes.length; i++) {
                    if (vm.packagesTypes[i].value === vm.package.packageType) {
                        vm.package.currentType = vm.packagesTypes[i];
                    }
                }

                if (vm.package.currentType && vm.package.currentType.value === 1 && vm.package.shippingScheduleDestination.driver) {
                  vm.package.driverNotExist = false;
                  // vm.package.driver = vm.package.shippingScheduleDestination.driver;
                  // vm.package.driverImg = vm.package.shippingScheduleDestination.driver.avatar;
                }else if (vm.package.currentType && vm.package.currentType.value === 2 && vm.package.shippingScheduleDestination.driver) {
                  vm.package.driverNotExist = false;
                  vm.package.driver = vm.package.shippingScheduleOrigin.driver;
                  vm.package.driverImg = vm.package.shippingScheduleOrigin.driver.avatar;
                }else {
                  vm.package.driverNotExist = true;
                  vm.package.driver =  "No tiene asignado un paquer";
                  vm.package.driverImg = "";
                }

            }, function(error) {
                console.log(error);
            });
        }

        function getPosiblePackagesStatus() {
            PickupService.getPosiblePackagesStatus(vm.package.id)
                .then(function(response) {
                    vm.packagesStatus = response.data;
                    for (var i = 0; i < vm.packagesStatus.length; i++) {
                        if (vm.packagesStatus[i].value === vm.package.status) {
                            vm.initialPackageStatusName = vm.packagesStatus[i].name;
                            vm.package.currentPackageStatus = vm.packagesStatus[i];
                            var statusName = vm.package.currentPackageStatus.name;
                            var customSizeAndPending = (vm.package.packageSize && vm.package.packageSize.name === 'Personalizado' && statusName === 'Pendiente');
                            if (statusName === 'Cancelado' || statusName === 'Entregado' || customSizeAndPending) {
                                //vm.disablePackageStatus = true;
                                if (customSizeAndPending) {
                                    vm.disableRateInput = false;
                                }
                            } else {
                                vm.disableRateInput = true;
                                vm.disablePackageStatus = false;
                            }
                        }
                    };
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openStatusModal() {
            vm.showBackgroundMap = false;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/admin/packages/packageStatus/packageStatus.html',
                controller: 'AdminPackageStatusController',
                controllerAs: 'vm',
                size: 'modal-lg',
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    package: function() {
                        return vm.package;
                    }
                }
            });
            modalInstance.result.then(function() {
                vm.showBackgroundMap = true;
            });

        }

        function goBack() {
            return $window.history.back();
        }

        function modalInstances(attributes) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/shared/paginableSelector/paginableSelector.html',
                controller: 'PaginableSelectorController',
                controllerAs: 'vm',
                size: 'modal-lg',
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    statusID: function () {
                        return 1;
                    },
                    params: function () {
                        return  {}
                    },
                    getListFunction: function () {
                        return DriverService.getDrivers;
                    },
                    attributes: attributes,
                    elementName: function () {
                        return 'paquer';
                    }
                }
            });

            modalInstance.result.then(function (user) {
                 vm.package.selectedPaquer = user;
            });

        }

        function openPaquersModal() {
            var attributes = function () {
                return [{
                    title: 'Nombre',
                    field: 'name'
                }, {
                    title: 'Apellido',
                    field: 'lastName'
                }, {
                    title: 'Email',
                    field: 'email'
                }];
            }

            modalInstances(attributes);
        }

        function updateAddress(target)
        {
            if (target == "destiny") {
                if (vm.destiny.addressInformation.address) {
                    W3wSerice.getByAddress(vm.destiny.addressInformation.address)
                        .then(function (response) {
                            //vm.destiny.addressInformation.w3w = response.data.words;
                            angular.element("#w3w-destiny-input").val(response.data.words)
                            vm.destiny.addressInformation.w3w = response.data.words
                        });
                }
            }
            else
            {
                if (vm.origin.addressInformation.address) {
                    W3wSerice.getByAddress(vm.origin.addressInformation.address)
                       .then(function (response) {
                           //vm.origin.addressInformation.w3w = response.data.words;
                           angular.element("#w3w-origin-input").val(response.data.words)
                           vm.origin.addressInformation.w3w = response.data.words
                       });
                }
            }
        }

        function submit() {
            if ((vm.package.currentPackageStatus.value == 21 || vm.package.currentPackageStatus.value == 40) && (!vm.package.reason || vm.package.reason==''))
            {
                serverErrorsNotifier.notify('El campo Motivo es obligatorio.');
                return;
            }

            // vm.package.shippingScheduleDestination.shippingAddress.addressDetail = angular.element("#destiny-address").val();
            // vm.package.shippingScheduleDestination.shippingAddress.geoKey = angular.element("#w3w-destiny-input").val();

            vm.package.shippingScheduleDestination.shippingAddress.addressDetail = vm.destiny.addressInformation.address;
            vm.package.shippingScheduleDestination.shippingAddress.geoKey = vm.destiny.addressInformation.w3w;


            // vm.package.shippingScheduleDestination.scheduledDate = vm.destiny.addressInformation.immediately.date;
            vm.package.shippingScheduleDestination.scheduledDate = vm.scheduledDate ? vm.scheduledDate : null; //dateToString(vm.scheduledDate);
            // if (vm.package.selectedPaquer)
            // {
            //     vm.package.shippingScheduleDestination.driverID = vm.package.selectedPaquer.id;
            // }
            if (vm.package.shippingScheduleOrigin)
            {
                // vm.package.shippingScheduleOrigin.shippingAddress.addressDetail = angular.element("#origin-address").val();
                // vm.package.shippingScheduleOrigin.shippingAddress.geoKey = angular.element("#w3w-origin-input").val();

                vm.package.shippingScheduleOrigin.shippingAddress.addressDetail = vm.origin.addressInformation.address;
                vm.package.shippingScheduleOrigin.shippingAddress.geoKey = vm.origin.addressInformation.w3w;
                // vm.package.shippingScheduleOrigin.scheduledDate = vm.origin.addressInformation.immediately.date;
                vm.package.shippingScheduleOrigin.scheduledDate = vm.scheduledDateRetiro; //dateToString(vm.scheduledDateRetiro);
                // if (vm.package.selectedPaquer) {
                //     vm.package.shippingScheduleOrigin.driverID = vm.package.selectedPaquer.id;
                // }
            }

            // PickupService.updatePackageFromAdmin(vm.package.id, vm.package.packageType, vm.package.caption, vm.package.detail, vm.package.stimatedCost, vm.package.externalCode, vm.package.packageSize.value, vm.package.currentPackageStatus.value, vm.packageRate,
            //     vm.package.shippingScheduleDestination, vm.package.shippingScheduleOrigin, vm.package.reason)

            PickupService.updatePackageFromAdminV2( {
                packageId: vm.package.id,
                packageType: vm.package.packageType, caption: vm.package.caption, detail: vm.package.detail,
                stimatedCost: vm.package.stimatedCost, externalPackageNumber: vm.package.externalCode,
                packageSize: vm.package.packageSize.value, packageStatus: vm.package.currentPackageStatus.value,
                rate: vm.packageRate,
                shippingScheduleDestination: vm.package.shippingScheduleDestination,
                shippingScheduleOrigin: vm.package.shippingScheduleOrigin,
                reason: vm.package.reason,
                signatureImage: vm.package.signatureImage, signatureFileName: vm.package.signatureFileName })
                             .then(function (response) {
                                 //$state.go('admin.packages');
                                 if (vm.previusUrl=='admin.driver')
                                 {
                                     $state.go(vm.previusUrl, { driver: vm.package.driver });
                                 }
                                 else
                                 {
                                     $state.go(vm.previusUrl);
                                 }
                             })
                                .catch(function (error) {
                                    console.log(error);
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

        function checkDisabled() {
            return UserService.allUserRoles().Administrador.id != vm.userLoggedRoleID && UserService.allUserRoles().AdministradorOPL.id != vm.userLoggedRoleID;
        }

        function criterioDisabledFechas() {
            var disabled = true;
            if(vm.package){
                disabled = vm.package.status === 21 || vm.package.status === 20;
            }
            return disabled;
        }

        function criterioDisabledSignature() {
            var show = false;
            if (vm.package) {
                show = vm.package.status === 20;
            }
            return show;
        }

        function isCanceled() {
            var show = false;
            if (vm.package && vm.package.currentPackageStatus) {
                show = vm.package.currentPackageStatus.value === 21 || vm.package.currentPackageStatus.value === 40;
            }
            return show;
        }
    }
})();
