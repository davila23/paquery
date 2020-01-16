(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('AppTypesService', AppTypesService);

  AppTypesService.$inject = ['UrlHelper'];

  function AppTypesService(UrlHelper) {
    var factory = {
      getCountries: getCountries,
      getCities: getCities,
      getTargetTypes: getTargetTypes,
      getLogTypes: getLogTypes,
      getPaymentTypes: getPaymentTypes,
      getUserTypes: getUserTypes
    };
    return factory;

    function getCountries() {
      var url = 'api/geolocation/loadcountries';

      return UrlHelper.get(url);
    }

    function getCities(country) {
      var url = 'api/geolocation/loadcities/' + country;

      return UrlHelper.get(url);
    }

    function getTargetTypes() {
      var url = 'api/apptype/targettype';

      return UrlHelper.get(url);
    }

    function getPaymentTypes() {
      var url = 'api/apptype/paymenttype';

      return UrlHelper.get(url);
    }


    function getUserTypes() {
      var url = 'api/apptype/usertype';
      return UrlHelper.get(url);
    }


    function getLogTypes() {
      var url = 'api/apptype/logtype';

      return UrlHelper.get(url);
    }

  }
})();
