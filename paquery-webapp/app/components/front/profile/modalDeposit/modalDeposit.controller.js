(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('FrontDepositController', FrontDepositController)

    FrontDepositController.$inject = ['$rootScope', '$uibModalInstance', 'ProfileService', '$timeout', 'ResultPaymentsMPService'];

    function FrontDepositController($rootScope, $uibModalInstance, ProfileService, $timeout,ResultPaymentsMPService) {
        var vm = this;

        angular.extend(vm, {
            cancel: cancel,
            ok: ok,
            validDepositForm: validDepositForm,
            rate:''
        });

        function openMpIframe(iFrameUrl) {
            var responded = false;
            $MPC.openCheckout({
                url: iFrameUrl,
                mode: "modal",
                onreturn: function(json) {
                  window.stop();
                  ResultPaymentsMPService.GatewayResult(json.external_reference)
                    .then(function(response) {
                      if (!responded) {
                        responded = true;
                        if (response.data) {
                          var message = {
                            status: true,
                            data: "Su deposito se ha hecho correctamente"
                          };
                          $rootScope.$broadcast('message', message);
                        }else {
                          var message = {
                            status: false,
                            data: "Ha ocurrido un error"
                          };
                          $rootScope.$broadcast('errorMessage', message);
                        }
                      }
                    });
                  }

            });
        }

        function ok() {
          if (vm.rate == false) {
            vm.errorMessage = "Debe ingresar un monto valido";
          }else {
            vm.errorMessage = "";
            ProfileService.postMPLink(vm.rate)
              .then(function(response) {
                $uibModalInstance.dismiss('cancel');
                openMpIframe(response.data.init_point);
              });
          }
        }

        function cancel() {
          $uibModalInstance.dismiss('cancel');
        }

        function validDepositForm(form) {
          return !form.$valid;
        }
    }

})();
