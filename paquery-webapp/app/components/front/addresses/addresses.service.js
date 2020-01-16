(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('AddressesService', AddressesService);

    AddressesService.$inject = ['UrlHelper'];

    function AddressesService(UrlHelper) {
        var factory = {
            getAddresses: getAddresses,
            actionsAddress: actionsAddress,
            deleteAddress: deleteAddress
        };

        return factory;

        function getAddresses(page, take, desc) {
            var config = {
                    page: page,
                    take: take,
                    desc: desc
                },
                url = 'api/customer/getaddress';

            return UrlHelper.get(url, config);
        }

        function actionsAddress(config) {
            var url = 'api/customer/setaddress',
                config = config;
            return UrlHelper.post(url, config);
        }

        function deleteAddress(config) {
            var url = 'api/customer/deleteaddress/';
            return UrlHelper.post(url, config);
        }
    }

})();
