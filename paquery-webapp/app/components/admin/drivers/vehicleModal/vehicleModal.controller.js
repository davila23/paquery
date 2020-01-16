(function() {
  'use strict';
  angular
  .module('PaQuery')
  .controller('AdminModalVehicleController', AdminModalVehicleController)


  AdminModalVehicleController.$inject = ['$state', 'UserService', '$uibModalInstance', 'VehiclesService', 'logisticOperatorId'];

  function AdminModalVehicleController($state, UserService, $uibModalInstance, VehiclesService, logisticOperatorId) {
    var vm = this;

    angular.extend(vm, {
      getVehicles: getVehicles,
      ok: ok,
      cancel: cancel,
      logisticOperatorId: logisticOperatorId
    });

    function ok() {
      $uibModalInstance.close(vm.selectedVehicle);
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

    function getVehicles() {
       return VehiclesService.getVehicles(0,0,true,vm.logisticOperatorId)
    }


  }

})();
