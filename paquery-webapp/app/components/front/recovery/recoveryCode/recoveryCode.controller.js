(function() {
    'use strict';

  angular.module('PaQuery').controller('FrontRecoveryCodeController', frontRecoveryCodeController);

    frontRecoveryCodeController.$inject = ['$state', 'RecoveryCodeService', '$stateParams', '$uibModal'];

  function frontRecoveryCodeController($state, RecoveryCodeService, $stateParams, $uibModal) {
    var vm = this;

    angular.extend(vm, {
        code: null,
        successChange: false,
        errorMessage: null,
        newPassword: null,
        newPasswordConfirmation: null,
        tyc: false,
        validateCode: validateCode,
        modalTermsAndConditions: modalTermsAndConditions
    });

    init();

    function init() {
      if ($stateParams.code) {
          vm.code = $stateParams.code;
      }
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

    function validateCode() {
        vm.errorMessage = null;
        if(!(vm.newPassword && vm.newPasswordConfirmation && vm.code)) {
            vm.errorMessage = 'Todos los campos son requeridos';
        }  else if (vm.newPassword !== vm.newPasswordConfirmation) {
            vm.errorMessage = 'Las contraseñas deben coincidir';
        } else if(!vm.tyc){
                vm.errorMessage = 'Debe aceptar los términos y condiciones';
        } else{

            RecoveryCodeService.userValidateCode(vm.code,vm.newPassword).then(function(response){
                    vm.successChange = true;
                    $state.go('frontLogin');
            }).catch(function() {
                vm.errorMessage = 'Se ha producido un error inesperado. Consulte con el administrador del sistema.';
            });

        }

    }

  }
})();
