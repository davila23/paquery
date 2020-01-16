(function() {
    'use strict';

    angular.module('PaQuery')
        .controller('AdminSidebarController', AdminSidebarController);

    AdminSidebarController.$inject = ['SessionService', 'ProfileService','$scope'];

    function AdminSidebarController(SessionService, ProfileService, $scope) {
        var vm = this;

        angular.extend(vm, {
            logout: logout,
            userName: '',
            authentication: authentication
        });

        init();

        function init(){
            getUserProfile();
        }

        function logout() {
            SessionService.logout();
        }

        function authentication(viewPermison) {
            return (vm.authPageRol.includes(viewPermison) || vm.authPageRol.length==0)
        }

        function getUserProfile() {
            ProfileService.getUserProfile()
                .then(function(response) {
                  vm.getUserFinish = true;
                  vm.paqueryAdmin = response.data.mainPaqueryAdmin;
                  vm.authPageRol = response.data.userRoleActions;
                  vm.auth = vm.authPageRol.length > 0;
                  vm.userName = response.data.name + ' ' +  response.data.lastName;
                  vm.profilePicture = response.data.avatarImg;
                  vm.user = response.data;
                });
        }

    }

})();
