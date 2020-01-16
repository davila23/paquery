(function () {
    'use strict';

    angular.module('PaQuery')
        .factory('msPickup', msPickup);

    msPickup.$inject = ['$http', 'API_MS_PACKAGES', 'SessionService', '$q', '$rootScope', '$timeout', 'serverErrorsNotifier', '$uibModal'];

    function msPickup($http, API_MS_PACKAGES, SessionService, $q, $rootScope, $timeout, serverErrorsNotifier, $uibModal) {
        var factory = {
            get: get,
            post: post,
            delete: _delete,
            put: put,
            getAutorizationString: getAutorizationString
        };
        var modalLogoutShow = true;

        return factory;

        function getAutorizationString() {
            var token = SessionService.getToken();
            var tokenType = SessionService.getTokenType();

            return tokenType + ' ' + token;
        }

        function get(url, config, decode, customMessage) {
            customMessage = customMessage || null;
            decode = decode || false;
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                },
                path = API_MS_PACKAGES + url;

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
                    // if (!response.data.data.content) {
                        def.resolve(response.data);
                    // } else {
                        // var responseFactory = {
                        //     data: response.data.data.content
                        // };
                        // def.resolve(responseFactory);
                        // def.resolve(response);
                    // }

                    //   if ((response.errCode && response.errCode !== 0) || response.data.data === null || response.data.code!=0)
                    //   {
                    //       var message = null;
                    //       if (response.data)
                    //       {
                    //           message = response.data.message;
                    //       }
                    //       notificate(message);
                    //       if (response.data.data)
                    //       {
                    //         var responseFactory = {
                    //           data: response.data.data.content
                    //         };
                    //           def.resolve(responseFactory);
                    //       }
                    //   def.reject(false);
                    // } else {
                    //     var responseFactory = {
                    //       data: response.data.data.content
                    //     } ;
                    //   def.resolve(responseFactory);
                    // }
                })
                .catch(function (response) {
                    if (response.status === 401) {
                        showLogoutModal();
                    } else {
                        notificate((response.data && response.data.message) || customMessage);
                        def.reject(false);
                    }
                });

            return def.promise;
        }

        function post(url, data) {
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                };


            $http.post(API_MS_PACKAGES + url, "", config, {
                headers: headers
            }, {responseType: 'arraybuffer'})
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

        function _delete(url, config) {
            var def = $q.defer(),
                token = SessionService.getToken(),
                tokenType = SessionService.getTokenType(),
                headers = {
                    'Authorization': tokenType + ' ' + token
                },
                path = API_MS_PACKAGES + url;

            if (config) {
                path += '/?' + $.param(config);
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
            if (config.id) {
                url += '/' + config.id;
            } else {
                if (config) {
                    url += '/?' + $.param(config);
                }
            }

            $http.put(API_MS_PACKAGES + url, config, {
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
