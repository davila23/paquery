(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminReceivePackageController', AdminReceivePackageController);

    AdminReceivePackageController.$inject = ['$base64', '$scope', '$state', 'SessionService', 'W3wSerice', '$uibModal', 'UserService', 'PackagesService', 'ResultPaymentsMPService'];

    function AdminReceivePackageController($base64, $scope, $state, SessionService, W3wSerice, $uibModal, UserService, PackagesService, ResultPaymentsMPService) {
        var vm = this;

        angular.extend(vm, {
            geoLocationDestiny: geoLocationDestiny,
            cardContent: 'origin',
            wizardStep: 1,
            destiny: {
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
            package: {},
            submit: submit,
            openUsersModal: openUsersModal,
            disableNextStepButton: disableNextStepButton,
            disableConfirmation: disableConfirmation
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

        function init() {
            getPackagesSizes();
            getPackagesStatus();

        }

          $scope.$watch('vm.destiny.addressInformation.coordinates', function(newValue) {
              if (newValue && newValue.lat && newValue.lng) {
                  W3wSerice.getW3w(newValue.lat, newValue.lng)
                      .then(function(response) {
                          vm.destiny.addressInformation.w3w = response.data.words;
                          angular.element('#destiny-w3w-container').addClass('fg-toggled');
                      });
              } else {
                  vm.destiny.addressInformation.w3w = '';
                  angular.element('#destiny-w3w-container').removeClass('fg-toggled');
              }
          });

        function geoLocationDestiny() {
          navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            W3wSerice.getW3w(location.lat, location.lng).then(function(response) {
              vm.destiny.addressInformation.w3w = response.data.words;
              angular.element('#destiny-w3w-container').addClass('fg-toggled');
              angular.element("#w3w-destiny-input")[0].focus();
            })
          })
        }

        function submit() {
            var p = vm.package;
            debugger;
            PackagesService.createPackageFromAdmin(p.selectedUser, 1, p.content, p.comments, p.stimatedValue, p.externalCode, undefined, p.size, vm.packagesStatus[0].value, vm.destiny.addressInformation, undefined, vm.destiny.personalInformation, undefined, vm.package.photo, vm.package.photoName, undefined, undefined, $scope.attachment)
                .then(function(response) {
                    $state.go('admin.packages');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openUsersModal() {
            modalInstances();
        }

        function modalInstances() {
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
                        return UserService.getUsers;
                    },
                    attributes: function() {
                        return [{
                            title: 'Nombre',
                            field: 'name'
                        }, {
                            title: 'Apellido',
                            field: 'lastName'
                        }, {
                            title: 'Email',
                            field: 'email'
                        }/*, {
                            title: 'Tipo',
                            field: 'type.name'
                        }, {
                            title: 'Estado',
                            field: 'user.state'
                        }*/];
                    },
                    elementName: function() {
                        return 'usuario';
                    }
                }
            });

            modalInstance.result.then(function(user) {
                vm.package.selectedUser = user;
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

        function disableNextStepButton(form) {
            return !form.$valid || angular.isUndefined(vm.package.size);
        }

        function disableConfirmation(firstStepForm, secondStepForm) {
            return disableNextStepButton(firstStepForm) || !secondStepForm.$valid || !vm.package.selectedUser /*|| !vm.destiny.addressInformation.address*/ || !vm.destiny.addressInformation.location || vm.googleMapsErrorMessage;
        }

    }

})();
