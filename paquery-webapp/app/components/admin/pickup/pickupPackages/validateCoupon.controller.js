(function () {
    'use strict';
    angular
        .module('PaQuery')
        .controller('ValidateCouponController', ValidateCouponController);

    ValidateCouponController.$inject = ['$uibModalInstance', 'data', 'valid'];

    function ValidateCouponController($uibModalInstance, data, valid) {
        var vm = this;

        angular.extend(vm, {
            close: close,
            data: data,
            valid: valid,

        });

        init();

        function init() {
        }

        function close() {
            $uibModalInstance.close();
        }
    }

})();