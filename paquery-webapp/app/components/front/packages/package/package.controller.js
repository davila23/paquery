(function() {
    angular.module('PaQuery')
        .controller('FrontViewPackageController', FrontViewPackageController);

    FrontViewPackageController.$inject = ['$scope', '$state', 'FrontPackageService', '$uibModal', 'ProfileService', 'FrontPaymentsService', 'PackageUpdatePosition', 'URLMP', '$window'];

    function FrontViewPackageController($scope, $state, FrontPackageService, $uibModal, ProfileService, FrontPaymentsService, PackageUpdatePosition, URLMP, $window) {
        var vm = this,
            paramPackage = $state.params.obj;

        if (!paramPackage) {
            $state.go('front.dashboard');
        }

        angular.extend(vm, {
            update: update,
            goBack: goBack,
            date: {
                destiny: '',
                origin: '',
                update: false
            },
            openStatusModal: openStatusModal,
            showBackgroundMap: true,
            //singleMarker: paramPackage.shippingScheduleOrigin ?
            destiny: {
                datepicker: {
                    open: false
                },
                addressInformation: {
                    address: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.addressDetail : '',
                    location: {
                        lat: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.lat : undefined,
                        lng: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.lng : undefined
                    },
                    w3w: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress.geoKey : '',
                    immediately: {
                        status: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.isImmediateDelivery : '',
                        date: paramPackage && paramPackage.shippingScheduleDestination ? moment(paramPackage.shippingScheduleDestination.scheduledDate).format('DD/MM/YYYY hh:mm') : ''
                    }
                },
            },
            origin: {
                datepicker: {
                    open: false
                },
                addressInformation: {
                    address: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.addressDetail : '',
                    location: {
                        lat: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.lat : '',
                        lng: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.lng : ''
                    },
                    w3w: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress.geoKey : '',
                    immediately: {
                        status: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.isImmediateDelivery : '',
                        date: paramPackage && paramPackage.shippingScheduleOrigin ? moment(paramPackage.shippingScheduleOrigin.scheduledDate).format('DD/MM/YYYY hh:mm') : ''
                    }
                },
            },
            package: paramPackage,
            destinyAddress: paramPackage && paramPackage.shippingScheduleDestination ? paramPackage.shippingScheduleDestination.shippingAddress : '',
            originAddress: paramPackage && paramPackage.shippingScheduleOrigin ? paramPackage.shippingScheduleOrigin.shippingAddress : '',
            openMLModal: openMLModal,
            criterioDisabledFechas: criterioDisabledFechas
        });

        init();

        function init() {
            vm.urlMP = URLMP;
            if (vm.originAddress) {
                vm.showOrigin = true;
            }
            if (vm.destinyAddress) {
                vm.showDestiny = true;
            }
            vm.destiny.datepicker.show = vm.destiny.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
            vm.origin.datepicker.show = vm.origin.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
            
            if (!paramPackage) {
                $state.go("front.dashboard");
            }

            if (vm.package) {

                if(vm.package.shippingScheduleDestination){
                    vm.package.shippingScheduleDestination.scheduledDate = moment(vm.package.shippingScheduleDestination.scheduledDate, 'YYYY-MM-DDTHH:mm').subtract(3,'h');
                    vm.scheduledDate = new Date(vm.package.shippingScheduleDestination.scheduledDate);
                    // vm.scheduledDate = vm.package.shippingScheduleDestination.scheduledDate? stringToDate(vm.package.shippingScheduleDestination.scheduledDate): '';
                }


                if(vm.package.shippingScheduleOrigin){
                    vm.package.shippingScheduleOrigin.scheduledDate= moment(vm.package.shippingScheduleOrigin.scheduledDate, 'YYYY-MM-DDTHH:mm').subtract(3,'h');
                    vm.scheduledDateRetiro = new Date(vm.package.shippingScheduleOrigin.scheduledDate);
                    // vm.scheduledDateRetiro = vm.package.shippingScheduleOrigin.scheduledDate? stringToDate(vm.package.shippingScheduleOrigin.scheduledDate): '';
                }

                //Geolocalization of the Package
                PackageUpdatePosition.updatePosition(vm.package.id);

                vm.package.driver = vm.package.shippingScheduleDestination.driver ? vm.package.shippingScheduleDestination.driver.name + " " + vm.package.shippingScheduleDestination.driver.lastName : "No tiene asignado un paquer";
                vm.package.driverRating = vm.package.shippingScheduleDestination.driver ? vm.package.shippingScheduleDestination.driver.rating  : "";
                getPackageSizes();
                getPackageTypes();
                getPackagesStatus();
            }

            if (paramPackage.shippingScheduleDestination && paramPackage.shippingScheduleDestination.shippingAddress) {
                vm.showDestinyW3W = paramPackage.shippingScheduleDestination.shippingAddress.geoKey && paramPackage.shippingScheduleDestination.shippingAddress.addressDetail === "";
            }

            //datepicker
            vm.onDateSetDestiny = function($dates, newDate, oldDate) {
                vm.destiny.addressInformation.immediately.date = moment(vm.date.destiny).format('DD/MM/YYYY hh:mm');
                vm.destiny.datepicker.open = false;
                angular.element('.input-date#dateDestiny').addClass('fg-toggled');
                vm.date.update = true;
                $scope.$broadcast('destiny-date-changed');
            };

            vm.onDateSetOrigin = function($dates, newDate, oldDate) {
                debugger;
                vm.origin.addressInformation.immediately.date = moment(vm.date.origin).format('DD/MM/YYYY hh:mm');
                vm.origin.datepicker.open = false;
                angular.element('.input-date#dateDestiny').addClass('fg-toggled');
                vm.date.update = true;
                $scope.$broadcast('origin-date-changed');
            };

            vm.beforeDateSetDestiny = function($view, $dates) {
                if (vm.date.origin) {
                    $dates.utcDateValue = 0;
                    var activeDate = moment().subtract(1, $view).add(1, 'minute');;
                    $dates.filter(function(date) {
                        return date.localDateValue() <= activeDate.valueOf()
                    }).forEach(function(date) {
                        date.selectable = false;
                    })
                }

            };

            vm.beforeDateSetOrigin = function($dates, $view) {
                $dates.utcDateValue = 0;
                var activeDate = moment().subtract(1, $view).add(1, 'minute');
                $dates.filter(function(date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function(date) {
                    date.selectable = false;
                })
            }

            
        }
        $scope.$watch('vm.destiny.datepicker.open', function(newValue) {
            vm.destiny.datepicker.show = vm.destiny.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };

        });
        $scope.$watch('vm.origin.datepicker.open', function(newValue) {
            vm.origin.datepicker.show = vm.origin.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
        });

        function getPackageSizes() {
            FrontPackageService.getPackagesSize().then(function(response) {
                vm.packageSizes = response.data;

                for (var i = 0; i < vm.packageSizes.length; i++) {
                    if (vm.packageSizes[i].value === vm.package.packageSize) {
                        vm.package.packageSize = vm.packageSizes[i];
                    }
                }
            }, function(error) {
                console.log(error);
            });
        }

        function getPackageTypes() {
            FrontPackageService.getPackagesTypes().then(function(response) {
                vm.packagesTypes = response.data;

                for (var i = 0; i < vm.packagesTypes.length; i++) {
                    if (vm.packagesTypes[i].value === vm.package.packageType) {
                        vm.package.currentType = vm.packagesTypes[i];
                    }
                }
                if (vm.package.currentType.value === 1 && vm.package.shippingScheduleDestination.driver) {
                    vm.package.driver = vm.package.shippingScheduleDestination.driver.name + " " + vm.package.shippingScheduleDestination.driver.lastName;
                    vm.package.driverImg = vm.package.shippingScheduleDestination.driver.avatar;
                } else if (vm.package.currentType.value === 2 && vm.package.shippingScheduleDestination.driver) {
                    vm.package.driver = vm.package.shippingScheduleOrigin.driver.name + " " + vm.package.shippingScheduleDestination.driver.lastName;
                    vm.package.driverImg = vm.package.shippingScheduleOrigin.driver.avatar;
                } else {
                    vm.package.driver = "No tiene asignado un paquer";
                    vm.package.driverImg = "";
                }
            }, function(error) {
                console.log(error);
            });
        }

        function getPackagesStatus() {
            FrontPackageService.getPackagesStatus()
                .then(function(response) {
                    vm.packagesStatus = response.data;
                    for (var i = 0; i < vm.packagesStatus.length; i++) {
                        if (vm.packagesStatus[i].value === vm.package.status) {
                            vm.package.currentPackageStatus = vm.packagesStatus[i];
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
                templateUrl: 'components/front/packages/packageStatus/packageStatus.html',
                controller: 'FrontPackageStatusController',
                controllerAs: 'vm',
                size: 'modal-lg',
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    package: function() {
                        return vm.package;
                    }
                }
            })

            modalInstance.result.then(function() {
                vm.showBackgroundMap = true;
            });
        }

        function openMpIframe(iFrameUrl) {
            $MPC.openCheckout({
                url: iFrameUrl,
                mode: "modal",
                onreturn: function(json) {
                    if (json.collection_status == 'approved') {
                        window.stop();
                        var type = vm.package.currentType.value === 1 ? 3 : 2;
                        FrontPackageService.changeStatus(vm.package.id, type)
                            .then(function(response) {
                                unListenBrowserClose();
                                $state.go('front.dashboard');
                            });
                    } else if (json.collection_status == 'pending') {
                        unListenBrowserClose();
                        serverErrorsNotifier.notify('El usuario no completó el pago');
                    } else if (json.collection_status == 'in_process') {
                        unListenBrowserClose();
                        serverErrorsNotifier.notify('El pago está siendo revisado');
                    } else if (json.collection_status == 'rejected') {
                        unListenBrowserClose();
                        serverErrorsNotifier.notify('El pago fué rechazado, el usuario puede intentar nuevamente el pago');
                    } else if (json.collection_status == null) {
                        unListenBrowserClose();
                        serverErrorsNotifier.notify('El usuario no completó el proceso de pago, no se ha generado ningún pago');
                    }
                }
            });
        }

        function listenBrowserClose() {
            $(window).bind('beforeunload', function(event) {
                var errorText = 'No debe cerrar el navegador. En este momento estamos procesando su pedido.';
                event.returnValue = errorText;
                return errorText;
            });
        }

        function unListenBrowserClose() {
            $(window).unbind('beforeunload');
        }

        function modalConfirmation() {
            $scope.text = "Se pagará el paquete con su saldo actual";
            var modalConfirmation = $uibModal.open({
                animation: true,
                templateUrl: 'components/front/shared/confirmationPayment/confirmationPayments.html',
                controller: 'FrontConfiationPaymentsController',
                controllerAs: 'vm',
                size: 'modal-sm',
                scope: $scope,
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    time: function() {
                        // console.log($scope.data);
                        return $scope.time;
                    }
                }
            });
            return modalConfirmation.result;
        }

        function openMLModal() {
            var type = vm.package.currentType.value === 1 ? 3 : 2;
            ProfileService.getMPAmount().then(function(data) {
                if (data.data < vm.package.rate) {
                    FrontPackageService.getMpLinkByStatus(vm.package.id, vm.package.status)
                        .then(function(response) {
                            listenBrowserClose();
                            openMpIframe(response.data.init_point);
                        });
                } else {
                    modalConfirmation().then(function(exito) {
                        vm.modalConfirmationMessage = exito;
                        if (vm.modalConfirmationMessage) {

                            FrontPaymentsService.decreaseAmount(vm.package.id, vm.package.rate)
                                .then(function(data) {
                                    FrontPackageService.changeStatus(vm.package.id, type)
                                        .then(function(response) {
                                            unListenBrowserClose();
                                            $state.go('front.dashboard');
                                        });
                                });
                        }
                    });
                }
            });
        }

        function update() {
            vm.package.shippingScheduleDestination.shippingAddress.addressDetail = vm.destiny.addressInformation.address; // angular.element("#destiny-address").val();
            vm.package.shippingScheduleDestination.shippingAddress.geoKey = vm.destiny.addressInformation.w3w //  angular.element("#w3w-destiny-input").val();
            // vm.package.shippingScheduleDestination.scheduledDate = vm.destiny.addressInformation.immediately.date;
            vm.package.shippingScheduleDestination.scheduledDate = vm.scheduledDate; //dateToString(vm.scheduledDate);
            if (vm.package.selectedPaquer)
            {
                vm.package.shippingScheduleDestination.driverID = vm.package.selectedPaquer.id;
            }
            if (vm.package.shippingScheduleOrigin)
            {
                vm.package.shippingScheduleOrigin.shippingAddress.addressDetail = vm.origin.addressInformation.address // angular.element("#origin-address").val();
                vm.package.shippingScheduleOrigin.shippingAddress.geoKey = vm.origin.addressInformation.w3w //angular.element("#w3w-origin-input").val();
                // vm.package.shippingScheduleOrigin.scheduledDate = vm.origin.addressInformation.immediately.date;
                vm.package.shippingScheduleOrigin.scheduledDate = vm.scheduledDateRetiro; //dateToString(vm.scheduledDateRetiro);
                if (vm.package.selectedPaquer) {
                    vm.package.shippingScheduleOrigin.driverID = vm.package.selectedPaquer.id;
                }
            }

            FrontPackageService.schedule(vm.package.id, vm.package.packageType, vm.package.caption,
                vm.package.detail, vm.package.stimatedCost, vm.package.externalCode,
                vm.package.packageSize.value, vm.package.currentPackageStatus.value, vm.packageRate,
                vm.package.shippingScheduleDestination, vm.package.shippingScheduleOrigin)
                .then(function (response) {
                    //$state.reload();
                    $state.go('front.dashboard');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function goBack() {
            return $window.history.back();
        }

        function criterioDisabledFechas() {
            var disabled = true;
            if(vm.package){
                disabled = vm.package.status === 21 || vm.package.status === 20;
            }
            return disabled;
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
                // hsmmss[0] = padStr(parseInt(hsmmss[0]) + 3);
                return new Date(numbers[0], numbers[1]-1, numbers[2], hsmmss[0], hsmmss[1], hsmmss[2]);
            } else {
                var numbers = someString.match(/\d+/g);
                var hsmmss = someString.match(/\d+/g);
                //Sumo +3 en las hs porque el servidor devuelve en -3 las fechas
                // hsmmss[0] = padStr(parseInt(hsmmss[0]) + 3);
                return new Date(numbers[0], numbers[1]-1, numbers[2], hsmmss[0], hsmmss[1], hsmmss[2]);
            }
        }

        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        }

        function dateToString(date) {

            if(!date)
                return date;

            return padStr(date.getDate()) + '-' +
                padStr(1 + date.getMonth()) + '-'+
                date.getFullYear() + " " +
                padStr(date.getHours()) + ':'+
                padStr(date.getMinutes());
        }

    }
})();