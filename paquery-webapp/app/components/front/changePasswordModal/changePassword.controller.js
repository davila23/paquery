(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('FrontChangePasswordController', ChangePasswordController)

    ChangePasswordController.$inject = ['$uibModalInstance', 'ProfileService', 'ChangePasswordService', '$timeout'];

    function ChangePasswordController($uibModalInstance, ProfileService, ChangePasswordService, $timeout) {
        var vm = this;

        angular.extend(vm, {
            ok: ok,
            cancel: cancel,
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: ''
        });

        init();

        function init() {
            ProfileService.getUserProfile()
                .then(function(response) {
                    vm.currentUserId = response.data.id;
                });
        }

        function ok() {
            if (vm.newPassword !== vm.newPasswordConfirmation) {
                vm.errorMessage = 'Las contraseñas deben coincidir';
            } else {
                vm.errorMessage = '';
                ChangePasswordService.customerChangePassword(vm.currentUserId, vm.oldPassword, vm.newPassword)
                    .then(function(response) {
                        vm.successChange = true;
                        $timeout(function() {
                            $uibModalInstance.close();
                        }, 1000);
                    })
                    .catch(function() {
                        vm.errorMessage = 'Los datos ingresados no son válidos. Asegúrese de ingresar datos correctos.';
                    });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();
