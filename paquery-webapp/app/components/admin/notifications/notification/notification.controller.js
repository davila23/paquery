(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminNotificationController', AdminNotificationController);

    AdminNotificationController.$inject = ['$state', 'SessionService', 'NotificationsService', '$stateParams'];

    function AdminNotificationController($state, SessionService, NotificationsService, $stateParams) {
        var vm = this;
        angular.extend(vm, {
            notification: $stateParams.notification || { message: '' },
            saveNotification: saveNotification,
            goToNotifications: goToNotifications
        });

        function saveNotification() {
            NotificationsService.saveNotification(vm.notification)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function goToNotifications() {
            $state.go('admin.notifications')
        }

    }

})();
