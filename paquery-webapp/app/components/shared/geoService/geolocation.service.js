(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('GeoLocationService', GeoLocationService);

    GeoLocationService.$inject = ['UrlHelper'];

  function GeoLocationService(UrlHelper) {

    var factory = {
        geoAutocomplete: geoAutocomplete
    };

    return factory;

    function geoAutocomplete(address) {
      var url = 'api/geolocation/autocomplete/' + address;

      return UrlHelper.get(url);
    }

  }
})();
