(function() {
  angular
    .module('PaQuery')
    .controller('AdminUsersController', AdminUsersController);

  AdminUsersController.$inject = ['$scope', '$state', 'UserService', '$timeout'];

  function AdminUsersController($scope, $state, UserService, $timeout) {
    var vm = this;
    angular.extend(vm, {
      editUser: editUser,
      deleteUser: deleteUser,
      textSearch: textSearch,
      getUsers: UserService.getUsers
    });
    init();

    function init() {
        vm.userStatus = [
          { name:"Todos", id: null },
          { name:"Activo", id: 1 },
          { name:"Pendiente de Validación", id: 2 },
          { name:"Dados de baja", id: 6 }
        ];

        vm.userRoles = [
          { name:"Todos", id: null },
          { name:"Administrador", id: 1 },
          { name:"Cliente", id: 2 },
          { name:"Administrador OPL", id: 3 },
          { name:"Operador OPL", id: 4 },
          {name: 'Operador MP', id: 6},
          { name:"Administrador PPOINT", id: 7 },
          {name: 'Operador PPOINT', id: 8}
        ];
    }

    function editUser(user) {
      $state.go('admin.user', { user: user, action: 'update' });
    }

    function textSearch() {
      vm.searchWord;
    }

    function deleteUser(userId) {
      UserService.deleteCustomer(userId).then(function() {
        $state.reload();
      });

    }

    $scope.$watch('vm.searchWord', function () {
      vm.userFilterStatus = null;
    })

  }
})();
