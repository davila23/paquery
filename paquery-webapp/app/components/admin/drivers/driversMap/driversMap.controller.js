(function() {
    angular.module('PaQuery')
        .controller('DriversMapController', DriversMapController);

    DriversMapController.$inject = ['$scope', '$state', '$window', 'PackagesService', 'GeoLocationService', 'LogisticOperatorService', 'DriverService'];

    function DriversMapController($scope, $state, $window, PackagesService, GeoLocationService, LogisticOperatorService, DriverService) {
        var vm = this;

        const noFindValue = {
            label: 'No se han encontrado resultados',
            value: ''
        };

        angular.extend(vm, {
            goBack: goBack,
            logisticOperators: [],
            drivers: [],
            destiny: [],
            showMap: showMap,
            showPackage: showPackage
        });

        function showMap(show) {
            vm.showme = show;
        }

        init();

        function showPackage(pack) {
            PackagesService.getPackage(pack.package.id).then(function (response) {
                $state.go('admin.viewPackage', { obj: response.data });
            });
        }

        $scope.$watch('vm.logisticOperator', function (newValue) {
            if (newValue)
            {
                DriverService.getDriversByLogisticOperator(newValue.id)
                    .then(function (response) {
                        //vm.drivers = response.data;
                        vm.destiny = [];
                        for (var i = 0; i < response.data.length; i++) {
                            var driver = response.data[i];
                            if (driver.currentPosition) {
                                var addressInformation = {
                                    data: driver,
                                    location: {
                                        lat: driver.currentPosition.lat,
                                        lng: driver.currentPosition.lng
                                    },

                                    label: driver.driver.name + " " + driver.driver.lastName,
                                    onClick: function (d) {
                                        vm.drivers = [];
                                        vm.drivers.push(d);
                                        $scope.$apply()
                                    }
                                }
                                vm.destiny.push(addressInformation)
                            }
                        }
                        angular.element('#destiny-address').click()

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        });

        function getLogisticOperators() {
            LogisticOperatorService.getAll(0, 0, true)
                .then(function (response) {
                    for (var mp of response.data) {
                        vm.logisticOperators.push(mp);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        

        function goBack() {
            return $window.history.back();
        }

        //function getPackagesDestiny()
        //{
        //    var city = "";
        //    if (vm.cities.length != 0)
        //    {
        //        city = vm.cities[0].name;
        //    }
        //    PackagesService.getPage(0, 10000, true, true, null, null, 'PendingDelivery', null, city)
        //        .then(function (response) {
        //            var packages = response.data;
        //            vm.destiny = [];
        //            for (var i = 0; i < packages.length; i++) {

        //                var  addressInformation = {
        //                    stringValue: packages[i].shippingScheduleDestination.shippingAddress.addressDetail,
        //                    location: {
        //                        lat: packages[i].shippingScheduleDestination.shippingAddress.lat,
        //                        lng: packages[i].shippingScheduleDestination.shippingAddress.lng
        //                    },
        //                    address: packages[i].shippingScheduleDestination.shippingAddress.addressDetail,
        //                    w3w: packages[i].shippingScheduleDestination.shippingAddress.geoKey,
        //                    externalCode: packages[i].externalCode
        //                }

        //                vm.destiny.push(addressInformation)
        //            }
        //            //if (vm.cities.length==1)
        //            angular.element('#destiny-address').click()
                    
        //        });
        //}

        function init() {
            getLogisticOperators();
        }
        

    }
})();
