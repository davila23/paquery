(function() {
  'use strict';

  angular.module('PaQuery')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['SessionService'];

  function HeaderController(SessionService) {
    var vm = this;

    angular.extend(vm, {
      isFrontUser: SessionService.getUserType() === 'front'
    });
  }

})();
