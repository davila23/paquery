(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('AdminChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$uibModalInstance', 'ProfileService', 'ChangePasswordService', '$timeout', 'userId', 'userType'];

    function ChangePasswordController($uibModalInstance, ProfileService, ChangePasswordService, $timeout, userId, userType) {
        var vm = this;

        angular.extend(vm, {
            ok: ok,
            cancel: cancel,
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
            changePasswordFunctionName: userType === 'user' ? 'customerChangePassword' : userType === 'driver' ? 'changeDriverPassword' : '',
            updating: userId ? true : false
        });

        function ok() {
            if (vm.updating) {
                updatePassword();
            } else {
              createPassword();
            }
        }

        function createPassword() {
          if (vm.newPassword !== vm.newPasswordConfirmation) {
              vm.errorMessage = 'Las contraseñas deben coincidir';
          }else {
              $uibModalInstance.close(vm.newPassword);
          }
        }

        function updatePassword() {
            if (vm.newPassword !== vm.newPasswordConfirmation) {
                vm.errorMessage = 'Las contraseñas deben coincidir';
            } else {
                vm.errorMessage = '';
                if (vm.changePasswordFunctionName) {
                    ChangePasswordService[vm.changePasswordFunctionName](userId, vm.oldPassword, vm.newPassword)
                        .then(function(response) {
                            vm.successChange = true;
                            $timeout(function() {
                                $uibModalInstance.close(vm.newPassword);
                            }, 1000);
                        })
                        .catch(function() {
                            vm.errorMessage = 'Los datos ingresados no son válidos. Asegúrese de ingresar datos correctos.';
                        });
                }
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();