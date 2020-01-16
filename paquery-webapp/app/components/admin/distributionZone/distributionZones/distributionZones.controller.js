(function () {
    'use strict';
    angular
        .module('PaQuery')
        .controller('AdminDistributionZonesController', AdminDistributionZonesController)

    AdminDistributionZonesController.$inject = ['$state', 'DistributionZoneService'];

    function AdminDistributionZonesController($state, DistributionZoneService) {
        var vm = this;

        angular.extend(vm, {
            getDistrubutionZones: DistributionZoneService.getDistrubutionZones,
            editDistributionZone: editDistributionZone,
            deleteDistributionZone: deleteDistributionZone,
            createDistributionZone: createDistributionZone
        });

        function editDistributionZone(distributionZone) {
            $state.go('admin.distributionZone', {distributionZone: distributionZone});
        }

        function createDistributionZone(distributionZone) {
            $state.go('admin.distributionZone', {distributionZone: distributionZone});
        }

        function deleteDistributionZone(zoneId) {
            DistributionZoneService.deleteDistributionZone(zoneId).then(function () {
                $state.reload();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
})();
