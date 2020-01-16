(function() {
  'use strict';
  angular
  .module('PaQuery')
  .controller('AdminWorkZonesController', AdminWorkZonesController)

  AdminWorkZonesController.$inject = ['$state', 'WorkzoneService'];

  function AdminWorkZonesController($state, WorkzoneService) {
    var vm = this;

    angular.extend(vm, {
        getWorkzones: WorkzoneService.getWorkzones,
        editWorkzone: editWorkzone,
        deleteWorkzone: deleteWorkzone
    });

    function editWorkzone(workzone) {
        $state.go('admin.workzone', { workzone: workzone });
    }

    function deleteWorkzone(workzoneId) {
        WorkzoneService.deleteWorkzone(workzoneId).then(function(){
            $state.reload();
        }).catch(function(error) {
            console.log(error);
        });
    }

  }

})();
