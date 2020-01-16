(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('AdminRecoveryCodeService', AdminRecoveryCodeService);

    AdminRecoveryCodeService.$inject = ['UrlHelper'];

    function AdminRecoveryCodeService(UrlHelper) {

        var factory = {
            adminSendRecoveryPassword: adminSendRecoveryPassword,
            adminValidateCode: adminValidateCode
        };

        return factory;

        function adminSendRecoveryPassword(email) {
            var url = 'api/customeradmin/sendrecoverypassword?Email=' + email;

            return UrlHelper.get(url);
        }

        function adminValidateCode(code, newPassword) {
            var url = 'api/customeradmin/recoverypassword',
                config = {
                    Code: code,
                    NewPassword: newPassword
                };

            return UrlHelper.post(url, config);
        }

    }
})();
