//(function() {
//    'use strict';

//    angular
//        .module('PaQuery')
//        .controller('FrontReceivePackageController', frontReceivePackageController);

//    frontReceivePackageController.$inject = ['$scope', '$state', 'SessionService', 'W3wSerice', 'FrontPackageService', 'PackagesService', 'ProfileService', 'serverErrorsNotifier', 'ResultPaymentsMPService', '$uibModal', 'AddressesService'];

//    function frontReceivePackageController($scope, $state, SessionService, W3wSerice, FrontPackageService, PackagesService, ProfileService, serverErrorsNotifier, ResultPaymentsMPService, $uibModal, AddressesService) {
//        var vm = this;

//        angular.extend(vm, {
//            wizardStep: 1,
//            geoLocationDestiny: geoLocationDestiny,
//            destiny: {
//                addressInformation: {
//                    address: '',
//                    coordinates: {
//                        lat: undefined,
//                        lng: undefined
//                    },
//                    immediately: {
//                      status: true,
//                      date: ''
//                    }
//                },
//                w3w: ''
//            },
//            submit: submit,
//            openAddressesModalDestiny: openAddressesModalDestiny,
//            disableNextStepButton: disableNextStepButton,
//            disableConfirmation: disableConfirmation
//        });

//        $scope.$watch('vm.destiny.addressInformation.coordinates', function(newValue) {
//            if (newValue && newValue.lat && newValue.lng) {
//                W3wSerice.getW3w(newValue.lat, newValue.lng)
//                    .then(function(response) {
//                        vm.destiny.addressInformation.w3w = response.data.words;
//                        angular.element('#destiny-w3w-container').addClass('fg-toggled');
//                    });
//            } else {
//                vm.destiny.addressInformation.w3w = '';
//                angular.element('#destiny-w3w-container').removeClass('fg-toggled');
//            }
//        });

//        init();

//        function geoLocationDestiny() {
//          navigator.geolocation.getCurrentPosition(function(position) {
//            var location = {
//              lat: position.coords.latitude,
//              lng: position.coords.longitude
//            };
//            W3wSerice.getW3w(location.lat, location.lng).then(function(response) {
//              vm.destiny.addressInformation.w3w = response.data.words;
//              angular.element("#w3w-destiny-input")[0].focus();
//            })
//          })
//        }

//        function init() {
//            getPackagesSizes();
//            getCurrentUser();
//            getPackagesStatus();
//            vm.destiny.addressInformation.immediately.status = true;
//        }

//        function getPackagesStatus() {
//            PackagesService.getPackagesStatus()
//                .then(function(response) {
//                    vm.packagesStatus = response.data;
//                })
//                .catch(function(error) {
//                    console.log(error);
//                })
//        }

//        function getCurrentUser() {
//            ProfileService.getUserProfile()
//                .then(function(response) {
//                    vm.currentUser = response.data;
//                });
//        }

//        function openMpIframe(iFrameUrl) {
//            $MPC.openCheckout({
//                url: iFrameUrl,
//                mode: "modal",
//                onreturn: function(json) {
//                        window.stop();
//                        if (json.collection_status == 'approved') {
//                            window.stop();
//                            FrontPackageService.create(vm.currentUser, 1, vm.content, vm.comments, vm.stimatedValue, vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, false, vm.destiny.personalInformation, undefined, vm.photo, vm.photoName, json.external_reference)
//                                .then(function(response) {
//                                  if (response) {
//                                    ResultPaymentsMPService.GatewayResult(json.external_reference)
//                                      .then(function(data) {
//                                        if (data.data) {
//                                          debugger;
//                                          unListenBrowserClose();
//                                          $state.go('front.dashboard');
//                                        }
//                                      });
//                                  }
//                                });

//                        } else if (json.collection_status == 'pending') {
//                            serverErrorsNotifier.notify('El usuario no completó el pago');
//                        } else if (json.collection_status == 'in_process') {
//                            unListenBrowserClose();
//                            serverErrorsNotifier.notify('El pago está siendo revisado');
//                        } else if (json.collection_status == 'rejected') {
//                            unListenBrowserClose();
//                            serverErrorsNotifier.notify('El pago fué rechazado, el usuario puede intentar nuevamente el pago');
//                        } else if (json.collection_status == null) {
//                            unListenBrowserClose();
//                            serverErrorsNotifier.notify('El usuario no completó el proceso de pago, no se ha generado ningún pago');
//                        }
//                }
//            });
//        }

//        function listenBrowserClose() {
//            $(window).bind('beforeunload', function(event) {
//                var errorText = 'No debe cerrar el navegador. En este momento estamos procesando su pedido.';
//                event.returnValue = errorText;
//                return errorText;
//            });
//        }

//        function unListenBrowserClose() {
//            $(window).unbind('beforeunload');
//        }

//        function modalConfirmation() {
//            var modalConfirmation = $uibModal.open({
//                animation: true,
//                templateUrl: 'components/front/shared/confirmationPayment/confirmationPayments.html',
//                controller: 'FrontConfiationPaymentsController',
//                controllerAs: 'vm',
//                size: 'modal-sm',
//                scope: $scope,
//                backdrop: 'static',
//                keyboard: true,
//                resolve: {
//                  time : function() {
//                    return $scope.time;
//                    }
//                  }
//            });
//            return modalConfirmation.result;
//        }

//        function submit() {
//            if (vm.packageSize.value !== 4) {
//                $scope.text = "Se pagará el paquete con su saldo actual";
//                $scope.text2 = "Estas seguro?";
//                $scope.text2 = "";
//                $scope.btnCancel = true;
//                FrontPackageService.getMpLink(vm.currentUser, 1, vm.content, vm.comments, vm.stimatedValue, vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, false, vm.destiny.personalInformation, undefined, vm.photo, vm.photoName)
//                    .then(function(response) {
//                      debugger;
//                      ProfileService.getMPAmount().then(function(data) {
//                      ResultPaymentsMPService.getPackagePrice(vm.packageSize.value).then(function(dataPrice) {
//                        if (data.data < dataPrice.data) {
//                          listenBrowserClose();
//                          window.onbeforeunload = function(){
//                                return 'Are you sure you want to leave?';
//                            };
//                          openMpIframe(response.data.init_point);
//                        }else {
//                          modalConfirmation().then(function(exito) {
//                              vm.modalConfirmationMessage = exito;
//                              if (vm.modalConfirmationMessage) {
//                                  FrontPackageService.create(vm.currentUser, 1, vm.content, vm.comments, vm.stimatedValue, vm.externalCodePackage, vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, false, vm.destiny.personalInformation, undefined, vm.photo, vm.photoName)
//                              .then(function(response) {
//                                  $state.go('front.dashboard');
//                              });
//                            }
//                          });
//                        }
//                      });
//                      });
//                    });
//            } else {
//                $scope.text = "Por ser un paquete personalizado, por favor comuníquese con PaQuery para poder determinar el costo del traslado.";
//                $scope.text2 = "";
//                $scope.text3 = "Desde ya muchas gracias. Lo saluda atentamente PaQuery."
//                $scope.btnCancel = false;
//                modalConfirmation().then(function() {
//                    FrontPackageService.create(vm.currentUser, 1, vm.content, vm.comments, vm.stimatedValue, vm.externalCodePackage, vm.packageSize.value, vm.packagesStatus[0].value, vm.destiny.addressInformation, false, vm.destiny.personalInformation, undefined, vm.photo, vm.photoName)
//                    .then(function(response) {
//                        console.log(response);
//                        $state.go('front.dashboard');
//                    });
//                });
//            }
//        }

//        function openAddressesModalDestiny() {
//            modalInstances2();
//        }

//        function modalInstances2() {
//            var modalInstance = $uibModal.open({
//                animation: true,
//                templateUrl: 'components/shared/paginableSelector/paginableSelector.html',
//                controller: 'PaginableSelectorController',
//                controllerAs: 'vm',
//                size: 'modal-lg',
//                backdrop: 'static',
//                keyboard: true,
//                resolve: {
//                    statusID: function () {
//                      return 1;
//                    },
//                    getListFunction: function() {
//                        return AddressesService.getAddresses;
//                    },
//                    attributes: function() {
//                        return [{
//                            title: 'Dirección',
//                            field: 'addressDetail'
//                        }, {
//                            title: 'Comentario',
//                            field: 'comment'
//                        }, {
//                            title: 'W3W',
//                            field: 'geoKey'
//                        }/*, {
//                            title: 'Tipo',
//                            field: 'type.name'
//                        }, {
//                            title: 'Estado',
//                            field: 'user.state'
//                        }*/];
//                    },
//                    elementName: function() {
//                        return 'address';
//                    }
//                }
//            });

//            modalInstance.result.then(function(address) {
//              vm.destiny.addressInformation.w3w = address.geoKey;
//              vm.destiny.addressInformation.address = address.addressDetail;
//            });

//        }

//        function getPackagesSizes() {
//            PackagesService.getPackagesSize()
//                .then(function(response) {
//                    vm.packagesSizes = response.data;
//                    getPaymentsPackages(vm.packagesSizes[0].value, vm.packagesSizes[1].value, vm.packagesSizes[2].value);
//                })
//                .catch(function(error) {
//                    console.log(error);
//                });
//        }

//        function getPaymentsPackages(a,b,c) {
//        var array = [];
//        ResultPaymentsMPService.getPackagePrice(a)
//        .then(function(dataPrice) {
//          array.push(dataPrice.data);
//          ResultPaymentsMPService.getPackagePrice(b)
//            .then(function(dataPrice2) {
//              array.push(dataPrice2.data);
//              ResultPaymentsMPService.getPackagePrice(c)
//                .then(function(dataPrice3) {
//                  array.push(dataPrice3.data);
//                  vm.packagePayment = array;
//                });
//            });
//        });
//        }

//        function disableNextStepButton(form) {
//            return !form.$valid || angular.isUndefined(vm.packageSize);
//        }

//        function disableConfirmation(firstStepForm, secondStepForm) {
//            return disableNextStepButton(firstStepForm) || !secondStepForm.$valid || /*!vm.destiny.addressInformation.address ||*/ !vm.destiny.addressInformation.location.lat || !vm.destiny.addressInformation.location.lng ||vm.googleMapsErrorMessage;
//        }
//    }

//})();
