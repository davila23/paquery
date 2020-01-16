(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('TrackingService', TrackingService);

  TrackingService.$inject = ['$http', 'ProfileService', '$state', '$timeout', '$q', 'ENDPOINT', '$rootScope', 'SessionService', 'UrlHelper'];


  const API = 'api/packageexternal/getbyexternalcode';

  function TrackingService($http, ProfileService, $state, $timeout, $q, ENDPOINT, $rootScope, SessionService, UrlHelper) {
    var path = 'apptoken',
    factory = {
        information: {},
        getInformationPackage: getInformationPackage,
        getValidationRecaptcha: getValidationRecaptcha,
        getCurrentUbicationPackage: getCurrentUbicationPackage
    };

    return factory;

    function getInformationPackage(codePackage) {
        // return $http.get( API + '?externalCode=' + codePackage);
        var url = API + '?externalCode=' + codePackage;
        return UrlHelper.get(url);
    }

    function getValidationRecaptcha(response) {
        var url = "api/validation/recaptcha",
        config = {
            response: response
        };
        return UrlHelper.get(url, config);
    }

    function getCurrentUbicationPackage(codePackage) {
        var url = "api/package/getcurrentposition?code=" + codePackage;
        return UrlHelper.get(url,undefined,undefined,"No se encontró ubicación actual del paquete con código: " + codePackage);
    }

  }

})();
