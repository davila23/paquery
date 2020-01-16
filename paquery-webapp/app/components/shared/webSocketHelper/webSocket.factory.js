(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('WebSocketHelper', webSocketHelper);

  webSocketHelper.$inject = ['ENDPOINT'];

  function webSocketHelper(ENDPOINT) {
    var path = ENDPOINT + 'websocket',
      factory = {
        init: init
      };

    return factory;

    function init() {
      var connection = $.hubConnection(path, { useDefaultPath: false });

      var packageHub = connection.createHubProxy('packageHub');

      packageHub.on('send', function(message) {
        console.log(message);
      });

      var mainHub = connection.createHubProxy('mainHub');

      mainHub.on('send', function(message) {
        console.log(message);
      });

      connection.start().done(init).fail(fail);


      function init() {
        console.log('Conexión ok. ID = ' + connection.id);
      }

      function fail() {
        console.log('Error de conexión');
      }
    }
  }

})();
