(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('FrontSendPackageController', frontSendPackageController);

    frontSendPackageController.$inject = ['$base64', '$scope', '$state', 'SessionService', 'W3wSerice', 'FrontPackageService', 'PackagesService', 'ProfileService', 'ResultPaymentsMPService', '$uibModal', 'AddressesService'];

    function frontSendPackageController($base64, $scope, $state, SessionService, W3wSerice, FrontPackageService, PackagesService, ProfileService, ResultPaymentsMPService, $uibModal, AddressesService) {
        var vm = this;

        angular.extend(vm, {
            immediately: {
              status: true
            },
            date:{
              origin:'',
              destiny:''
            },
            wizardStep: 1,
            geoLocationOrigin: geoLocationOrigin,
            geoLocationDestiny: geoLocationDestiny,
            disableNextStepButton: disableNextStepButton,
            disableConfirmation: disableConfirmation,
            openAddressesModalOrigin: openAddressesModalOrigin,
            openAddressesModalDestiny: openAddressesModalDestiny,
            updateAddress: updateAddress,
            origin: {
                datepicker: {
                  open:false
                },
                addressInformation: {
                    address: '',
                    location: {
                        lat: undefined,
                        lng: undefined
                    },
                    immediately: {
                      status: true,
                      date: ''
                    }
                },
                w3w: ''
            },
            destiny: {
                datepicker: {
                  open:false
                },
                addressInformation: {
                    address: '',
                    location: {
                        lat: undefined,
                        lng: undefined
                    },
                    immediately: {
                      status: true,
                      date: ''
                    }
                },
                w3w: ''
            },
            submit: submit
        });

        // $scope.getTheFiles = function ($files) {
        //     angular.forEach($files, function (value) {
        //         $scope.attachment = value;
        //     });
        // };

        $scope.getTheFiles = function ($files) {
            $scope.attachment = $base64.encode($files[0]);

            // $scope.attachment = new FormData();
            // angular.forEach($files, function (value, key) {
            //     $scope.attachment.append(key, value);
            // });

        };

        init();

        //Geolocalization

        function geoLocationOrigin() {
          vm.disabledDestinyGeoW3w = true;
          navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            W3wSerice.getW3w(location.lat, location.lng).then(function(response) {
              vm.origin.addressInformation.w3w = response.data.words;
              angular.element("#w3w-origin-input")[0].focus();
            })
          })
        }

        function geoLocationDestiny() {
          vm.disabledOriginGeoW3w = true;
          navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            W3wSerice.getW3w(location.lat, location.lng).then(function(response) {
              vm.destiny.addressInformation.w3w = response.data.words;
              angular.element("#w3w-destiny-input")[0].focus();
            })
          })
        }

        $scope.$watch('vm.origin.addressInformation.w3w', function (newValue) {
          if (!newValue) {
            vm.disabledDestinyGeoW3w = false;
            vm.origin.addressInformation.address = "";
            vm.origin.addressInformation.location.lat = undefined;
            angular.element("#origin-side-container").removeClass('fg-toggled');
          }
        });

        $scope.$watch('vm.destiny.addressInformation.w3w', function (newValue) {
          if (!newValue) {
            vm.disabledOriginGeoW3w = false;
            vm.destiny.addressInformation.address = "";
            angular.element("#destiny-side-container").removeClass('fg-toggled');
          }
        });

        function init() {
            getPackagesSizes();
            getPackagesStatus();
            getCurrentUser();

            vm.immediately.status = true;
            vm.destiny.addressInformation.immediately.status = vm.immediately.status;
            vm.origin.addressInformation.immediately.status = vm.immediately.status;

            vm.origin.datepicker.show = vm.origin.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };

            vm.destiny.datepicker.show = vm.destiny.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };

            vm.onDateSetDestiny = function($dates, newDate, oldDate){
              vm.destiny.addressInformation.immediately.date = moment(vm.date.destiny).format('DD/MM/YYYY hh:mm');
              vm.destiny.datepicker.open = false;
              angular.element('.input-date#dateDestiny').addClass('fg-toggled');
              $scope.$broadcast('origin-date-changed');
            }

            vm.onDateSetOrigin = function(newDate, oldDate){
              vm.origin.addressInformation.immediately.date = moment(vm.date.origin).format('DD/MM/YYYY hh:mm');
              vm.destiny.addressInformation.immediately.date = '';
              vm.origin.datepicker.open = false;
              angular.element('.input-date#dateOrigin').addClass('fg-toggled');
              $scope.$broadcast('destiny-date-changed');
            }

            vm.beforeDateSetDestiny = function($view, $dates){
              $dates.utcDateValue = 0;
              if (vm.date.origin) {
                  var activeDate = moment(vm.date.origin).subtract(1, $view).add(1, 'minute');

                  $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                  }).forEach(function (date) {
                    date.selectable = false;
                  })
                }
            }

            vm.beforeDateSetOrigin = function($dates, $view){
                $dates.utcDateValue = 0;
                var activeDate = moment().subtract(1, $view).add(1, 'minute');;
                $dates.filter(function (date) {
                  return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                  date.selectable = false;
                })
            }

        }
        $scope.$watch('vm.immediately.status', function (newValue) {
          vm.destiny.addressInformation.immediately.status = vm.immediately.status;
          vm.origin.addressInformation.immediately.status = vm.immediately.status;
        });

        $scope.$watch('vm.destiny.datepicker.open', function (newValue) {
          vm.destiny.datepicker.show = vm.destiny.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
        });

        $scope.$watch('vm.origin.datepicker.open', function (newValue) {
          vm.origin.datepicker.show = vm.origin.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
        });

        function focusDestinyDatepicker(){

        }

        function focusDestinyDatepicker(){

        }

        function getCurrentUser() {
            ProfileService.getUserProfile()
                .then(function(response) {
                    vm.currentUser = response.data;
                });
        }

        function openMpIframe(iFrameUrl) {
            var responded = false;
            $MPC.openCheckout({
                url: iFrameUrl,
                mode: "modal",
                onreturn: function(json) {
                    ResultPaymentsMPService.GatewayResult(json.external_reference)
                      .then(function(data) {
                        if (data.data) {
                          unListenBrowserClose();
                          $state.go('front.dashboard');
                        }
                    });
                    if (!responded) {
                        if (json.collection_status == 'approved') {
                          window.stop();
                          FrontPackageService.create(vm.currentUser, 2, vm.content, vm.comments, vm.stimatedValue, vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, vm.origin.addressInformation, vm.destiny.personalInformation, vm.origin.personalInformation, vm.photo, vm.photoName, undefined, $scope.attachment)
                              .then(function(response) {
                                if (response) {
                                  ResultPaymentsMPService.GatewayResult(json.external_reference)
                                    .then(function(data) {
                                      if (data.data) {
                                        unListenBrowserClose();
                                        $state.go('front.dashboard');
                                      }
                                    });
                                }
                              });
                          }
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
                  time : function() {
                    // console.log($scope.data);
                    return $scope.time;
                    }
                  }
            });
            return modalConfirmation.result;
        }

        function submit() {
            if (vm.packageSize.value !== 4) {
                $scope.text = "Se pagará el paquete con su saldo actual";
                $scope.text2 = "Estas seguro?";
                $scope.text2 = "";
                $scope.btnCancel = true;
                FrontPackageService.getMpLink(vm.currentUser, 2, vm.content, vm.comments, vm.stimatedValue, vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, vm.origin.addressInformation, vm.destiny.personalInformation, vm.origin.personalInformation, vm.photo, vm.photoName)
                    .then(function(response) {
                      ProfileService.getMPAmount().then(function(data) {
                      ResultPaymentsMPService.getPackagePrice(vm.packageSize.value).then(function(dataPrice) {
                        if (data.data < dataPrice.data) {
                          listenBrowserClose();
                          openMpIframe(response.data.init_point);
                        }else {
                          modalConfirmation().then(function(exito) {
                              vm.modalConfirmationMessage = exito;
                              if (vm.modalConfirmationMessage) {
                                // console.log("creo");
                              FrontPackageService.create(vm.currentUser, 2, vm.content, vm.comments, vm.stimatedValue, vm.externalCodePackage,  vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, vm.origin.addressInformation, vm.destiny.personalInformation, vm.origin.personalInformation, vm.photo, vm.photoName, undefined, $scope.attachment)
                                  .then(function(response) {
                                      $state.go('front.dashboard');
                                  });
                              }
                          });

                        }
                      });
                      });
                    });
            } else {
                $scope.text = "Por ser un paquete personalizado, por favor comuníquese con PaQuery para poder determinar el costo del traslado.";
                $scope.text2 = "";
                $scope.text3 = "Desde ya muchas gracias. Lo saluda atentamente PaQuery."
                $scope.btnCancel = false;
                modalConfirmation().then(function() {
                    FrontPackageService.create(vm.currentUser, 2, vm.content, vm.comments, vm.stimatedValue, vm. vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, vm.origin.addressInformation, vm.destiny.personalInformation, vm.origin.personalInformation, vm.photo, vm.photoName, undefined, $scope.attachment)
                       .then(function(response) {
                           $state.go('front.dashboard');
                        });
                });
            }
        }

        function getPackagesSizes() {
            PackagesService.getPackagesSize()
                .then(function(response) {
                    vm.packagesSizes = response.data;
                    getPaymentsPackages(vm.packagesSizes[0].value, vm.packagesSizes[1].value, vm.packagesSizes[2].value);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function getPaymentsPackages(a,b,c) {
        var array = [];
        ResultPaymentsMPService.getPackagePrice(a)
        .then(function(dataPrice) {
          array.push(dataPrice.data);
          ResultPaymentsMPService.getPackagePrice(b)
            .then(function(dataPrice2) {
              array.push(dataPrice2.data);
              ResultPaymentsMPService.getPackagePrice(c)
                .then(function(dataPrice3) {
                  array.push(dataPrice3.data);
                  vm.packagePayment = array;
                });
            });
        });
        }

        function getPackagesStatus() {
            PackagesService.getPackagesStatus()
                .then(function(response) {
                    vm.packagesStatus = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openAddressesModalOrigin() {
            modalInstances1();
        }

        function modalInstances1() {
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
                        return {}
                    },
                    getListFunction: function() {
                        return AddressesService.getAddresses;
                    },
                    attributes: function() {
                        return [{
                            title: 'Dirección',
                            field: 'addressDetail'
                        }, {
                            title: 'Comentario',
                            field: 'comment'
                        }, {
                            title: 'W3W',
                            field: 'geoKey'
                        }/*, {
                            title: 'Tipo',
                            field: 'type.name'
                        }, {
                            title: 'Estado',
                            field: 'user.state'
                        }*/];
                    },
                    elementName: function() {
                        return 'address';
                    }
                }
            });

            modalInstance.result.then(function(address) {
                vm.origin.addressInformation.w3w = address.geoKey;
                vm.origin.addressInformation.address = address.addressDetail;
            });

        }

        function openAddressesModalDestiny() {
            modalInstances2();
        }

        function modalInstances2() {
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
                    getListFunction: function() {
                        return AddressesService.getAddresses;
                    },
                    attributes: function() {
                        return [{
                            title: 'Dirección',
                            field: 'addressDetail'
                        }, {
                            title: 'Comentario',
                            field: 'comment'
                        }, {
                            title: 'W3W',
                            field: 'geoKey'
                        }/*, {
                            title: 'Tipo',
                            field: 'type.name'
                        }, {
                            title: 'Estado',
                            field: 'user.state'
                        }*/];
                    },
                    elementName: function() {
                        return 'address';
                    }
                }
            });

            modalInstance.result.then(function(address) {
              vm.destiny.addressInformation.w3w = address.geoKey;
              vm.destiny.addressInformation.address = address.addressDetail;
            });

        }

        function disableNextStepButton(form) {
            return !form.$valid || angular.isUndefined(vm.packageSize);
        }

        function disableConfirmation(firstStepForm, secondStepForm) {
            return disableNextStepButton(firstStepForm) || !secondStepForm.$valid || !vm.immediately.status ? !(vm.destiny.addressInformation.immediately.date && vm.origin.addressInformation.immediately.date) : false
            || !vm.origin.addressInformation.w3w || !vm.origin.addressInformation.location.lat || !vm.origin.addressInformation.location.lng || !vm.destiny.addressInformation.w3w || !vm.destiny.addressInformation.location.lat
            || !vm.destiny.addressInformation.location.lng || vm.googleMapsErrorMessage;
        }


        function updateAddress(source) {
            if (vm[source].addressInformation && vm[source].addressInformation.address) {
                W3wSerice.getByAddress(vm[source].addressInformation.address)
                    .then(function (response) {
                        //vm.destiny.addressInformation.w3w = response.data.words;
                        vm[source].addressInformation.w3w = response.data.words;
                        angular.element("#"+ source + "-w3w-container").addClass('fg-toggled')
                    });
            }

        }

    }

})();
