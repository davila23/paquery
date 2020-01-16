(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('InformationAddressService', InformationAddressService);

    InformationAddressService.$inject = ['$http', '$state', '$q'];

  function InformationAddressService($http, $state, $q) {
    const apiKey='3hm1ULC6ukMfIXTmC8ZE';
    const apiCode='T7nHIAVpZajK1Y1l9BuUZQ';
    const apiUrlService='https://autocomplete.geocoder.api.here.com/6.2/suggest.json?country=ARG&language=es&maxresults=20';

      const addField = function (address, divider, name, altername) {
          const value = address[name] || address[altername];
          return value ? (divider !== null ? divider : " " ) + value : ""
      }

      const getLabelAddress = function(address) {

          const a = address;

          let result = "";

          result += addField(a,'' ,  'street', "Street" );
          result += addField(a,' ' , 'houseNumber', "HouseNumber" );
          result += addField(a,', ', 'district', "District");
          result += addField(a,', ', 'postalCode', "PostalCode");
          result += addField(a,', ', 'county', 'County');

          if (( a.county || a.County )!== ( a.city || a.City ) )
              result += addField(a, ', ', 'city', 'City');

          result += addField(a,', ', 'country', 'Country');

          if (result === "" || result === " ")
              result = a.label || a.Label;

          return result;
      };

    var factory = {
        getPostalCodeForAddress: getPostalCodeForAddress
    };

    return factory;

    function getPostalCodeForAddress(address) {
        var url = apiUrlService + "&api_key=" + apiKey + "&api_code=" + apiCode + "&query=" + encodeURI(address);

        return $http.get(url)
            .then(function(resp) {
                var label=getLabelAddress(resp.data.suggestions[0].address).
                return Promise.resolve({result : [ {postalCode:121}, {postalCode:212}]})
            })
            .catch(function(erro) {

            });
    }
  }
})();
