(function () {
    'use strict';
    angular
        .module('PaQuery')
        .controller('AdminLogOpsController', AdminLogisticOperatorController);

    AdminLogisticOperatorController.$inject = ['$state', 'LogisticOperatorService', 'MarketplaceService'];

    function AdminLogisticOperatorController($state, LogisticOperatorService, MarketplaceService) {
        var vm = this;

        angular.extend(vm, {
            getLogisticOperators: LogisticOperatorService.getAll,
            editLogisticOperator: editLogisticOperator,
            deleteLogisticOperator: deleteLogisticOperator
        });

        init();

        function init() {
            MarketplaceService.getAll(0, 0, true)
                .then(function (response) {
                    vm.marketplaces = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function editLogisticOperator(logisticOperator) {
            $state.go('admin.logisticOperator', {logisticOperator: logisticOperator});
        }

        function deleteLogisticOperator(driverId) {
            LogisticOperatorService.deleteLogisticOperator(driverId)
                .then(function () {
                    $state.reload();
                });
        }
    }

})();
