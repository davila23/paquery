(function() {
    'use strict';

    angular.module('PaQuery')
        .controller('FrontSidebarController', FrontSidebarController);

    FrontSidebarController.$inject = ['SessionService', 'ProfileService', '$rootScope', '$timeout'];

    function FrontSidebarController(SessionService, ProfileService, $rootScope, $timeout) {
        var vm = this;

        angular.extend(vm, {
            logout: logout,
            userName: ''
        });

        $rootScope.$on('profile-picture-change', function(event, newPicture) {
            vm.profilePicture = 'data:image/jpeg;base64,' + newPicture;
        });

        init();

        function init() {
            getUserProfile();
        }

        function logout() {
            SessionService.logout();
        }

        function getUserProfile() {
            ProfileService.getUserProfile()
                .then(function(response) {
                    vm.userName = response.data.name + ' ' + response.data.lastName;
                    vm.profilePicture = response.data.avatar;
                });
        }

    }

})();
