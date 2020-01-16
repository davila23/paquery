(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('LogsService', logsService);

    logsService.$inject = ['UrlHelper'];

    function logsService(UrlHelper) {
        var factory = {
            saveLog: saveLog,
            getAll: getAll,
            getLogTypes: getLogTypes,
            deleteLog:deleteLog
        };

        return factory;

        function saveLog(log) {
            var url = 'api/logs',
                config = {
                    log: log
                };

            return UrlHelper.post(url, config);
        }

        function getAll(page, take, desc) {
            var url = 'api/logadmin/getall',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function getLogTypes() {
            var url = 'api/apptype/logtype';

            return UrlHelper.get(url);
        }

        function deleteLog() {
          var url = 'api/logadmin/deleteall';

          return UrlHelper.get(url);
        }
    }
})();
