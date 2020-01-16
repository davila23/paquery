(function () {
    'use strict';

    angular.module('PaQuery')
        .factory('LogisticOperatorService', LogisticOperatorService);

    LogisticOperatorService.$inject = ['UrlHelper'];

    function LogisticOperatorService(UrlHelper) {
        var factory = {
            create: create,
            getAll: getAll,
            update: update,
            deleteLogisticOperator: deleteLogisticOperator
        };

        return factory;

        function create(name, detail, phone, contactName, /*marketplaceID,*/ published, isPrivate, zones, paqueryPoints) {
            var url = 'api/logisticoperatoradmin/create',
                config = {
                    name: name,
                    detail: detail,
                    phone: phone,
                    contactName: contactName,
                    //marketplaces: marketplaceID,
                    published: published,
                    isPrivate: isPrivate,
                    //photo: photo
                    zones: zones,
                    paqueryPoints: paqueryPoints
                };
            return UrlHelper.post(url, config);
        }

        function update(id, name, detail, phone, contactName, /*marketplaceID,*/ published, isPrivate, zones, paqueryPoints) {
            console.log('size '+paqueryPoints.length);
            var url = 'api/logisticoperatoradmin/update',
                config = {
                    id: id,
                    name: name,
                    detail: detail,
                    phone: phone,
                    contactName: contactName,
                    //marketplaces: marketplaceID,
                    published: published,
                    isPrivate: isPrivate,
                    zones: zones,
                    paqueryPoints: paqueryPoints
                    //photo: photo
                };

            return UrlHelper.post(url, config);
        }

        function getAll(page, take, desc) {
            var url = 'api/logisticoperatoradmin/GetAll',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function deleteLogisticOperator(logisticOperatorId) {
            var url = 'api/logisticoperatoradmin/delete',
                config = {
                    id: logisticOperatorId
                };

            return UrlHelper.get(url, config);
        }

    }

})();
