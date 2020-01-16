(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('SessionService', SessionService);

  SessionService.$inject = ['$http', '$localStorage', '$state', '$timeout', '$q', 'ENDPOINT', '$rootScope'];

  function SessionService($http, $localStorage, $state, $timeout, $q, ENDPOINT, $rootScope) {
    var path = 'apptoken',
      factory = {
        information: {},
        login: login,
        socialLogin: socialLogin,
        logout: logout,
        forceLogout: forceLogout,
        isLoggedIn: isLoggedIn,
        getToken: getToken,
        setUserType: setUserType,
        getUserType: getUserType,
        getUserInformation: getUserInformation,
        getTokenType: getTokenType
      };

    return factory;

    function login(userAccount, password, userType, tyc) {
      var def = $q.defer(),
        data = {
          username: userAccount,
          password: password,
          grant_type: 'password'
        },
        config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        if (userType === 'admin') {
          path = 'apptoken?isadmin=true';
        } else if (userType === 'front') {
            path = 'apptoken?tyc=' + tyc;
        }

      $http.post(ENDPOINT + path , $.param(data), config)
        .then(function(response) {
          if (response.data.errCode && response.data.errCode !== 0) {
            def.reject();
          } else {
            setUserType(userType);
            saveToken(response.data.access_token, response.data.token_type);
            def.resolve(response.data);
          }
        },function(error){
          def.reject(error);
        });
      return def.promise;
    }

    function socialLogin(data,tyc) {
      var def = $q.defer(),
        config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

      path += '?tyc=' + tyc;

      $http.post(ENDPOINT + path, $.param(data), config)
        .then(function(response) {
          if (response.data.errCode && response.data.errCode !== 0) {
            def.reject();
          } else {
            setUserType('front');
            saveToken(response.data.access_token, response.data.token_type);
            def.resolve(response.data);
          }
        })
        .catch(function(err) {
          console.log(err);
          def.reject(err);
        });

      return def.promise;
    }

    function saveToken(token, tokenType) {
      $localStorage.paq_token = token;
      $localStorage.paq_tokenType = tokenType;
    }

    function getTokenType() {
      var tokenType = $localStorage.paq_tokenType;
      if (tokenType) {
        return tokenType;
      } else {
        return false;
      }
    }

    function getToken() {
      var token = $localStorage.paq_token;
      if (token) {
        return token;
      } else {
        return false;
      }
    }

    function isLoggedIn() {
      var token = getToken();
      if (token) {
        return true;
      } else {
        return false;
      }
    }

    function logout() {
      var logoutPath = 'api/authentication/logout',
        headers = { 'Authorization': getTokenType() + ' ' + getToken() },
        def = $q.defer();


      $http.get(ENDPOINT + logoutPath, {
          headers: headers
        })
        .then(function(response) {
          if ((response.errCode && response.errCode !== 0) || response.data.data === null) {
            notificate();
            def.reject(false);
          } else {
            forceLogout();
          }
        })
        .catch(function(err) {
          if(err.status && err.status === 401) {
            forceLogout();
          } else {
            def.reject(err);
          }
        });
    }

    function clearStoredData() {
      delete $localStorage.paq_token;
      delete $localStorage.paq_tokenType;
      delete $localStorage.userType;
    }

    function forceLogout() {
      var userType = getUserType(),
        state = userType === 'admin' ? 'adminLogin' : userType === 'front' ? 'frontLogin' : '';

      clearStoredData();
      $state.go(state);
    }

    function setUserType(userType) {
      $localStorage.userType = userType;
    }

    function getUserType() {
      return $localStorage.userType;
    }

    function setUserInformation(info) {
      factory.information = info;
      $localStorage.information = info;
    }

    function getUserInformation() {
      if (angular.equals(factory.information, {}) && $localStorage.information) {
        factory.information = $localStorage.information;
      }
      return factory.information;
    }

  }

})();
