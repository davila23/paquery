(function() {
  'use strict';

  angular
    .module('PaQuery')
    .controller('FrontPaymentsController', frontPaymentsController);

  frontPaymentsController.$inject = ['SessionService', '$uibModal', 'FrontPaymentsService', '$state'];

  function frontPaymentsController(SessionService, $uibModal, FrontPaymentsService, $state) {
    var vm = this;

    angular.extend(vm, {
      getPayments: FrontPaymentsService.getPayments,
      getMovements: FrontPaymentsService.getMovements,
      showPayment: showPayment,
      showPackage: showPackage,
      setTabConfig: setTabConfig,
      filterDate: {
        fromDate: {},
        toDate: {}
      },
      onSearchChange: onSearchChange
    });


    init();

    function init() {
      setDatePickers();
      getPaymentTypes();
      vm.cardContent = "payments";
    }

    function setTabConfig(tabName) {
        vm.cardContent = tabName;
    }

    function modalInstances(payment, animation, size, backdrop, keyboard) {
      var modalInstance = $uibModal.open({
        animation: animation,
        templateUrl: 'components/front/payments/editPayment/editPayment.html',
        controller: 'FrontEditPaymentController',
        controllerAs: 'vm',
        size: size,
        backdrop: backdrop,
        keyboard: keyboard,
        resolve: {
          payment: function() {
            return payment;
          },
          paymentTypes: function() {
            return vm.paymentTypes;
          }
        }
      });
    }

    function showPayment(payment) {
      modalInstances(payment, true, '', 'static', true);
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

    function getPaymentTypes() {
            FrontPaymentsService.getPaymentTypes()
                .then(function(response) {
                    vm.paymentTypes = response.data;
                });
    }

    function showPackage(packageData) {
       $state.go('front.viewPackage', { obj: packageData });
    }

  }

})();
