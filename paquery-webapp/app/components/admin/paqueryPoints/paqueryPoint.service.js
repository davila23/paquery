(function () {
        'use strict';

        angular.module('PaQuery')
            .factory('PaqueryPointService', PaqueryPointService);

        PaqueryPointService.$inject = ['UrlHelper'];

        function PaqueryPointService(UrlHelper) {
            var factory = {
                create: create,
                get: get,
                getAll: getAll,
                getById: getById,
                getServices: getServices,
                getDaysOfWeek: getDaysOfWeek,
                deletePaqueryPoint: deletePaqueryPoint,
                updatePaqueryPoint: updatePaqueryPoint,
                getDzToPPoint: getDzToPPoint
            };

            return factory;

            function mapEnumToInt(arrayEnum) {
                var result = [];

                _.forEach(arrayEnum, function (item) {
                    result.push(item.value)
                });

                return result;
            };

            function create(name, address, detail, phone, postalCode, contactName, volume, isPrivate, locationAddress, zones, services, workingSchedule, active) {
                locationAddress.county = 'asa';
                var url = 'api/admin/paquerypoint',
                    config = {
                        name: name,
                        active: active,
                        detail: detail,
                        phone: phone,
                        contactName: contactName,
                        volume: volume,
                        isPrivate: isPrivate,
                        locationAddress: locationAddress,
                        zones: zones,
                        currentServices: mapEnumToInt(services),
                        workingScheduleTimes: workingSchedule
                    };
                return UrlHelper.post(url, config);
            }

            function getServices() {
                var url = 'api/admin/paquerypoint/paquerypointservices',
                    config = {};

                return UrlHelper.get(url, config);
            }

            function getDaysOfWeek() {
                var url = 'api/admin/paquerypoint/dayofweeks',
                    config = {};

                return UrlHelper.get(url, config);
            }

            function get(page, take, desc) {
                var url = 'api/admin/paquerypoint',
                    config = {
                        page: page,
                        take: take,
                        desc: desc
                    };
                return UrlHelper.get(url, config);
            }

            function getAll() {
                return get(0, 100, false)
            }

            function updatePaqueryPoint(paqueryPoint) {
                paqueryPoint.currentServices = mapEnumToInt(paqueryPoint.currentServices);
                var url = 'api/admin/paquerypoint';
                return UrlHelper.put(url, paqueryPoint);
            }

            function deletePaqueryPoint(paqueryPointID) {
                var url = 'api/admin/paquerypoint';
                return UrlHelper.deleteEntity(url, paqueryPointID);
            }

            function getById(id) {
                const url = "api/admin/paquerypoint/" + id;
                return UrlHelper.get(url)
            }

            function getDzToPPoint(id) {
                const url = "api/admin/paquerypoint/" + id + "/dz";
                return UrlHelper.get(url)
            }
        }
    }
)();
