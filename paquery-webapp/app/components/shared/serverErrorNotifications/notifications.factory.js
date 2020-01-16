(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('serverErrorsNotifier', serverErrorsNotifier);

  function serverErrorsNotifier() {
    var factory = {
      notify: notify,
      success: success,
    }

    return factory;

    function success(message) {
        if (!message || message === "") return;

        $.growl({
            icon: 'img/logo-iso-blue-50-50.png',
            message: message
        }, {
            element: 'body',
            type: 'success',
            allow_dismiss: true,
            offset: {
                x: 20,
                y: 105
            },
            spacing: 10,
            z_index: 1031,
            delay: 2500,
            timer: 5000,
            url_target: '_blank',
            mouse_over: false,
            icon_type: 'class',
            template: '<div data-growl="container" class="alert" role="alert">' +
                '<button type="button" class="close" data-growl="dismiss">' +
                '<span aria-hidden="true">&times;</span>' +
                '<span class="sr-only">Close</span>' +
                '</button>' +
                '<img class="notification-logo" src="img/logo-iso-blue-50-50.png" />' +
                '<span data-growl="message" style="font-size:15px;"></span>' +
                '</div>'
        });
    }

    function notify(message) {
      $.growl({
        icon: 'img/logo-iso-blue-50-50.png',
        message: message || 'Se produjo un error'
      }, {
        element: 'body',
        type: 'danger',
        allow_dismiss: true,
        offset: {
          x: 20,
          y: 85
        },
        spacing: 10,
        z_index: 1031,
        delay: 2500,
        timer: 0,
        url_target: '_blank',
        mouse_over: false,
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
          '<button type="button" class="close" data-growl="dismiss">' +
          '<span aria-hidden="true">&times;</span>' +
          '<span class="sr-only">Close</span>' +
          '</button>' +
          '<img class="notification-logo" src="img/logo-iso-blue-50-50.png"></img>' +
          '<span data-growl="message" style="font-size:15px;"></span>' +
          '</div>'
      });
    }

  }

})();
