(function () {
    'use strict';

    angular.module('PaQuery')
        .factory('UrlHelper', UrlHelper);

    UrlHelper.$inject = ['$http', 'ENDPOINT', 'SessionService', '$q', '$rootScope', '$timeout', 'serverErrorsNotifier', '$uibModal'];

    function UrlHelper($http, ENDPOINT, SessionService, $q, $rootScope, $timeout, serverErrorsNotifier, $uibModal) {
        var factory = {
            get: get,
            post: post,
            deleteEntity: deleteEntity,
            put: put
        };
        var modalLogoutShow = true;

        return factory;

        function get(url, config, decode, customMessage) {
            customMessage = customMessage || null;
            decode = decode || false;
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                },
                path = ENDPOINT + url;

            if (config) {
                if (!decode) {
                    path += '/?' + $.param(config);
                } else {
                    path += '/?' + decodeURIComponent($.param(config));
                }
            }

            $http.get(path, {
                headers: headers
            })
                .then(function (response) {
                    if ((response.errCode && response.errCode !== 0) || response.data.data === null || response.data.code != 0) {
                        var message = null;
                        if (response.data) {
                            message = response.data.message;
                        }
                        notificate(message);
                        if (response.data.data) {
                            def.resolve(response.data);
                        }
                        def.reject(false);
                    } else {
                        if (response.data && response.data.message)
                            notificateSuccess(response.data.message);
                        def.resolve(response.data);
                    }
                })
                .catch(function (response) {
                    if (response.status === 401) {
                        showLogoutModal();
                    } else {
                        notificate(customMessage);
                        def.reject(false);
                    }
                });

            return def.promise;
        }

        function post(url, config) {
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                };


            $http.post(ENDPOINT + url, config, {
                headers: headers
            })
                .then(function (response) {
                    if ((response.errCode && response.errCode !== 0) || response.data.data === null) {
                        notificate(response.data.message || response.message);
                        def.reject(false);
                    } else {
                        def.resolve(response.data);
                    }
                })
                .catch(function (response) {
                    if (response.status === 401) {
                        showLogoutModal();
                    } else {
                        notificate(response.data.message || response.message);
                        def.reject(false);
                    }
                });

            return def.promise;
        }

        function notificateSuccess(message) {
            serverErrorsNotifier.success(message);
        }

        function notificate(a) {
            if (!a) {
                serverErrorsNotifier.notify();
            } else {
                serverErrorsNotifier.notify(a);
            }
        }

        function showLogoutModal() {
            if (modalLogoutShow) {
                modalLogoutShow = false
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/shared/idle/idle.html',
                    controller: 'idleModalController',
                    controllerAs: 'vm',
                    size: '',
                    backdrop: 'static',
                    keyboard: true
                });

                modalInstance.result.then(function () {
                    SessionService.forceLogout();
                });
            }
        }

        function deleteEntity(url, id) {
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                },
                path = ENDPOINT + url;

            if (id) {
                path += '/' + id;
            }

            $http.delete(path, {
                headers: headers
            })
                .then(function (response) {
                    if ((response.errCode && response.errCode !== 0) || response.data.data === null) {
                        notificate();
                        def.reject(false);
                    } else {
                        def.resolve(response.data);
                    }
                })
                .catch(function (response) {
                    if (response.status === 401) {
                        showLogoutModal();
                    } else {
                        notificate(response.data.message);
                        def.reject(false);
                    }
                });
            return def.promise;
        }


        function put(url, config) {
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                };
            url += '/' + config.id;
            console.log(config.detail);
            $http.put(ENDPOINT + url, config, {
                headers: headers
            })
                .then(function (response) {
                    if ((response.errCode && response.errCode !== 0) || response.data.data === null) {
                        notificate(response.data.message || response.message);
                        def.reject(false);
                    } else {
                        def.resolve(response.data);
                    }
                })
                .catch(function (response) {
                    if (response.status === 401) {
                        showLogoutModal();
                    } else {
                        notificate(response.data.message || response.message);
                        def.reject(false);
                    }
                });

            return def.promise;

        }


    }
})();
