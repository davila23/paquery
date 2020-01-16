(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('RegisterSerice', RegisterSerice);

  RegisterSerice.$inject = ['UrlHelper'];

  function RegisterSerice(UrlHelper) {
        var factory = {
            registerUser: registerUser,
            getBasicInfo: getBasicInfo,
            activateCustomer:activateCustomer
        };
        return factory;

        function registerUser(name, lastName, email, mobile, password, CountryID, CityID, id, TermsAndConditions) {
          var url = 'api/customer/create',
            config = {
              Name: name,
              LastName: lastName,
              Email: email,
              Mobile: mobile,
              Pwd: password,
              CountryID: CountryID,
              CityID: CityID,
              id: 0, //debe ser 0 porque es un registro sino da 401
              TermsAndConditions: TermsAndConditions
            };

          return UrlHelper.post(url, config);
        }

      function activateCustomer(name, lastName, email, mobile, password, CountryID, CityID, id,code, TermsAndConditions) {
          var url = 'api/customer/activatedcustomer',
              config = {
                  Name: name,
                  LastName: lastName,
                  Email: email,
                  Mobile: mobile,
                  Pwd: password,
                  CountryID: CountryID,
                  CityID: CityID,
                  id: id,
                  TermsAndConditions: TermsAndConditions,
                  ValidationCode: code
              };

          return UrlHelper.post(url, config);
      }

        function getBasicInfo(code) {
            var url = 'api/customer/getbasicinfo',
            config = {
                code: code
            };
            return UrlHelper.get(url,config);
        }

  }
})();
