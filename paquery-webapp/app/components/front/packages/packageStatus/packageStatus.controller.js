(function() {
    angular.module('PaQuery')
        .controller('FrontPackageStatusController', FrontPackageStatusController);

    FrontPackageStatusController.$inject = ['$state', 'package', '$modalInstance', 'FrontPackageService'];

    function FrontPackageStatusController($state, package, $modalInstance, FrontPackageService) {
        var vm = this;

        angular.extend(vm, {
            numStar: new Array(5),
            package: package,
            wizardStep: 2,
            comment: '',
            confirmVerificationCode: confirmVerificationCode,
            validatePackage: validatePackage,
            cancel: cancel,
            typeSend: package.packageType,
            disableSaveButton: package.status !== 2 && package.status !== 3
        });

        init();

        function getCalification() {
            var shippingScheduleId = vm.package.packageType === 2 ? vm.package.shippingScheduleOrigin.id : vm.package.shippingScheduleDestination.id;

            FrontPackageService.getCalification(shippingScheduleId).then(function(response) {
                vm.target = 5 - response.data.ranking;
                vm.comment = response.data.comment;
            });
        }

        function confirmVerificationCode() {
            var config = {
                packageID: package.id,
                driverPairCode: vm.addressSchedule.driverPairCode,
                userPairCode: vm.addressSchedule.userPairCode,
                comment: vm.comment,
                ranking: (5 - vm.target)
            };

            FrontPackageService.confirmVerificationCode(config).then(function(response) {
                $modalInstance.close();
                $state.go("front.dashboard");
            }, function(error) {
                console.log(error);
            });
        }

        function validatePackage() {
            var config = {
                packageID: package.id,
                driverPairCode: vm.addressSchedule.driverPairCode,
                userPairCode: vm.addressSchedule.userPairCode,
                comment: vm.comment,
                ranking: (5 - vm.target)
            };

            FrontPackageService.confirmVerificationCode(config).then(function(response) {
                $state.go("front.dashboard");
                $modalInstance.close();
            }, function(error) {
                console.log(error);
            });
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
            $state.go("front.dashboard")
        }

        function init() {
            if (package && package.packageType) {
                if (package.status === 2 ) {
				  vm.addressSchedule = package.shippingScheduleOrigin;
                }else if (package.status === 3 ) {
                  vm.addressSchedule = package.shippingScheduleDestination;
                }
                FrontPackageService.get_QR(vm.addressSchedule.driverPairCode).then(function(response) {
                    vm.base = response.data;
                    console.log(vm.base);
                }, function(error) {
                    console.log(error);
                });
                if (vm.package.status === 2 || vm.package.status === 3) {
                    getCalification();
                }


            }

            if (!package) {
                $state.go("front.dashboard");
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
