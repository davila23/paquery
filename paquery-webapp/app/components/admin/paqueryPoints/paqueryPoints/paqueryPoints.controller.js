(function () {
    'use strict';
    angular
        .module('PaQuery')
        .controller('AdminPaqueryPointsController', AdminPaqueryPointsController);

    AdminPaqueryPointsController.$inject = ['$state', 'PaqueryPointService'];

    function AdminPaqueryPointsController($state, PaqueryPointService) {
        var vm = this;

        angular.extend(vm, {
            getPaqueryPoints: PaqueryPointService.get,
            editPaqueryPoint: editPaqueryPoint,
            deletePaqueryPoint: deletePaqueryPoint
        });

        init();

        function init() {
        }

        function editPaqueryPoint(paqueryPoint) {
            $state.go('admin.paqueryPoint', {paqueryPoint: paqueryPoint});
        }

        function deletePaqueryPoint(paqueryPointID) {
            PaqueryPointService.deletePaqueryPoint(paqueryPointID)
                .then(function () {
                    $state.reload();
                });
        }
    }

})();
