(function () {
    'use strict';

    angular.module('PaQuery')
        .factory('zonesService', zonesService);

    zonesService.$inject = ['UrlHelper', '$state', '$q'];

    function zonesService(UrlHelper, $state, $q) {
        var factory = {
            createZone: createZone,
            getZone: getZone,
            getZones: getZones,
            deleteZone: deleteZone,
            updateZone: updateZone

        };

        return factory;

        function getZones(page, take, desc) {
            var url = 'api/admin/zone',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function getZone(id) {
            var url = 'api/admin/zone/{id}',
                config = {
                    id: id
                };

            return UrlHelper.get(url, config);
        }


        function updateZone(zone) {
            var url = 'api/admin/zone';
            return UrlHelper.put(url, zone);
        }

        function deleteZone(zoneId) {
            return UrlHelper.deleteEntity('api/admin/zone', zoneId);
        }

        function createZone(zone) {
            var url = 'api/admin/zone';
            return UrlHelper.post(url, zone);
        }
    }
})();
