(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('WebNotificationService', webNotificationService);

  webNotificationService.$inject = ['webNotification'];

  function webNotificationService(webNotification) {
    var factory = {
      showNotification: showNotification
    };

    return factory;

    function showNotification(message) {
      webNotification.showNotification('PaQuery', {
        body: message,
        icon: 'img/logo-iso-blue-50-50.png',
        onClick: function onNotificationClicked() {},
        autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
      }, function onShow(error, hide) {
        if (error) {
          window.alert('Unable to show notification: ' + error.message);
        } else {
          setTimeout(function hideNotification() {
            hide(); //manually close the notification (you can skip this if you use the autoClose option)
          }, 5000);
        }
      });
    }

  }

})();
