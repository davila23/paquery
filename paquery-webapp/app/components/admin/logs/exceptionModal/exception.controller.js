(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('logExceptionController', logExceptionController);

    logExceptionController.$inject = ['$modalInstance', 'exception'];

    function logExceptionController($modalInstance, exception) {
        var vm = this;

        angular.extend(vm, {
            exception: exception,
            ok: ok
        });

        function ok() {
            $modalInstance.close();
        };
    }

})();
