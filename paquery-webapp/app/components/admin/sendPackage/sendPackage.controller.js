(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminSendPackageController', AdminSendPackageController);

    AdminSendPackageController.$inject = ['$base64','$scope', '$state', 'PackagesService', '$uibModal', 'UserService', '$window', 'W3wSerice', 'ResultPaymentsMPService', 'ProfileService', 'DriverService','LogisticOperatorService'];

    function AdminSendPackageController($base64, $scope, $state, PackagesService, $uibModal, UserService, $window, W3wSerice, ResultPaymentsMPService, ProfileService, DriverService, LogisticOperatorService) {
        var vm = this;
        var geoLocation = false;

        angular.extend(vm, {
            immediately: {
              status: true,
            },
            date:{
              origin:'',
              destiny:''
            },
            wizardStep: 1,
            geoLocationOrigin: geoLocationOrigin,
            geoLocationDestiny: geoLocationDestiny,
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
                    },
                    w3w: ''
                },
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
                    },
                    w3w: ''
                },
            },
            package: {},
            submit: submit,
            openUsersModal: openUsersModal,
            disableNextStepButton: disableNextStepButton,
            disableConfirmation: disableConfirmation,
            checkVisibilityPaquerSelector: checkVisibilityPaquerSelector,
            checkVisibilityUserSelector: checkVisibilityUserSelector,
            openOPLModal: openOPLModal,
            checkVisibilityOPLSelector: checkVisibilityOPLSelector,
            updateAddress: updateAddress
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
            getPageAdmin();

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
        // //Geolocalization
        // angular.element('input').focus(function(){
        //   geoLocation = false;
        // })

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

        function getPageAdmin() {
            ProfileService.getUserProfile()
                .then(function (response) {
                    // console.log(response);
                    vm.pageAuth = response.data.userRoleActions;
                    vm.userLoggedRoleID = response.data.userRoleID
                    vm.userLoggedID = response.data.id
                });
        }

        function checkVisibilityUserSelector() {
            return UserService.allUserRoles().Administrador.id == vm.userLoggedRoleID;
        }

        function checkVisibilityPaquerSelector() {
            return (UserService.allUserRoles().OperadorOPL.id == vm.userLoggedRoleID || UserService.allUserRoles().AdministradorOPL.id == vm.userLoggedRoleID);
        }

        function checkVisibilityOPLSelector() {
            return UserService.allUserRoles().OperadorMP.id == vm.userLoggedRoleID;
        }
        

        $scope.$watch('vm.origin.addressInformation.w3w', function (newValue) {
          if (!newValue) {
            vm.disabledDestinyGeoW3w = false;
            vm.origin.addressInformation.address = "";
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

        function submit() {
            var p = vm.package;
            var driverID = null;
            if (!p.selectedUser)
            {
                p.selectedUser = {id: vm.userLoggedID}
            }

            PackagesService.createPackageFromAdmin(p.selectedUser, 2, p.content, p.comments, p.stimatedValue, p.externalCode, undefined, p.size, vm.packagesStatus[0].value, vm.destiny.addressInformation, vm.origin.addressInformation, vm.destiny.personalInformation, vm.origin.personalInformation, vm.package.photo,null, p.selectedPaquer,p.selectedOPL,$scope.attachment)

                .then(function(response) {
                    $state.go('admin.packages');
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function openUsersModal() {
            var attributes = function() {
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

        function openOPLModal() {

            var attributes = function() {
                return [{
                    title: 'Nombre',
                    field: 'name'
                }, {
                    title: 'Detalle',
                    field: 'detail'
                }
               ];
            }

            modalInstances(attributes);
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
                        return {}
                    },
                    getListFunction: function () {

                        if (UserService.allUserRoles().OperadorOPL.id == vm.userLoggedRoleID || UserService.allUserRoles().AdministradorOPL.id == vm.userLoggedRoleID) 
                        {
                            return DriverService.getDrivers;
                        }
                        else if (UserService.allUserRoles().OperadorMP.id == vm.userLoggedRoleID)
                        {
                            return LogisticOperatorService.getAll;
                        }
                        else
                        {
                            return UserService.getUsers;
                        }
                    },
                    attributes: attributes,
                    elementName: function () {
                        if (UserService.allUserRoles().OperadorOPL.id == vm.userLoggedRoleID || UserService.allUserRoles().AdministradorOPL.id == vm.userLoggedRoleID) {
                            return 'paquer';
                        }
                        else if (UserService.allUserRoles().OperadorMP.id == vm.userLoggedRoleID) {
                            return 'logisticOperator';
                        }
                        else {
                            return 'usuario';
                        }
                    }
                }
            });

            modalInstance.result.then(function (user) {
                if (UserService.allUserRoles().OperadorOPL.id == vm.userLoggedRoleID || UserService.allUserRoles().AdministradorOPL.id == vm.userLoggedRoleID) {
                    vm.package.selectedPaquer = user;
                }
                else if (UserService.allUserRoles().OperadorMP.id == vm.userLoggedRoleID) {
                    vm.package.selectedOPL = user;
                }
                else {
                    vm.package.selectedUser = user;
                }
            });

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

        function disableNextStepButton(form) {
            return !form.$valid || angular.isUndefined(vm.package.size);
        }

        function disableConfirmation(firstStepForm, secondStepForm) {
            return disableNextStepButton(firstStepForm) || !secondStepForm.$valid || (!vm.package.selectedUser && UserService.allUserRoles().Administrador.id == vm.userLoggedRoleID) || !(vm.immediately.status ? !(vm.destiny.addressInformation.immediately.date && vm.origin.addressInformation.immediately.date) : false)
            || !vm.origin.addressInformation.w3w || !vm.origin.addressInformation.location.lat || !vm.origin.addressInformation.location.lng || !vm.destiny.addressInformation.w3w || !vm.destiny.addressInformation.location.lat|| !vm.destiny.addressInformation.location.lng || vm.googleMapsErrorMessage;
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
