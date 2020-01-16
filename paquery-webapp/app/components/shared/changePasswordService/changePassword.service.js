(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('ChangePasswordService', ChangePasswordService);

    ChangePasswordService.$inject = ['UrlHelper'];

    function ChangePasswordService(UrlHelper) {
        var factory = {
            customerChangePassword: customerChangePassword,
            changeDriverPassword: changeDriverPassword
        };

        return factory;

        function customerChangePassword(userId, oldPwd, newPwd) {
            var url = 'api/customer/changepassword',
                config = {
                    ID: userId,
                    OldPwd: oldPwd,
                    NewPwd: newPwd
                };

            return UrlHelper.post(url, config);
        }

        function changeDriverPassword(driverId, oldPwd, newPwd) {
            var url = 'api/driver/changepassword',
                config = {
                    ID: driverId,
                    OldPwd: oldPwd,
                    NewPwd: newPwd
                };

            return UrlHelper.post(url, config);
        }
    }

})();
