(function() {
    'use strict';

    angular.module('PaQuery')
        .controller('AdminLoginController', AdminLoginController);

    AdminLoginController.$inject = ['$state', 'SessionService', '$uibModal'];

    function AdminLoginController($state, SessionService, $uibModal) {
        var vm = this;

        angular.extend(vm, {
            userAccount: '',
            password: '',
            errorMessage: '',
            login: login,
            invalidForm: invalidForm
        });

        function login() {

            if (!invalidForm()) {
                SessionService.login(vm.userAccount, vm.password, 'admin', undefined)
                    .then(function (userInformation) {
                        $state.go('admin.dashboard');
                    })
                    .catch(function () {
                        vm.errorMessage = 'Usuario o contraseña incorrectos';
                    });
            }
        }

        function invalidForm() {
            return !vm.userAccount || !vm.password;
        }
    }

})();
