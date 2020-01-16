(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('AdminMarketplacesController', AdminMarketplacesController)
        .filter('LogicOpFilter', LogicOpFilter);

    AdminMarketplacesController.$inject = ['$scope','$state', 'MarketplaceService', 'ExportService', '$timeout', '$q'];

    function AdminMarketplacesController($scope,$state, MarketplaceService, ExportService, $timeout, $q) {
        var vm = this;

        angular.extend(vm, {
            getMarketplaces: MarketplaceService.getAll,
            editMarketplace: editMarketplace,
            deleteMarketplace: deleteMarketplace
        });

        // function exportToExcel(tableId){ // ex: '#my-table'
        //       $scope.exportHref= ExportService.exportExcel(tableId,'sheet name');
        //
        //       $timeout(function(){
        //           location.href=$scope.fileData.exportHref;
        //       },100); // trigger download
        // }


        function editMarketplace(marketplace) {
          //console.log(marketplace);
          $state.go('admin.marketplace', { marketplace: marketplace });
        }

        function deleteMarketplace(driverId) {
            MarketplaceService.deleteMarketplace(driverId)
                .then(function() {
                    $state.reload();
                });
        }

        $scope.headerList = {
                name: 'NOMBRE',
                detail: 'DESCRIPCION',
                logisticOperators: 'OPERADORES LOGICOS'
            };

        $scope.getData = function getData() {
            return vm.getMarketplaces(0, 0, true);
        };

        $scope.getData().then(function (response) {
            $scope.dataList = response.data;
        })

    }

    function LogicOpFilter() {
      return function (items) {
          if (items.length === 1) {
            return items[0].name
          }else {
            var data = [];
            for (var item of items) {
              item && data.push(item.name);
            }
            return data.join(', ');
          }
      };
    }


})();
