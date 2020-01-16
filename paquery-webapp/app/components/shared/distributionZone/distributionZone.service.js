(function () {
    'use strict';

    angular.module('PaQuery')
        .factory('DistributionZoneService', DistributionZoneService);

    DistributionZoneService.$inject = ['UrlHelper', '$state', '$q'];

    function DistributionZoneService(UrlHelper, $state, $q) {
        var factory = {
            createDistributionZone: createDistributionZone,
            getDistrubutionZones: getDistrubutionZones,
            deleteDistributionZone: deleteDistributionZone,
            getDistributionZone: getDistributionZone,
            getAllDistributionZone: getAllDistributionZone,
            updateDistributionZone: updateDistributionZone,
            findDistributionZone: findDistributionZone,
            findDistributionZoneByAddress: findDistributionZoneByAddress,
        };

        return factory;

        function mapDistZones(distZonesData) {
            var dzones = [];

            for (var dzone of distZonesData.data) {
                dzones.push(dzone);
            }

            return dzones;
        }

        function getDistrubutionZones(page, take, desc) {
            var url = 'api/admin/distributionzone',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function getDistributionZone(id) {
            var url = 'api/distributionzone/load',
                config = {
                    id: id
                };

            return UrlHelper.get(url, config);
        }

        function updateDistributionZone(distributionZone) {
            var url = 'api/admin/distributionzone';
            return UrlHelper.put(url, distributionZone);
        }

        function getDistributionZone(id) {
            var url = 'api/distributionzone/load',
                config = {
                    id: id
                };

            return UrlHelper.get(url, config);
        }

        function findDistributionZone(search, options) {
            const url = "api/admin/distributionzone/find" ;
            const config = {
                search: search
            }
            return UrlHelper.get(url, config, true);
        }

        function findDistributionZoneByAddress(address, postalCode) {
            const url = "api/admin/distributionzone/findByAddress" ;
            const config = {
                address: address,
                postalCode: postalCode,
            }
            return UrlHelper.get(url, config, true);
        }

        function getAllDistributionZone() {
            var url = "api/admin/distributionzone/getall";

            return UrlHelper.get(url)
                .then(mapDistZones)
                .catch(function(err) { throw err; });
        }

        function createDistributionZone(distributionZone) {
            var url = 'api/admin/distributionzone';

            return UrlHelper.post(url, distributionZone);
        }

        function deleteDistributionZone(zoneId) {
            return UrlHelper.deleteEntity('api/admin/distributionzone', zoneId);
        }
    }
})();
