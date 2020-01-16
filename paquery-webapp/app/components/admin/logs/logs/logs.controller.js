(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminLogsController', AdminLogsController);

    AdminLogsController.$inject = ['$scope', '$state', '$uibModal', 'LogsService', '$rootScope'];

    function AdminLogsController($scope, $state, $uibModal, LogsService, $rootScope) {
        var vm = this;
        angular.extend(vm, {
            deleteLog: deleteLog,
            showException: showException,
            getLogs: LogsService.getAll,
        });

        init();

        function init() {
            $rootScope.mainContainerExpanded = true;
            getLogTypes();
            removeExpandOnDestroy();
        }

        function removeExpandOnDestroy() {
            $scope.$on('$destroy', function() {
                $rootScope.mainContainerExpanded = false;
            });
        }

        function getLogTypes() {
            LogsService.getLogTypes()
                .then(function(response) {
                    vm.logTypes = response.data;
                });
        }

        function modalInstances(exception, animation, size, backdrop, keyboard) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'components/admin/logs/exceptionModal/exception.html',
                controller: 'logExceptionController',
                controllerAs: 'vm',
                size: 'lg',
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    exception: function() {
                        return exception;
                    }
                }
            });
        }

        function showException(exception) {
            modalInstances(exception, true, '', 'static', true);
        }

        function deleteLog() {
            LogsService.deleteLog()
                .then(function() {
                    $state.reload();
                });
        }
    }

})();
