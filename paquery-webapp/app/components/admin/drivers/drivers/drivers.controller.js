(function() {
  'use strict';
  angular
  .module('PaQuery')
  .controller('AdminDriversController', AdminDriversController)


  AdminDriversController.$inject = ['$scope','$state', 'DriverService', 'UserService', 'ENDPOINT', 'SessionService', 'PackagesService'];

  function AdminDriversController($scope, $state, DriverService, UserService, ENDPOINT, SessionService, PackagesService) {
    var vm = this;

    angular.extend(vm, {
      getDrivers: DriverService.getDrivers,
      editDriver: editDriver,
      deleteDriver: deleteDriver,
      exportPackages: exportPackages
    });

    function editDriver(driver) {
      $state.go('admin.driver', { driver: driver });
    }

    function exportPackages(driverID) {
        var request = {
            method: 'GET',
            url: ENDPOINT + 'api/packageadmin/exportpackages?driverID=' + driverID,
            data: { },
            responseType: 'arraybuffer',
            headers: {
                'Authorization': SessionService.getTokenType() + ' ' + SessionService.getToken(),
                'Accept': 'application/pdf'
            }
        };

        var filename = "Paquetes.pdf";

        PackagesService.exportPdf(request, $scope, filename);
    }

    function deleteDriver(driverId) {
        DriverService.deleteDriver(driverId)
        .then(function(){
          $state.reload();
        });
    }
  }
})();
