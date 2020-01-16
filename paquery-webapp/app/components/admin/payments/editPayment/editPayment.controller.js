(function() {
  'use strict';
  angular
    .module('PaQuery')
    .controller('EditPaymentController', editPaymentController);

  editPaymentController.$inject = ['$modalInstance', 'payment', 'PaymentsService', 'AppTypesService', 'PackagesService', '$state'];

  function editPaymentController($modalInstance, payment, PaymentsService, AppTypesService, PackagesService, $state) {
    var vm = this;

    angular.extend(vm, {
      ok: ok,
      showPackage: showPackage,
      cancel: cancel
    });

    init();

    function init() {
      if (payment.transactionTrace.status !== "Transacción pendiente") {
        var infoError = payment.transactionTrace;
        if (infoError.status === "approved") {
          payment.infoError = "El pago fue aprobado y acreditado.";
        }
        else if (infoError.status === "rejected") {
          payment.infoError = "El pago fue rechazado.";
        }
        else if (infoError.status === "pending") {
          payment.infoError = "El pago está siendo revisado.";
        }
        else if (infoError.status === "in_process") {
          payment.infoError = "El pago está siendo revisado.";
        }
        else if (infoError.status === "in_mediation") {
          payment.infoError = "Los usuarios tienen iniciada una disputa.";
        }
        else if (infoError.status === "cancelled") {
          payment.infoError = "El pago fue cancelado por una de las partes, o porque el tiempo expiró.";
        }
        else if (infoError.status === "refunded") {
          payment.infoError = "El pago fue devuelto al usuario.";
        }
        else if (infoError.status === "charged_back") {
          payment.infoError = "Fue hecho un contracargo en la tarjeta del pagador.";
        }
      }else {
        payment.infoError = "El usuario no completó el proceso de pago.";
      }
      vm.editedPayment = payment;
      getPaymentTypes();

      vm.paymentStates = [{
        id: 1,
        name: 'Error'
      }, {
        id: 2,
        name: 'Otra incidencia'
      }];
    }

    function getPaymentTypes() {
      AppTypesService.getPaymentTypes()
        .then(function(response) {
          vm.paymentTypes = response.data;
        });
    }

    function ok() {
      $modalInstance.close();
    };

    function showPackage(idPackage) {
      PackagesService.getPackage(idPackage)
        .then(function(response) {
          $modalInstance.close();
          $state.go('admin.viewPackage', { obj: response.data });
        })
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    };
  }

})();
