(function() {
    angular.module('PaQuery').controller('FrontRegisterController', frontRegisterController);

    frontRegisterController.$inject = ['$state', '$stateParams', 'RegisterSerice', 'ValidateCodeSerice', 'AppTypesService', '$scope', '$uibModal', 'TwilioService'];

    function frontRegisterController($state, $stateParams, RegisterSerice, ValidateCodeSerice, AppTypesService, $scope, $uibModal, TwilioService) {
        var vm = this;

        angular.extend(vm, {
            createAccount: createAccount,
            userInfo: {},
            getCity:getCity,
            code: $stateParams.code,
            errorMessage: null,
            modalTermsAndConditions: modalTermsAndConditions,
            complete: false
            // activatedCustomer:activatedCustomer
        });

        init();

        function init() {

            if (vm.code){
                vm.complete = true;
                getBasicInfo();
            }

            getCountries();
        }

        function getBasicInfo() {
            RegisterSerice.getBasicInfo(vm.code)
                .then(function(response) {
                    vm.userInfo = response.data;
                    if(response.data.mobile)
                        vm.userInfo.mobile = parseInt(response.data.mobile, 10);

                }).catch(function(response) {
                    vm.errorMessage = 'Su código de verificación no es correcto.';
            });
        }

        function createAccount() {
            vm.errorMessage = null;

            if (vm.userInfo.password !== vm.userInfo.newPasswordConfirmation) {
                vm.errorMessage = 'Las contraseñas deben coincidir';
                goTop();
            }else{
                if(vm.userInfo.mobile){
                    TwilioService.validateMobile(vm.userInfo.country.dialingCode + vm.userInfo.mobile)
                        .success(function (response) {
                            if(response.data && (response.data.carrier.type).toLowerCase() == 'mobile'){
                                registerUser();
                            }else{
                                vm.errorMessage = 'El teléfono móvil ingresado no es válido';
                                goTop();
                            }
                        }).error(function(e) {
                            vm.errorMessage = 'Se ha producido un error inesperado. Consulte con el administrador del sistema.';
                            goTop();
                        });
                }else{
                    if (vm.code != null && vm.code > 0 && vm.userInfo != null && vm.userInfo.id > 0) {
                        activatedCustomer();
                    } else {
                        registerUser();
                    }
                }
            }
        }

        function goTop() {
            $('html, body').animate({scrollTop:55}, 'slow');
        }

        function registerUser() {
            RegisterSerice.registerUser(vm.userInfo.name, vm.userInfo.lastName, vm.userInfo.email, vm.userInfo.mobile, vm.userInfo.password, vm.userInfo.country.id, vm.userInfo.city.id, vm.userInfo.id)
                .then(function (response) {
                    var userId = response.data.id;
                    if(vm.complete) {
                        $state.go('frontLogin', {
                            registedUser: true
                        });
                    } else {
                        ValidateCodeSerice.sendEmail(vm.userInfo.email)
                            .then(function (response) {
                                $state.go('frontValidateCode', {
                                    user: {
                                        id: userId,
                                        email: vm.userInfo.email,
                                        password: vm.userInfo.password,
                                        TermsAndConditions: vm.userInfo.TermsAndConditions
                                    }
                                });
                            });
                    }

                }).catch(function(response) {
                    vm.errorMessage = 'Se ha producido un error inesperado. Consulte con el administrador del sistema.';
                });
        }

        function getCountries() {
            AppTypesService.getCountries()
                .then(function(response) {
                    vm.countries = response.data;
                    vm.userInfo.country = vm.countries[0];
                      getCity(vm.userInfo.country.id)
                });
        }

        function getCity(id) {
          AppTypesService.getCities(id).then(function(response) {
              vm.citys = response.data;
              vm.userInfo.city = vm.citys[0];
          });
        }

        function modalTermsAndConditions() {
            vm.url = 'https://paquery.com/terminosycondiciones.html';
            modalFrime();
        }

        function modalFrime() {
            var modalConfirmation = $uibModal.open({
                animation: true,
                template: "<modal-frime url=" + vm.url + "><modal-frime>",
                size: 'modal-lg'
            });
        }


        function activatedCustomer() {
            RegisterSerice.activateCustomer(vm.userInfo.name, vm.userInfo.lastName, vm.userInfo.email, vm.userInfo.mobile, vm.userInfo.password, vm.userInfo.country.id, vm.userInfo.city.id, vm.userInfo.id, vm.code)
                .then(function (response) {
                    if(vm.complete) {
                        $state.go('frontLogin', {
                            registedUser: true
                        });
                    }
                }).catch(function(response) {
                vm.errorMessage = 'Se ha producido un error inesperado. Consulte con el administrador del sistema.';
            });
        }

    }
})();
