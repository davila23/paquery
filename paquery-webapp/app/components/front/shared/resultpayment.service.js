(function() {
    'use strict';
    angular.module('PaQuery')
        .factory('ResultPaymentsMPService', resultPaymentsMPService);

    resultPaymentsMPService.$inject = ['UrlHelper'];

    function resultPaymentsMPService(UrlHelper) {
        var factory = {
          GatewayResult: GatewayResult,
          getPackagePrice: getPackagePrice
        };

        return factory;

        function GatewayResult(id) {
          var url = 'api/Payment/GatewayResult/',
              config = {
                  id: id
              };

          return UrlHelper.get(url, config);
        }

        function getPackagePrice(size) {
          var url = "api/package/getpackageprice",
          config = {
            size: size
          }
          return UrlHelper.get(url, config);
        }

    }

})();
