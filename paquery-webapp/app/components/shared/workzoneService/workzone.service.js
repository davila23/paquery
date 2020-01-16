(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('WorkzoneService', WorkzoneService);

  WorkzoneService.$inject = ['UrlHelper', '$state', '$q'];

  function WorkzoneService(UrlHelper, $state, $q) {
    var factory = {
        create: create,
        update: update,
        deleteWorkzone: deleteWorkzone,
        getWorkzones: getWorkzones
    };

    return factory;

    function getWorkzones(page, take, desc) {
      var url = 'api/workzoneadmin/getall',
          config = {
              page: page,
              take: take,
              desc: desc
          };

      return UrlHelper.get(url, config);
      //return mockGetAll();
    }

    function create(workzone) {
      var url = 'api/workzoneadmin/create';

      return UrlHelper.post(url, workzone);
    }

    function update(workzone) {
        var url = 'api/workzoneadmin/update';

        return UrlHelper.post(url, config);
    }

    function deleteWorkzone(workzoneId) {
      var url = 'api/workzoneadmin/delete/',
        config = {
            id: workzoneId
        };

        return UrlHelper.get(url, config);
    }

    function mockGetAll(){
      var def = $q.defer();
      var data = [
          {
              ID: "123",
              Name: "buenos aires",
              CreationDate: new Date(),
              Active: true,
              Deleted: false,
              Detail: "zona de Buenos aires"
          },
          {
              ID: "123",
              Name: "buenos aires",
              CreationDate: new Date(),
              Active: true,
              Deleted: false,
              Detail: "zona de Buenos aires"
          }
      ];
      var total = 2;
      var rr = {data: data, total: total};
      def.resolve(rr);

      return def.promise;
    }

  }
})();
