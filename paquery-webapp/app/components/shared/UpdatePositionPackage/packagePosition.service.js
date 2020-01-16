(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('PackageUpdatePosition', PackageUpdatePosition);

  PackageUpdatePosition.$inject = ['UrlHelper', '$state'];

  function PackageUpdatePosition(UrlHelper, $state) {
    var factory = {
      updatePosition: updatePosition,
    };

    return factory;

    function updatePosition(id){
      var url = "api/package/updateposition?packageID=" + id;
      return UrlHelper.get(url);
    }


  }
})();
