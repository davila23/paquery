(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('EditAddressController', editAddressController);

    editAddressController.$inject = ['$scope', '$window', '$uibModalInstance', 'address', 'W3wSerice', 'AddressesService'];

    function editAddressController($scope, $window, $uibModalInstance, address, W3wSerice, AddressesService) {
        var vm = this;

        angular.extend(vm, {
            data: false,
            geoLocationAddress: geoLocationAddress,
            wizardStep: 2,
            ok: ok,
            cancel: cancel,
            disableOk: disableOk,
            address: address
        });

        init();

        function init() {
            vm.addressModel = {
                address: vm.address.addressDetail,
                location: {
                    lat: vm.address.lat,
                    lng: vm.address.lng,
                },
                w3w: vm.address.geoKey
            };
            vm.addressModel.data = true;
            // vm.address.addressModel = { location: { lat: address.lat, lng: address.lng } };
            // vm.address.addressModel.address = address.addressDetail;
            // vm.address.addressModel.address = address.addressDetail;
            console.log(vm.address);
            console.log(vm.addressModel.data);
        }

        function geoLocationAddress() {
            navigator.geolocation.getCurrentPosition(function(position) {
                var location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                W3wSerice.getW3w(location.lat, location.lng).then(function(response) {
                    vm.addressModel.w3w = response.data.words;
                    angular.element("#w3w-address-input")[0].focus();
                })
            })
        }

        function disableOk(form) {
            return !form.$valid;
        }

        function ok() {
            var sendData = {
                ID: vm.address.id,
                Name: vm.addressModel.address,
                Comment: vm.address.comment,
                AddressDetail: vm.addressModel.address,
                GeoKey: vm.addressModel.w3w,
                Lat: vm.addressModel.location.lat,
                Lng: vm.addressModel.location.lng
            };
            AddressesService.actionsAddress(sendData)
                .then(function(response) {
                    console.log(response);
                    $uibModalInstance.close(address);
                });
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$watch('vm.addressModel.w3w', function(newValue) {
            if (newValue && newValue.lat && newValue.lng) {
                W3wSerice.getW3w(newValue.lat, newValue.lng)
                    .then(function(response) {
                        vm.addressModel.w3w = response.data.words;
                        angular.element('#destiny-w3w-container').addClass('fg-toggled');
                    });
            } else {
                vm.addressModel.w3w = '';
                angular.element('#address-w3w-container').removeClass('fg-toggled');
            }
        }, true);
    }

})();