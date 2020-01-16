(function() {
    'use strict';

    angular
        .module('PaQuery')
        .factory('LoginSocialService', LoginSocialService);

    LoginSocialService.$inject = ['UrlHelper'];

    /* @ngInject */
    function LoginSocialService(UrlHelper) {
        var factory = {
            saveMovilAndCity: saveMovilAndCity
        };

        return factory;

        function saveMovilAndCity(ID, CityID, Mobile) {
          var url = "api/customer/setmobilenumber",
              config = {
                ID: ID,
                CityID: CityID,
                Mobile: Mobile
              };

          return UrlHelper.post(url, config);
        }
    }
})();
