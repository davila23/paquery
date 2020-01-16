(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('MassUploadController', massUploadController);

    massUploadController.$inject = ['$scope', '$http', 'ENDPOINT', 'serverErrorsNotifier', 'SessionService', 'PackagesService','$state'];

    function massUploadController($scope, $http, ENDPOINT, serverErrorsNotifier, SessionService, PackagesService, $state) {
        $scope.firstButtonOk = true;
        $scope.secondButtonOk = false;
        $scope.operacionConExito = false;
        $scope.logisticOperators = [{name: 'Lote1',detail:'Lote Numero 1',date:'18/09/17',state:'Procesado OK'},
                                    {name: 'Lote2',detail:'Lote Numero 2',date:'18/09/17',state:'Procesado OK'},
                                    {name: 'Lote3',detail:'Lote Numero 3',date:'18/09/17',state:'Procesado OK'}]
        var vm = this;
        var isUpdate = $state.params.isUpdate === true ? true : false
        angular.extend(vm, {
            isUpdate : isUpdate
        });

        $scope.getTheFiles = function ($files) {
            $scope.formdata = new FormData();
            angular.forEach($files, function (value, key) {
                $scope.formdata.append(key, value);
            });

        };

        init();

        function init() {
            vm.cardContent = 'upload';
        }

        $scope.uploadFiles = function () {
            var request = {
                method: 'POST',
                url: ENDPOINT + 'api/masive/upload',
                data: $scope.formdata,
                headers: {
                    'Authorization': SessionService.getTokenType() + ' ' + SessionService.getToken(),
                    'Content-Type': undefined
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (s) {
                    $scope.firstButtonOk = false;
                    $scope.secondButtonOk = true;
                    $scope.operacionConExito = true;
                    $scope.textoOperacion = 'El archivo se subio con éxito';
                    console.log("upload success" + s)
                })
                .error(function (e) {
                    serverErrorsNotifier.notify(e.message);
                    console.log("upload error" + e)
                });
        };

        $scope.processFiles = function () {

            var url = vm.isUpdate ? 'api/masive/processupdate' : 'api/masive/process';

            var request = {
                method: 'GET',
                url: ENDPOINT + url,
                data: '',
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': SessionService.getTokenType() + ' ' + SessionService.getToken(),
                    'Accept': 'application/pdf'
                }
            };

            PackagesService.exportPdf(request, $scope,undefined, vm.isUpdate);
        }
    }

})();
