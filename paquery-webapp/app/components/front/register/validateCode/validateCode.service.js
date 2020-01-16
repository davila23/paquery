(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('ValidateCodeSerice', ValidateCodeSerice);

  ValidateCodeSerice.$inject = ['UrlHelper'];

  function ValidateCodeSerice(UrlHelper) {
    var factory = {
      validateCode: validateCode,
      adminValidateCode: adminValidateCode,
      sendEmail: sendEmail
    };


    return factory;


    function sendEmail(email) {
      var url = 'api/validationadmin/validateemail',
        config = {
          email: email
        };

      return UrlHelper.get(url, config);
    }

    function adminValidateCode(userId, code) {
      var url = 'api/validationadmin/validatecode',
        config = {
          ID: userId,
          Code: code
        };

      return UrlHelper.post(url, config);
    }

    function validateCode(userId, code) {
      var url = 'api/customer/validatecode',
        config = {
          ID: userId,
          Code: code
        };

      UrlHelper.post(url, config);
    }
  }
})();
