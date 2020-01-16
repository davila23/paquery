(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('FrontConfiationPaymentsController', FrontConfiationPaymentsController)

    FrontConfiationPaymentsController.$inject = ['$scope', '$uibModalInstance', 'URLMP'];

    function FrontConfiationPaymentsController($scope, $uibModalInstance, URLMP) {
        var vm = this;

        angular.extend(vm, {
            cancel: cancel,
            ok: ok,
            urlMP: URLMP
        });

        function ok() {
          $scope.data = true;
          $uibModalInstance.close($scope.data);
        }

        function cancel() {
          $scope.data = false;
          $uibModalInstance.close($scope.data);
        }
  }

})();
