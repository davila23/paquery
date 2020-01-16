(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminPaymentsController', adminPaymentsController);

    adminPaymentsController.$inject = ['$uibModal', 'PaymentsService'];

    function adminPaymentsController($uibModal, PaymentsService, $state) {
        var vm = this;
        angular.extend(vm, {
            showPayment: showPayment,
            filterDates: filterDates,
            setTabConfig: setTabConfig,
            getPayments: PaymentsService.getAllPayments,
            getMovements: PaymentsService.getMovements,
            showPackage: showPackage,
            filterDate: {
                fromDate: {},
                toDate: {}
            },
            onSearchChange: onSearchChange
        });

        init();

        function init() {
            vm.cardContent = 'payments';
            setDatePickers();
            getPaymentTypes();
        }

        function setTabConfig(tabName) {
            vm.cardContent = tabName;
        }

        function getPaymentTypes() {
            PaymentsService.getPaymentTypes()
                .then(function(response) {
                    vm.paymentTypes = response.data;
                });
        }

        function modalInstances(payment, animation, size, backdrop, keyboard) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'components/admin/payments/editPayment/editPayment.html',
                controller: 'EditPaymentController',
                controllerAs: 'vm',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    payment: function() {
                        return payment;
                    }
                }
            });
        }

        function showPayment(payment) {
            modalInstances(payment, true, '', 'static', true);
        }

        function filterDates() {
            console.log(vm.filterDate);
        }

        function setDatePickers() {
            angular.element('#date-time-picker-1').datetimepicker();
            angular.element('#date-time-picker-2').datetimepicker();
            angular.element("#date-time-picker-1").on("dp.change", function(newVal) {
                vm.filterDate.fromDate = newVal.date._d;
            });
            angular.element("#date-time-picker-2").on("dp.change", function(newVal) {
                vm.filterDate.toDate = newVal.date._d;
            });
        }

        function onSearchChange(newTerm, oldTerm) {
            vm.tableSorting.filter({ $: newTerm });
            vm.tableSorting.reload();
        }

        function showPackage(packageData) {
            $state.go('admin.viewPackage', { obj: packageData });
        }
    }

})();
