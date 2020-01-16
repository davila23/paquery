(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('ShopsService', ShopsService);

    ShopsService.$inject = ['UrlHelper', '$http', 'serverErrorsNotifier', 'CARONTE_ENDPOINT', '$window', '$location'];

    function ShopsService(UrlHelper, $http, serverErrorsNotifier, CARONTE_ENDPOINT, $window, $location) {

        var factory = {
            sendAuthorizeUser: sendAuthorizeUser,
            sendGeneratePackage: sendGeneratePackage,
            sendMercadoShopToken: sendMercadoShopToken
        };

        return factory;

        function sendAuthorizeUser(email) {

            var request = {
                method: 'GET',
                url: CARONTE_ENDPOINT + 'ml/authUrl?usermail=' + email,
            };

            $http(request)
                .success(function (response) {
                    console.log(response);
                    $window.location.href = response.forwardUrl;
                    
                })
                .error(function (error) {
                    //serverErrorsNotifier.notify(error.message);
                    console.log(error)
                    return error;
                });
        }

        function sendMercadoShopToken(code, usermail){
            // var url = new URL(window.location.pathname);
            // var code = url.searchParams.get("code");
            // var usermail = url.searchParams.get("usermail");
            var request = {
                method: 'GET',
                url: CARONTE_ENDPOINT + 'ml/credentials?code=' + encodeURI(code) +'&usermail=' + encodeURI(usermail)
            };
            $http(request)
                .success(function (response) {
                    console.log(response);
                    return response;
                })
                .error(function (error) {
                    //serverErrorsNotifier.notify(error.message);
                    console.log(error);
                    return error;
                });


        }

        function sendGeneratePackage() {

            var request = {
                method: 'POST',
                url: CARONTE_ENDPOINT + 'users/createPackages',
                headers: {
                    'Authorization': 'Basic Y2Fyb250ZTpjNHIwbnQz'
                }
            };

            $http(request)
                .success(function (response) {
                    console.log(response);
                    return response;
                })
                .error(function (error) {
                    //serverErrorsNotifier.notify(error.message);
                    console.log(error);
                    return error;
                });
        }

    }

})();
