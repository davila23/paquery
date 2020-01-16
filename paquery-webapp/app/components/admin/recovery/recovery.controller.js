(function() {
    'use strict';

    angular.module('PaQuery').controller('AdminRecoveryController', adminRecoveryController);

    adminRecoveryController.$inject = ['$state', 'AdminRecoveryCodeService', '$scope'];

    function adminRecoveryController($state, AdminRecoveryCodeService, $scope) {
        var vm = this;

        angular.extend(vm, {
            email: '',
            sendRecoveryPassword : sendRecoveryPassword
        });

        init();

        function init() {
            console.log('Recovery')
        }


        function sendRecoveryPassword() {
            AdminRecoveryCodeService.adminSendRecoveryPassword(vm.email).then(function(response) {
                if (response.data) {
                    $state.go('adminRecoveryCode', {
                        code:  ''
                    });
                }
            }).catch(function() {
                $state.go('frontLogin');
            });
        }
    }
})();
