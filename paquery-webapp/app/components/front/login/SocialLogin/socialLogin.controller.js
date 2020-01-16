(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('LoginSocialController', LoginSocialController);

    LoginSocialController.$inject = ['$state', 'AppTypesService', 'LoginSocialService', 'ProfileService', '$stateParams', 'TwilioService', 'serverErrorsNotifier'];

    function LoginSocialController($state, AppTypesService, LoginSocialService, ProfileService, $stateParams, TwilioService, serverErrorsNotifier) {
        var vm = this;

        angular.extend(vm, {
          userInfo:{},
          save: save,
          getCity: getCity
        });
        init();

        function init() {
            vm.errorMessages = {mobileInvalid : false};
            vm.formularioValido = true;
            vm.submitClicked = false

            console.log($stateParams);

            if ($stateParams.user === null) {
              $state.go('frontLogin');
            }

            AppTypesService.getCountries()
            .then(function(response) {
                vm.countries = response.data;
                vm.userInfo.country = vm.countries[0];
                getCity(vm.userInfo.country.id);
            });
        }

        function getCity(id) {
          AppTypesService.getCities(id).then(function(response) {
              vm.citys = response.data;
              vm.userInfo.city = vm.citys[0];
          });
        }

        function save() {
            vm.submitClicked = true;
            if(vm.userInfo.mobile){
                TwilioService.validateMobile(vm.userInfo.country.dialingCode + vm.userInfo.mobile)
                    .success(function (response) {
                        if(response.data && (response.data.carrier.type).toLowerCase() == 'mobile'){
                            vm.errorMessages.mobileInvalid = false;
                            vm.formularioValido = true;
                            saveMobilAndCity();
                        }else{
                            vm.errorMessages.mobileInvalid = true;
                            vm.formularioValido = false;
                        }
                    }).error(function(e) {
                        serverErrorsNotifier.notify('Se ha producido un error inesperado. Consulte con el administrador del sistema.');
                    });
            }
        }

        function saveMobilAndCity() {
            LoginSocialService.saveMovilAndCity($stateParams.user.id, vm.userInfo.city.id, vm.userInfo.mobile).then(function(response) {
                if (response.data) {
                    $state.go('frontValidateCode', {
                        user:  $stateParams.user
                    });
                }else {
                    console.error("Error");
                }
            },function(error) {
                $state.go('frontLogin');
            })
        }


    }
})();
