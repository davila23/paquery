(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('MarketplaceService', MarketplaceService);

    MarketplaceService.$inject = ['UrlHelper'];

    function MarketplaceService(UrlHelper) {
        var factory = {
            create: create,
            getAll: getAll,
            update: update,
            deleteMarketplace: deleteMarketplace
        };

        return factory;

        function create(name, detail, published, logisticOperators,sendCustomerNotifications,stock, photo) {
            var url = 'api/marketplaceadmin/create',
                config = {
                    name: name,
                    detail: detail,
                    published: published,
                    logisticOperators: logisticOperators,
                    sendCustomerNotifications:sendCustomerNotifications,
                    stock: stock
                    //photo: photo
                };

            return UrlHelper.post(url, config);
        }

        function update(id, name, detail, published, logisticOperators,sendCustomerNotifications,stock, photo) {
            var url = 'api/marketplaceadmin/update',
                config = {
                    id: id,
                    name: name,
                    detail: detail,
                    published: published,
                    logisticOperators: logisticOperators,
                    sendCustomerNotifications:sendCustomerNotifications,
                    stock:stock
                    //photo: photo
                };

            return UrlHelper.post(url, config);
        }

        function getAll(page, take, desc) {
            var url = 'api/marketplaceadmin/getAll',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function deleteMarketplace(marketplaceId) {
            var url = 'api/marketplaceadmin/delete',
                config = {
                    id: marketplaceId
                };
            return UrlHelper.get(url, config);
        }
    }

})();
