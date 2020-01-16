/**
 * Created by fede on 12/11/17.
 */
(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('TwilioService', TwilioService);

    TwilioService.$inject = ['$http', 'ENDPOINT', 'SessionService'];

    function TwilioService($http, ENDPOINT, SessionService) {
        var factory = {
            validateMobile: validateMobile
        };
        return factory;

        function validateMobile(numberPhone) {
            //FORMATO NUMERO: +541234567890
            var request = {
                method: 'GET',
                url: ENDPOINT + 'api/validation/verifyphonenumber?phone=' + numberPhone,
                headers: {
                    'Authorization': SessionService.getTokenType() + ' ' + SessionService.getToken()
                }
            };
            return $http(request);
        }

    }
})();

