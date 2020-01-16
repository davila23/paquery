angular
    .module('PaQuery')
    .controller('AdminUserController', AdminUserController);

AdminUserController.$inject = ['$state', '$stateParams', 'SessionService', 'UserService', '$timeout', 'AppTypesService','PaqueryPointService', '$uibModal', 'PaymentsService', '$scope', 'PackagesService', '$rootScope', 'UsersAdminService', 'LogisticOperatorService', 'MarketplaceService', 'ProfileService', 'serverErrorsNotifier', 'TwilioService', '$filter', 'DELIVERY_TERM'];

function AdminUserController($state, $stateParams, SessionService, UserService, $timeout, AppTypesService,PaqueryPointService,  $uibModal, PaymentsService, $scope, PackagesService, $rootScope, UsersAdminService, LogisticOperatorService, MarketplaceService, ProfileService, serverErrorsNotifier, TwilioService, $filter, DELIVERY_TERM) {
    var vm = this;
    var userRoles = UserService.allUserRoles();

    if (!$stateParams.action) {
        $state.go('admin.users');
    }

    angular.extend(vm, {
        user: $stateParams.user || { name: '' },
        userId: $stateParams.user ? $stateParams.user.id : undefined,
        save: save,
        cardContent: 'profile',
        openChangePasswordModal: openChangePasswordModal,
        action: $stateParams.action,
        setTabConfig: setTabConfig,
        showPackage: showPackage,
        showPackagePayment: showPackagePayment,
        getPackages: PackagesService.getPage,
        getPackagesHistory: PackagesService.getPackagesHistory,
        getPayments: PaymentsService.getAllPayments,
        isFormValid: isFormValid,
        reSendMail: reSendMail,
        checkVisibility: checkVisibility,
        getParse: getParse,
        getJsonData: getJsonData,
        getJsonDataHistory: getJsonDataHistory
    });

    init();

    var watchStateChange = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.mainContainerExpanded = false;
        watchStateChange();
    });

    function setTabConfig(tabName) {
        angular.element('div[ui-view].container').addClass('width-transition');
        vm.cardContent = tabName;
        if (tabName === 'payments' || tabName === 'packages' || tabName === 'packagesHistory') {
            $rootScope.mainContainerExpanded = true;
        } else {
            if (tabName === 'profile') {
                $rootScope.mainContainerExpanded = false;
            }
        }
        $timeout(function() {
            angular.element('div[ui-view].container').removeClass('width-transition');
        }, 600);
    }

    function updateUser() {
        UsersAdminService.update(vm.user.id, vm.user.name, vm.user.lastName, vm.user.email, vm.user.ammount, vm.user.role.value, vm.user.country.id, vm.user.city.id, vm.user.logisticOperator.id, vm.user.marketplace.id, vm.user.mobile, vm.user.password, vm.user.avatar, vm.user.avatarName, false, vm.user.paquerypoint.id)
            .then(function() {
                // console.log('success');
                getPageAdmin();
                $state.go("admin.users");
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function createUser() {
        var authMode = 1;
        var oplId = vm.user.logisticOperator ? vm.user.logisticOperator.id : null;
        var marketPlaceId = vm.user.marketplace ? vm.user.marketplace.id : null;
        var paqueryPointId = vm.user.paquerypoint ? vm.user.paquerypoint.id : null;
        UsersAdminService.create(authMode, vm.user.name, vm.user.lastName, vm.user.email, vm.user.ammount, vm.user.role.value, vm.user.country.id, vm.user.city.id, oplId, marketPlaceId, vm.user.mobile, vm.user.password, vm.user.avatar, vm.user.avatarName, false,paqueryPointId)
            .then(function() {
                // console.log('success');
                $state.go("admin.users");
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function isFormValid(form) {
        if (vm.action === 'update') {
            vm.formularioValido = form.$valid;
        } else {
            vm.formularioValido = (form.$valid && vm.user.password != undefined);
            vm.showPasswordError = !vm.user.password;
        }
        
        return vm.formularioValido;

    }

    function save(form) {
        vm.submitClicked = true;
        if(vm.user.mobile){
            TwilioService.validateMobile(vm.user.country.dialingCode + vm.user.mobile)
                .success(function (response) {
                    if(response.data && (response.data.carrier.type).toLowerCase() == 'mobile'){
                        vm.errorMessages.mobileInvalid = false;
                        vm.formularioValido = true;
                        saveUser(form);
                    }else{
                        vm.errorMessages.mobileInvalid = true;
                        vm.formularioValido = false;
                    }
                }).error(function(e) {
                    serverErrorsNotifier.notify('Se ha producido un error inesperado. Consulte con el administrador del sistema.');
                });
        }else{
            saveUser(form);
        }
    }

    function saveUser(form){
        if (isFormValid(form)) {
            //if (vm.user.role.value === 2) {
            //  vm.user.logisticOperator.id = null;
            //}
            if (vm.action === 'update') {
                updateUser();
            } else {
                createUser();
            }
        }
    }

    function reSendMail(){
        UsersAdminService.reSendValidCode(vm.userId).then(function () {
            UsersAdminService.getValidCode(vm.userId)
              .then(function(response) {
                  vm.user.validCode = response.data;
              });
        });


    }


    function init() {
        vm.errorMessages = {mobileInvalid : false};
        vm.formularioValido = true;
        vm.user.mobile = Number(vm.user.mobile);
        UserService.getUserRoles()
            .then(function(response) {
                vm.userRoles = response.data;
                if (!$stateParams.user) {
                    vm.user.role = vm.userRoles[0];
                } else {
                    var done = false;
                    for (var i = 0; i < vm.userRoles.length && !done; i++) {
                        if (vm.userRoles[i].value === $stateParams.user.userRoleID) {
                            vm.user.role = vm.userRoles[i];
                            done = true;
                        }
                    }
                    if (!done) {
                        vm.user.role = vm.userRoles[0];
                    }
                }
				
            });

        if (vm.user.id && vm.user.statusID === 2) {
            UsersAdminService.getValidCode(vm.user.id)
              .then(function(response) {
                  vm.user.validCode = response.data;
              });
        }else {
            vm.user.validCode = null;
        }


        AppTypesService.getCountries()
            .then(function(response) {
                vm.countries = response.data;
                if (!$stateParams.user) {
                    vm.user.country = response.data[0];
                } else {
                    var done = false;
                    for (var i = 0; i < vm.countries.length && !done; i++) {
                        if (vm.countries[i].id === $stateParams.user.countryID) {
                            vm.user.country = vm.countries[i];
                            done = true;
                        }
                    }
                    if (!done) {
                        vm.user.country = vm.countries[0];
                    }
                }
                if (vm.countries.length) {
                    var countryId = $stateParams.user ? $stateParams.user.countryID : vm.countries[0].id;
                    loadCities(countryId);
                    watchCountryChanges();
                }
            });

        getDeliveryTerms();
        getPackageSizes();
        getPackageTypes();
        getPackagesStatus();
        getPaymentTypes();
        getLogisticsOperators();
        getPaqueryPoints();
        getMarketPlace();
        getPageAdmin();

        if (vm.action === 'update') {
            UsersAdminService.getUserAmount(vm.user.id)
              .then(function(response) {
                  vm.user.ammount = response.data;
              })
        }

    }

    function getDeliveryTerms() {
        vm.deliveryTerms = DELIVERY_TERM;
    }

    function checkVisibility(field)
    {
        // const roles = UserService.allUserRoles();

        if (field == 'opl') {
            if(vm.user.role) 
                return  (vm.user.role.value === userRoles.OperadorOPL.id || vm.user.role.value === userRoles.AdministradorOPL.id) && (vm.userLoggedRoleID === userRoles.Administrador.id);
        }
        else if (field == 'rol'){
                return (vm.userLoggedRoleID === userRoles.Administrador.id || vm.userLoggedRoleID === userRoles.AdministradorOPL.id);
        }
        else if (field == 'marketplace'){
            if(vm.user.role) 
                return (vm.userLoggedRoleID === userRoles.Administrador.id && (vm.user.role.value === userRoles.AdministradorMP.id || vm.user.role.value === userRoles.OperadorMP.id));
        }
        else if (field == 'paquerypoint') {
            if (vm.user.role)
                return (vm.user.role.value === userRoles.OperadorPaqueryPoint.id) || (vm.user.role.value === userRoles.AdministradoraqueryPoint.id)
        }
    }

    function getPageAdmin() {
        ProfileService.getUserProfile()
            .then(function (response) {
                // console.log(response);
                vm.pageAuth = response.data.userRoleActions;
                vm.userLoggedRoleID = response.data.userRoleID;
                vm.user.avatar = response.data.avatar;
            });
    }

    

    function getLogisticsOperators() {

        LogisticOperatorService.getAll(0, 0, true)
            .then(function(response) {
              var found = false;
              vm.logisticOperators = response.data;
              if (!$stateParams.user) {
                  vm.user.logisticOperator = response.data[0];
              } else {
                  for (var i = 0; i < vm.logisticOperators.length; i++) {
                      if (vm.logisticOperators[i].id === vm.user.logisticOperatorID) {
                          vm.user.logisticOperator = vm.logisticOperators[i];
                          found = true;
                      }
                  }
              }
              if (!found) {
                  vm.user.logisticOperator=vm.logisticOperators[0];
              }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function getPaqueryPoints() {
        PaqueryPointService.getAll()
            .then(function(response) {
                var found = false;
                vm.paqueryPoints = response.data;
                if (!$stateParams.user) {
                    vm.user.paquerypoint = response.data[0];
                } else {
                    for (var i = 0; i < vm.paqueryPoints.length; i++) {
                        if (vm.paqueryPoints[i].id === vm.user.paqueryPointID) {
                            vm.user.paquerypoint = vm.paqueryPoints[i];
                            found = true;
                        }
                    }
                }
                if (!found) {
                    vm.user.paquerypoint=vm.paqueryPoints[0];
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function getMarketPlace() {

        MarketplaceService.getAll(0, 0, true)
            .then(function (response) {
                var found = false;
                vm.marketplaces = response.data;

                if (!$stateParams.user) {
                    vm.user.marketplace = response.data[0];
                } else {
                    for (var i = 0; i < vm.marketplaces.length; i++) {
                        if (vm.marketplaces[i].id === vm.user.marketplaceID) {
                            vm.user.marketplace = vm.marketplaces[i];
                            found = true;
                        }
                    }
                }
                if (!found) {
                    vm.user.marketplace = vm.marketplaces[0];
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    function getPaymentTypes() {
        PaymentsService.getPaymentTypes()
            .then(function(response) {
                vm.paymentTypes = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function getPackageSizes() {
        PackagesService.getPackagesSize().then(function(response) {
            vm.packagesSizes = response.data;
        }, function(error) {
            console.log(error);
        });
    }

    function getPackageTypes() {
        PackagesService.getPackagesTypes().then(function(response) {
            vm.packagesTypes = response.data;
        }, function(error) {
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

    function watchCountryChanges() {
        $scope.$watch('vm.user.country', function(newVal) {
            if (newVal) {
                loadCities(newVal.id);
            }
        });
    }

    function loadCities(countryId) {
        AppTypesService.getCities(countryId)
            .then(function(response) {
                vm.cities = response.data;
                if (!$stateParams.user) {
                    vm.user.city = response.data[0];
                } else {
                    var done = false;
                    for (var i = 0; i < vm.cities.length && !done; i++) {
                        if (vm.cities[i].id === $stateParams.user.cityID) {
                            vm.user.city = vm.cities[i];
                            done = true;
                        }
                    }
                    if (!done) {
                        vm.user.city = vm.cities[0];
                    }
                }
            });
    }

    function openChangePasswordModal() {
        modalInstances();
    }

    function modalInstances() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/admin/changePasswordModal/changePassword.html',
            controller: 'AdminChangePasswordController',
            controllerAs: 'vm',
            size: 'modal-sm',
            backdrop: 'static',
            keyboard: true,
            resolve: {
                userType: function() {
                    return 'user'
                },
                userId: function() {
                    return vm.user ? vm.user.id : false;
                }
            }
        });

        modalInstance.result.then(function(newPassword) {
            if (vm.user && newPassword) {
                vm.user.password = newPassword;
                vm.showPasswordError = false;
            } else {
                vm.showPasswordError = true;
            }
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

    function showPackagePayment(idPackage) {
      PackagesService.getPackage(idPackage)
          .then(function(response) {
              $state.go('admin.viewPackage', { obj: response.data });
          })
          .catch(function(error) {
              console.log(error);
          });
    }

    $scope.headerList = {
        externalCode: 'Externo',
        shippingScheduleDestination: 'Nombre destinatario',
        caption: 'Descripción',
        user: 'Usuario',
        creationDate: 'Creación',
        packageType: 'Tipo',
        packageSize: 'Tamaño',
        status: 'Estado'
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
        return vm.getPackages(0,1000000, true, false, vm.userId, vm.searchWord, null, null);
    }

    function getJsonDataHistory() {
        return vm.getPackagesHistory(0,1000000, true, false, vm.userId, vm.searchWord, null, null);
    }

}
