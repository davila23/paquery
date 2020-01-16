angular.module('PaQuery')

.run([
    'SessionService',
    '$rootScope',
    '$state',
    '$stateParams',
    '$timeout',
    '$anchorScroll',
    '$window',
    'ProfileService',
    function(SessionService, $rootScope, $state, $stateParams, $timeout, $anchorScroll, $window, ProfileService) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
           //debugger;
          // if (fromState.name === "frontCompleteLogin") {
          //   event.preventDefault();
          // }
          // if (toState.name === "frontCompleteLogin" && fromState.url === "ʌ"){
          //
          // }
            if (!SessionService.isLoggedIn()) {
              debugger;
                if (toState.data && toState.data.permission) {
                    event.preventDefault();
                    $state.go(fromState.name || toState.data.permission + 'Login');
                }
            } else {
               validationCode(toState);
                var userType = SessionService.getUserType();
                if (isGoingToLogin(toState.name) || ( userType && userType !== toState.data.permission && toState.data.permission !== 'common')) {
                    event.preventDefault();
                    $state.go(userType + '.dashboard');
                }

                ProfileService.getUserProfile().then(function(response){
                  //if (!response.data.mainPaqueryAdmin && (toState.name === "admin.marketplace" || toState.name === "admin.marketplaces")) {
                  //  event.preventDefault();
                  //  $state.go('admin.dashboard')
                  //} else
                  if (!(response.data.userRoleActions.length === 0)) {
                    auth(toState, ProfileService, $state, event, $rootScope);
                  }
                });

            }

            if ((toState.name === "frontCompleteLogin" && toParams.user === null)) {
              $state.go('frontLogin');
            }

            $anchorScroll();
        });

        function isGoingToLogin(state) {
            return state === 'adminLogin' || state === 'frontLogin' || state === 'frontRegister' || state === 'frontValidateCode';
        }

        function validationCode(state){
           if (state) {
             ProfileService.getUserProfile();
           }
         }

        function auth(state, ProfileService, $state, e, $rootScope) {
          var dashboardValid = state.name !== "admin.dashboard" && state.name !== "admin.dashboards";
          var vehiculeValid = state.name !== "admin.vehicle" && state.name !== "admin.vehicles";
          var packageValid = state.name !== "admin.viewPackage"
              && state.name !== "admin.packages"
              && state.name !== "admin.packagesHistory"
              && state.name !== "admin.statusPackage"
              && state.name !== "admin.packagesMap"
              && state.name !== 'admin.pickupPackages' && state.name !== 'admin.pickupHistory' && state.name !== 'admin.viewPickupPackage' && state.name !== 'admin.massUploadPickup' ;
          var driversValid = state.name !== "admin.driver" && state.name !== "admin.drivers";
          var usersValid = state.name !== "admin.user" && state.name !== "admin.users";
          var sendPackageValid = state.name !== "admin.sendPackage";
          var receivePackageValid = state.name !== "admin.receivePackage";
          var Opl = state.name !== "admin.logisticOperator" && state.name !== "admin.logisticOperators";
          var trackPackage = state.name !== "admin.trackPackage" && state.name !== "admin.trackPackages";
          var massUpload = state.name !== "admin.massUpload";

          if (packageValid && driversValid && sendPackageValid && Opl && vehiculeValid && usersValid && dashboardValid && trackPackage && massUpload) {
            e.preventDefault();
          }
            ProfileService.getUserProfile()
                .then(function(response) {
                    for (var pages of response.data.userRoleActions) {
                        if (pages==="Alta Masiva" || pages === "Paquetes" || pages === "Paquers" || pages === "Enviar" || pages === "Vehiculos" || pages === "Usuarios" || pages === "Dashboard") {
                            if (massUpload && trackPackage && packageValid && driversValid && sendPackageValid && Opl && vehiculeValid && usersValid && dashboardValid) {
                              $state.go("admin.dashboard");
                            }
                          }else{
                            return;
                          }
                        }
                });



        }

    }
]);
