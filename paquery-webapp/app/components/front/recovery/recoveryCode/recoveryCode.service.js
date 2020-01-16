(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('RecoveryCodeService', RecoveryCodeService);

    RecoveryCodeService.$inject = ['UrlHelper'];

    function RecoveryCodeService(UrlHelper) {

        var factory = {
            userSendRecoveryPassword: userSendRecoveryPassword,
            userValidateCode: userValidateCode
        };

        return factory;

        function userSendRecoveryPassword(email) {
            var url = 'api/customer/sendrecoverypassword?Email=' + email;

            return UrlHelper.get(url);
        }

        function userValidateCode(code, newPassword) {
            var url = 'api/customer/recoverypassword',
                config = {
                    Code: code,
                    NewPassword: newPassword
                };

            return UrlHelper.post(url, config);
        }

    }
})();
