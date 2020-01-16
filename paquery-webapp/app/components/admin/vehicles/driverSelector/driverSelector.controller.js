(function() {
  'use strict';
  angular
  .module('PaQuery')
  .controller('DriverSelectorController', AdminDriversController)


  AdminDriversController.$inject = ['$state', 'DriverService', 'UserService', '$uibModalInstance'];

  function AdminDriversController($state, DriverService, UserService, $uibModalInstance) {
    var vm = this;
    
    angular.extend(vm, {
      getDrivers: DriverService.getDrivers,
      editDriver: editDriver,
      deleteDriver: deleteDriver,
      ok: ok,
      cancel: cancel
    });

    function editDriver(driver) {
      $state.go('admin.driver', { driver: driver });
    }

    function deleteDriver() {

    }

    function ok() {
      $uibModalInstance.close(vm.selectedDriver);
    }
    
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };


  }

})();
