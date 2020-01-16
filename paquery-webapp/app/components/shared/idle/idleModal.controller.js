(function() {
  'use strict';

  angular.module('PaQuery')
    .controller('idleModalController', idleModalController);

  idleModalController.$inject = ['$uibModalInstance', '$interval'];

  function idleModalController($uibModalInstance, $interval) {
    var vm = this;

    angular.extend(vm, {
      ok: ok,
      activateCountdown: activateCountdown
    });

    init();

    function init() {
      activateCountdown();
    }

    function ok() {
      $uibModalInstance.close();
    }

    function activateCountdown() {
      vm.secondsCounter = 3;
      $interval(function() {
        vm.secondsCounter--;
        if (vm.secondsCounter === -1) {
          $uibModalInstance.close();
        }
      }, 1000);
    }
  }

})();
