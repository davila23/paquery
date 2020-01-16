(function() {
  'use strict';

  angular.module('PaQuery')
    .controller('FrontLoginController', FrontLoginController);

  FrontLoginController.$inject = ['$state', 'SessionService', '$rootScope', 'authSocial', '$stateParams', '$uibModal', '$scope'];

  function FrontLoginController($state, SessionService, $rootScope, authSocial, $stateParams, $uibModal, $scope) {
    var vm = this;

    angular.extend(vm, {
      userAccount: '',
      password: '',
      errorMessage: '',
      tyc:false,
      socialInvalidForm: socialInvalidForm,
      loginFa: authSocial.loginFacebook,
      loginGo: authSocial.loginGoogle,
      login: login,
      logout: logout,
      modalTermsAndConditions: modalTermsAndConditions,
      modalAboutPaQuery: modalAboutPaQuery,
      invalidForm: invalidForm,
      registerUser: registerUser
    });

    init();

    function init() {
      vm.messageRegisterUser = $stateParams.registedUser;
    }

    function modalTermsAndConditions(){
      vm.url = "https://paquery.com/terminosycondiciones.html";
      modalFrime();
    }

    function modalAboutPaQuery(){
      vm.url = "https://paquery.com/sobrepaquery.html";
      modalFrime();
    }
    
    function modalFrime() {
        var modalConfirmation = $uibModal.open({
          animation: true,
          template: "<modal-frime url=" + vm.url + "><modal-frime>",
          size: 'modal-lg'
        });
    }

    function login() {

        if (!invalidForm()) {
            SessionService.login(vm.userAccount, vm.password, 'front', vm.tyc)
                .then(function (userInformation) {
                    debugger;
                    console.log(userInformation);
                    $state.go('front.dashboard');
                }, function (error) {
                    debugger;
                    console.log(error.headers().data);
                    if (error.headers().data === "PendingValidation" || error.data.error_description === "PendingValidation") {
                        vm.errorMessage = "Error";
                        debugger;
                        $state.go('frontValidateCode', {
                            user: {
                                id: error.headers().id
                            }
                        });
                    } else {
                        vm.errorMessage = 'Usuario o contraseña incorrectos';
                    }
                });
        }
    }

    function logout() {
      SessionService.logout();
      authSocial.logoutFacebook();
      authSocial.loginGoogle();
    }

    function invalidForm() {
      return !vm.userAccount || !vm.password || !vm.tyc;
    }

    function socialInvalidForm(exe) {
        if(vm.tyc){
            vm.errorMessage = '';
            exe(vm.tyc);
        } else
            vm.errorMessage = 'Debe aceptar los términos y condiciones';
    }

    function registerUser(){
      $state.go('frontRegister');
    }

  }

})();
