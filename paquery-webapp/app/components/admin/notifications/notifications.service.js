(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('NotificationsService', notificationsService);

    notificationsService.$inject = ['UrlHelper'];

    function notificationsService(UrlHelper) {
        var factory = {
            saveNotification: saveNotification,
            getNotifications: getNotifications
        };

        return factory;

        function getNotifications(page, take, desc) {
            var url = 'api/notificationadmin/getall',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function saveNotification(notification) {
            var url = 'api/notificationadmin/update',
                config = {
                    notification: notification
                };

            return UrlHelper.post(url, config);
        }

    }
})();
