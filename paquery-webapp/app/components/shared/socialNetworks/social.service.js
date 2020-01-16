(function() {
    'use strick';
    angular.module('PaQuery')
        .factory('authSocial', AuthSocial).run(Run);

    AuthSocial.$inject = ['$state', 'UrlHelper', '$q', 'SessionService', 'ProfileService'];

    function AuthSocial($state, UrlHelper, $q, SessionService, ProfileService) {
        var client_id = '801798471011-u89qgtlutce49u1ee51mlvrch15jhdv7.apps.googleusercontent.com';

        function loginFacebookStatus() {
            var _self = this;
            var def = $q.defer();

            FB.Event.subscribe('auth.authResponseChange', function(res) {
                if (res.status === 'connected') {
                    var url = 'apptoken',
                        config = {
                            accesstoken: res.authResponse.accessToken,
                            grant_type: "facebook",
                        };
                    def.resolve(UrlHelper.post(url, config));


                    _self.getUserInfo();
                } else {

                }

            });
            return def.promise;

        }

        getUserInfo = function() {

            var _self = this;
            FB.api('/me', { fields: "id,about,age_range,picture,bio,birthday,context,email,first_name,gender,hometown,link,location,middle_name,name,timezone,website,work" },
                function(res) {
                    /*
                    					$rootScope.$apply(function() {
                    						$rootScope.userSocial = _self.userSocial = res;
                    					});
                    				*/
                });

        }

        logoutFacebook = function() {
            var _self = this;
            FB.logout(function(response) {
                /*
                				$rootScope.$apply(function() {
                					$rootScope.userSocial = _self.userSocial = {};
                				});
                			*/
            });
        }
        loginFacebook = function(tyc) {
            FB.init({
                appId: '1039248932803162',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.4'
            });

            FB.login(function(response) {
                if (response.authResponse) {
                    access_token = response.authResponse.accessToken;
                    user_id = response.authResponse.userID;

                    FB.api('/me', { fields: 'name, email,birthday, hometown,education,gender,website,work' }, function(result) {

                        if (result.email) {
                            result.access_token = access_token;
                            grant_access(result, false, tyc);
                            user_email = result.email;
                        }
                    });
                }
            }, {
                scope: 'email,user_hometown,user_birthday,user_education_history,user_website,user_work_history',
                return_scopes: true
            });
        }

        function logOutGoogle() {
            gapi.auth.signOut();
        }

        function loginGoogleStatus() {

            var def = $q.defer();
            gapi.load('auth2', function() {
                gapi.auth.authorize({
                    client_id: client_id,
                    scope: 'https://www.googleapis.com/auth/plus.login',
                    immediate: true
                }, function(e) {
                    var url = 'apptoken',
                        config = {
                            accesstoken: e.access_token,
                            grant_type: "google",
                        };
                    def.resolve(UrlHelper.post(url, config));
                });
            });
            return def.promise;
        }

        function loginGoogle(tyc) {
            gapi.auth.authorize({
                client_id: client_id,
                scope: 'https://www.googleapis.com/auth/userinfo.email',
                immediate: false
            }, function(response) {
                gapi.client.load("oauth2", "v2", function() {
                    gapi.client.oauth2.userinfo.get().execute(function(b) {
                        b.access_token = response.access_token;
                        grant_access(b, true, tyc);
                    });
                });

            });
        }

        function grant_access(access_data, bol, tyc) {
            var config = {
                accesstoken: access_data.access_token,
                grant_type: (bol ? "google" : "facebook")
            };
            var def = $q.defer();
            SessionService.socialLogin(config, tyc).then(function(exito) {
              $state.go('front.dashboard');
              def.resolve(exito);
            }, function(error) {
              if ((error.headers().data === "PendingValidation") && (error.headers().authmode === "2" || error.headers().authmode === "3" || error.headers().authmode === "1")) {
                if(error.headers().pendingmobile === "True") {
                  $state.go('frontCompleteLogin', {
                      user: {
                          id: error.headers().id,
                          authmode: error.headers().authmode
                      }
                  });
                } else if (error.headers().data === "PendingValidation"){
                  $state.go('frontValidateCode', {
                      user: {
                          id: error.headers().id,
                          authmode: error.headers().authmode
                      }
                  });
                }
              }
            })
        }

        createUser = function(config) {
            var url = 'api/customer/create';
            return UrlHelper.post(url, config);
        }

        return {
            getUserInfo: getUserInfo,

            loginFacebook: loginFacebook,
            loginGoogle: loginGoogle,

            loginFacebookStatus: loginFacebookStatus,
            loginGoogleStatus: loginGoogleStatus,

            logoutFacebook: logoutFacebook,
            logOutGoogle: logOutGoogle,
        };
    }

    Run.$inject = ["$window"];

    function Run($window) {

        $window.fbAsyncInit = function() {
            FB.init({
                appId: '1039248932803162',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.4'
            });
        };

    }
})()
