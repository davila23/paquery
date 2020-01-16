(function() {
  'use strict';

  angular
    .module('PaQuery')
    .controller('AdminPackageController', AdminPackageController);

  AdminPackageController.$inject = ['$state', 'SessionService', 'PackagesService', 'UserService', '$uibModal'];

  function AdminPackageController($state, SessionService, PackagesService, UserService, $uibModal) {
    var vm = this;
    angular.extend(vm, {
      cardContent: 'profile',
      submit: submit,
      package : {},
      openUsersModal: openUsersModal
    });

    init();

    function submit() {
      var p = vm.package;
      PackagesService.createPackageFromAdmin(p.selectedUser.id, p.receiveOrSend.value, p.description, p.comments, p.sellerCode, p.size, vm.packagesStatus[0])
        .then(function(response) {
          vm.package = {};
          // console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function init() {
      getPackagesSizes();
      getPackagesTypes();
      getPackagesStatus();
    }

    function getPackagesSizes() {
      PackagesService.getPackagesSize()
        .then(function(response) {
          vm.packagesSizes = response.data;
          vm.package.size = vm.packagesSizes[0];
        })
        .catch(function(error) {
          console.log(error);
        })
    }

    function getPackagesTypes() {
      PackagesService.getPackagesTypes()
        .then(function(response) {
          vm.packagesTypes = response.data;
          vm.package.receiveOrSend = vm.packagesTypes[0];
        })
        .catch(function(error) {
          console.log(error);
        })
    }

    function getPackagesStatus() {
      PackagesService.getPackagesStatus()
        .then(function(response) {
          vm.packagesStatus = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
    }


    function openUsersModal(){
      modalInstances();
    }

    function modalInstances() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'components/shared/paginableSelector/paginableSelector.html',
        controller: 'PaginableSelectorController',
        controllerAs: 'vm',
        size: 'modal-lg',
        backdrop: 'static',
        keyboard: true,
        resolve : {
          statusID: function () {
            return null;
          },
          params: function () {
              return {
              }
          },
          getListFunction: function() {
            return UserService.getUsers;
          },
          attributes : function() {
            return [{
              title : 'Nombre',
              field : 'name'
            },
            {
              title: 'Apellido',
              field: 'lastName'
            },
            {
              title: 'Email',
              field: 'email'
            },
            {
              title: 'Tipo',
              field: 'type.name'
            },
            {
              title: 'Estado',
              field: 'user.state'
            }];
          },
          elementName : function() {
            return 'usuario';
          }
        }
      });

      modalInstance.result.then(function(user) {
        vm.package.selectedUser = user;
      });
    }


  }

})();
