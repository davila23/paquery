(function() {
    angular.module('PaQuery')
        .controller('AdminPackageStatusController', AdminPackageStatusController);

    AdminPackageStatusController.$inject = ['$state', 'PackagesService', 'package', '$modalInstance'];

    function AdminPackageStatusController($state, PackagesService, package, $modalInstance) {
        var vm = this;

        angular.extend(vm, {
            numStar: new Array(5),
            package: package,
            wizardStep: 2,
            comment: '',
            cancel: cancel,
            typeSend: package.packageType
        });

        init();

        function cancel() {
            $modalInstance.dismiss('cancel');
            $state.go("admin.packages");
        }

        function init() {
          // console.log(package);
            if (package && package.status) {
              if (package.status === 2 ) {
                vm.addressSchedule = package.shippingScheduleOrigin;
              }else if (package.status === 3 ) {
                vm.addressSchedule = package.shippingScheduleDestination;
              }

                PackagesService.get_QR(vm.addressSchedule.driverPairCode).then(function(response) {
                    vm.base = response.data;
                }, function(error) {
                    console.log(error);
                });
            }

            if (!package) {
                $state.go("admin.dashboard");
            }
        }


        var data = vm.addressSchedule.driverPairCode;
        vm.direccion = "https://api.qrserver.com/v1/create-qr-code/?data=" + data + "&size=220x220&margin=7";
        vm.direccionFBEncoded = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(vm.direccion);
        vm.direccionTWTEncoded = "https://twitter.com/intent/tweet?text=PaQuery&url="+encodeURIComponent(vm.direccion);
        //Se hace esto por el double binding
        vm.urlCodigoQR = vm.direccion;

        vm.shareFacebook = function() {
            window.open(vm.direccionFBEncoded, "pop", "width=600, height=400, scrollbars=no");
            return false;
        };

        vm.shareTwitter = function() {
            window.open(vm.direccionTWTEncoded, "pop", "width=600, height=400, scrollbars=no");
            return false;
        };

    }
})();
