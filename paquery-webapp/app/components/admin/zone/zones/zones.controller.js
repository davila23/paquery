(function () {
    'use strict';
    angular
        .module('PaQuery')
        .controller('AdminZonesController', AdminZonesController)

    AdminZonesController.$inject = ['$state', 'zonesService'];

    function AdminZonesController($state, zonesService) {
        var vm = this;

        angular.extend(vm, {
            getZones: zonesService.getZones,
            editZone: editZone,
            deleteZone: deleteZone
        });

        function editZone(zone) {
            $state.go('admin.zone', {zone: zone});
        }

        function deleteZone(zoneId) {
            zonesService.deleteZone(zoneId).then(function () {
                $state.reload();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
})();
