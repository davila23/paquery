(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('ShopsController', shopsController);

    shopsController.$inject = ['$scope', '$state', 'serverErrorsNotifier', 'ShopsService', '$window', 'SessionService', '$location'];

    function shopsController($scope, $state, serverErrorsNotifier, ShopsService, $window, SessionService, $location) {
        
        var esAdmin = SessionService.getUserType() == 'admin';


        $scope.authorizeButton = true;
        $scope.generateButton = esAdmin;
        $scope.textoOperacion = "";
        $scope.email = '';


        init();

        function init() {

        }

        function obtenerCredenciales() {

            var result = {};
            
            result.code = $location.search().code;
            result.usermail = $location.search().usermail;
            
            return result;
        }

        $scope.authorizeUser = function (caronteForm) {

            $scope.required = true;

            if(!$scope.email)
                return !caronteForm.$valid;

            $scope.operacionConExito = false;
            $scope.textoOperacion = "";

            $scope.textoOperacion = ShopsService.sendAuthorizeUser($scope.email);
        };

        $scope.generatePackage = function (caronteForm) {

            $scope.required = false;

            $scope.operacionConExito = false;
            $scope.textoOperacion = "";

            $scope.textoOperacion = ShopsService.sendGeneratePackage();

        };

        var creds = obtenerCredenciales();

        if (creds.code && creds.usermail)
            ShopsService.sendMercadoShopToken(creds.code, creds.usermail);


    }

})();
