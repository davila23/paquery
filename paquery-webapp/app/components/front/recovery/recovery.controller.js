(function() {
    'use strict';

    angular.module('PaQuery').controller('RecoveryController', frontRecoveryController);

    frontRecoveryController.$inject = ['$state', 'RecoveryCodeService', 'AppTypesService', '$scope'];

    function frontRecoveryController($state, RecoveryCodeService, AppTypesService, $scope) {
        var vm = this;

        angular.extend(vm, {
            email: '',
            sendRecoveryPassword : sendRecoveryPassword
        });

        init();

        function init() {
            console.log('Recovery');
        }

        function sendRecoveryPassword() {
            RecoveryCodeService.userSendRecoveryPassword(vm.email).then(function(response) {
                if (response.data) {
                    $state.go('frontRecoveryCode', {
                        code:''
                    });
                }
            }).catch(function() {
                $state.go('frontLogin');
            });

        }
    }
})();
