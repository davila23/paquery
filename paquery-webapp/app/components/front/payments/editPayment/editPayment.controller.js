(function() {
  'use strict';
  angular
    .module('PaQuery')
    .controller('FrontEditPaymentController', frontEditPaymentController);

  frontEditPaymentController.$inject = ['$modalInstance', 'payment', 'paymentTypes', 'FrontPackageService', '$state'];

  function frontEditPaymentController($modalInstance, payment, paymentTypes, FrontPackageService, $state) {
    var vm = this;

    angular.extend(vm, {
      ok: ok,
      showPackage: showPackage,
      paymentTypes: paymentTypes
    });

    init();

    function init() {
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
      }
      vm.editedPayment = payment;
    }

    function showPackage(idPackage) {
      FrontPackageService.loadPackage(idPackage)
        .then(function(response) {
          $modalInstance.close();
          $state.go('front.viewPackage', { obj: response.data });
        })
    }

    function ok() {
      $modalInstance.close();
    }
  }

})();
