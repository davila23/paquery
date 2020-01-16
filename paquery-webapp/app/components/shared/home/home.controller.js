(function() {
  'use strict';

  angular.module('PaQuery')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SessionService', 'VERSION'];

  function HomeController(SessionService, VERSION) {
    var vm = this;

    angular.extend(vm, {
      userType: SessionService.getUserType(),
      version: VERSION
    });
  }

})();
