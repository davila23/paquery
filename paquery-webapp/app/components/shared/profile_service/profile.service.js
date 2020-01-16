(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('ProfileService', ProfileService);

  ProfileService.$inject = ['UrlHelper'];

  function ProfileService(UrlHelper) {
    var factory = {
      get_profile:get_profile,
      changePwd:changePwd
    };

    return factory;

    function get_profile() {
      var url = 'api/profile/load'
      return UrlHelper.get(url);
    }
    function changePwd(config) {
      var url = 'api/profile/changepassword'
      return UrlHelper.post(url,config);
    }
  }
})();
