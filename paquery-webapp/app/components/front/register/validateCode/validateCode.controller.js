(function() {
  angular.module('PaQuery').controller('FrontValidationCodeController', frontValidationCodeController);

  frontValidationCodeController.$inject = ['$state', 'ValidateCodeSerice', '$stateParams', 'SessionService', 'authSocial'];

  function frontValidationCodeController($state, ValidateCodeSerice, $stateParams, SessionService, authSocial) {
    var vm = this;

    angular.extend(vm, {
      validateCode: validateCode,
      user: $stateParams.user
    });
    init();
    function init() {
      console.log($stateParams.user);
      if (!$stateParams.user) {
       $state.go('frontLogin');
      }
    }
    function validateCode() {
     ValidateCodeSerice.adminValidateCode(vm.user.id, vm.code)
     .then(function(response){
       if ($stateParams.user.authmode === "2") {
         $state.go('frontLogin', { registedUser: true} );
      } else if (vm.user.email && vm.user.password) {
         SessionService.login(vm.user.email, vm.user.password, 'front')
         .then(function(userInformation) {
           $state.go('front.dashboard');
         })
         .catch(function() {
           vm.errorMessage = 'Usuario o contraseña incorrectos';
         })
       }else {
         $state.go('frontLogin');
       }


     });
    }
  }
})();
