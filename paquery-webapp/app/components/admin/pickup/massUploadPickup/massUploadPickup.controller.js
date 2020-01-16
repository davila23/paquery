(function () {
    'use strict';

    angular
        .module('PaQuery')
        .controller('MassUploadPickupController', MassUploadPickupController);

    MassUploadPickupController.$inject = ['$scope', '$http', 'API_MS_PACKAGES', 'serverErrorsNotifier', 'PickupService'];

    function MassUploadPickupController($scope, $http, API_MS_PACKAGES, serverErrorsNotifier, PickupService) {
        var vm = this;
        angular.extend(vm, {});

        $scope.getTheFiles = function ($files) {
            $scope.buttonDisabled = false;
            $scope.operacionConExito = false;
            $scope.formdata = new FormData();
            angular.forEach($files, function (value, key) {
                $scope.formdata.append(key, value);
            });

        };

        init();

        function init() {
            $scope.operacionConError = false;
            $scope.operacionConExito = false;
            $scope.textoOperacion = '';
            $scope.buttonDisabled = false;
        }

        $scope.uploadFiles = function () {
            var request = {
                method: 'POST',
                url: API_MS_PACKAGES + 'packages/massive',
                data: $scope.formdata,
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': undefined,
                    'Authorization': PickupService.getAutorizationString()
                }
            };
            $scope.buttonDisabled = true;

            // SEND THE FILES.
            $http(request)
                .success(function (s) {
                    if (s.byteLength == 0) {
                        $scope.operacionConError = false;
                        $scope.operacionConExito = true;
                        $scope.textoOperacion = 'El archivo se Proceso con éxito';
                        $scope.buttonDisabled = false;
                    } else {

                        var blob = new Blob([s], {type: "application/vnd.ms-excel"});
                        var objectUrl = URL.createObjectURL(blob);
                        var anchor = document.createElement("a");
                        var date = new Date().toLocaleString()
                            .replace(" ",";")
                        anchor.download = "PaQuery-Result-" + date + ".xls";
                        anchor.href = objectUrl;
                        anchor.click();
                        $scope.operacionConError = true;
                        $scope.operacionConExito = false;
                        $scope.textoOperacion = 'El archivo contiene Paquetes con Errores, se detallan en el Excel';
                        $scope.buttonDisabled = false;
                    }
                })
                .error(function (e) {
                    $scope.buttonDisabled = false;
                    serverErrorsNotifier.notify(e.message);
                    console.log("upload error" + e)
                });
        };
    }

})();
