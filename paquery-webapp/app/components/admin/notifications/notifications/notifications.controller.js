(function() {
  'use strict';

  angular
    .module('PaQuery')
    .controller('AdminNotificationsController', AdminNotificationsController);

  AdminNotificationsController.$inject = ['$state', 'NotificationsService'];


  function AdminNotificationsController($state, NotificationsService) {
    var vm = this;

    angular.extend(vm, {
      editNotification: editNotification,
      deleteNotification: deleteNotification,
      getNotifications: NotificationsService.getNotifications
    });

    function editNotification(notification){
      $state.go('admin.notification', {notification: notification});
    }

    function deleteNotification(){

    }
  }

})();
