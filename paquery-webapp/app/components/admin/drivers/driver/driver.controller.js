(function () {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminDriverController', AdminDriverController);

    AdminDriverController.$inject = ['WorkzoneService', 'DistributionZoneService', '$state', 'SessionService', '$scope', '$timeout', '$stateParams', 'DriverService', 'UserService', 'AppTypesService', '$uibModal', 'PackagesService', '$rootScope', 'MarketplaceService', 'LogisticOperatorService', 'VehiclesService', 'ProfileService', 'serverErrorsNotifier', 'TwilioService', '$filter', 'DELIVERY_TERM', 'PaqueryPointService', 'zonesService'];


    function AdminDriverController(WorkzoneService, DistributionZoneService, $state, SessionService, $scope, $timeout, $stateParams, DriverService, UserService, AppTypesService, $uibModal, PackagesService, $rootScope, MarketplaceService, LogisticOperatorService, VehiclesService, ProfileService, serverErrorsNotifier, TwilioService, $filter, DELIVERY_TERM, PaqueryPointService, zonesService) {
        var vm = this;

        angular.extend(vm, {
            driver: $stateParams.driver || {name: '', workZones: [], distributionZones: [], paqueryPoints: []},
            save: save,
            errorDriver: false,
            cardContent: 'profile',
            openChangePasswordModal: openChangePasswordModal,
            action: $stateParams.driver ? 'update' : 'save',
            userId: $stateParams.driver ? $stateParams.driver.id : undefined,
            geDriverPackages: getDriverPackages,
            getHistoryDriverPackages: PackagesService.getHistoryDriverPackages,
            distributionZones: [],
            paqueryPoints: [],
            setTabConfig: setTabConfig,
            showPackage: showPackage,
            isFormValid: isFormValid,
            openVehicleModal: openVehicleModal,
            vehicleSpecial: vehicleSpecial,
            showMap: showMap,
            getCoor: getCoor,
            getParse: getParse,
            getJsonData: getJsonData,
            getJsonDataHistory: getJsonDataHistory,
            addlogisticOperator: addlogisticOperator,
            removeLO: removeLO,
            addDistributionZone: addDistributionZone,
            removeDistributionZone: removeDistributionZone,
            addPaqueryPoint: addPaqueryPoint,
            removePaqueryPoint: removePaqueryPoint,
            nombreCsv: 'paquetes_' + $filter('date')(new Date(), 'yyyy-MM-dd'),
            nombreCsvHistorial: 'paquetes_historial_' + $filter('date')(new Date(), 'yyyy-MM-dd'),
            origin: {
                datepicker: {
                    open: false
                },
                addressInformation: {
                    address: '',
                    location: {
                        lat: undefined,
                        lng: undefined
                    },
                    immediately: {
                        status: true,
                        date: ''
                    }
                },
                w3w: ''
            },
            destiny: {
                datepicker: {
                    open: false
                },
                addressInformation: {
                    address: '',
                    location: {
                        lat: undefined,
                        lng: undefined
                    },
                    immediately: {
                        status: true,
                        date: ''
                    }
                },
                w3w: ''
            },
            packagesSizes: [],
            date: {
                birthDate: ''
            },
        });

        init();

        function init() {
            vm.errorMessages = {mobileInvalid: false};
            vm.formularioValido = true;
            vm.driver.mobile = Number(vm.driver.mobile);
            //vm.driver.datepicker = {
            //    datepicker: {
            //        open: false
            //    }
            //};

            getCountries();
            getUserTypes();
            getPackageSizes();
            getPackageTypes();
            getPackagesStatus();
            getMarketPlaces();
            getLogisticsOperators();
            getVehicles();
            getPageAdmin();
            // getWorkzones();
            getDeliveryTerms();
            getPackagesSizes();
            getDistributionZones();
            getPaqueryPoints();
            if(vm.driver.paqueryPoints===undefined){
                vm.driver.paqueryPoints=[];
            }
            //vm.onDateSetOrigin = function (newDate, oldDate) {
            //    vm.driver.birthDate = moment(vm.date.birthDate).format('DD/MM/YYYY hh:mm');

            //    vm.driver.datepicker.open = false;
            //    angular.element('.input-date#birthDate').addClass('fg-toggled');
            //    $scope.$broadcast('destiny-date-changed');
            //}

            //vm.beforeDateSetDestiny = function ($view, $dates) {
            //    if (vm.date.birthDate) {
            //        var activeDate = moment(vm.date.birthDate).subtract(1, $view).add(1, 'minute');

            //        $dates.filter(function (date) {
            //            return date.localDateValue() <= activeDate.valueOf()
            //        }).forEach(function (date) {
            //            date.selectable = false;
            //        })
            //    }
            //}
        }

        function getDistributionZones() {
            DistributionZoneService.getAllDistributionZone()
                .then(dzones => {
                    vm.distributionZones = dzones
                    vm.dzone = dzones[0];
                })
                .catch()
        }


        function getPaqueryPoints() {
            //TODO REFACTOR CANTIDAD TOTAL
            PaqueryPointService.getAll().then(function (response) {
                vm.paqueryPoints = response.data;
            }).catch(function () {
                console.log(error);
            });
        }

        function addDistributionZone() {
            if (vm.driver.distributionZones.length) {

                vm.errorDriver = false;
                if (_.find(vm.driver.distributionZones, (dzDriver) => dzDriver.id === vm.dzone.id) != null)
                    vm.errorDriver = "No se pueden ingresar Zonas de Distribución iguales";

                if (!vm.errorDriver && vm.driver.distributionZones.length < vm.distributionZones.length) {
                    vm.driver.distributionZones.push(vm.dzone);
                }
            } else {
                vm.driver.distributionZones.push(vm.dzone);
            }
        }

        function removeDistributionZone(elem) {
            vm.driver.distributionZones.splice(vm.driver.distributionZones.indexOf(elem), 1);
        }

        //$scope.$watch('vm.driver.datepicker.open', function (newValue) {
        //    vm.driver.datepicker.show = vm.driver.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
        //});

        //$scope.$watch('vm.driver.datepicker.open', function (newValue) {
        //    vm.driver.datepicker.show = vm.driver.datepicker.open ? { 'display': 'block' } : { 'display': 'none' };
        //});

        function getDriverPackages(page, take, desc, isScheduled, driverId, search, status, sortColumn) {

            var searchRolled = vm.searchRolled;
            angular.element("#input2").val("")
            vm.searchRolled = "";

            return PackagesService.getDriverPackages(page, take, desc, isScheduled, driverId, search, status, sortColumn, null, null, null, null, null, null, null, null, null, searchRolled);

        }

        function getDeliveryTerms() {
            vm.deliveryTerms = DELIVERY_TERM;
        }

        function getWorkzones() {
            WorkzoneService.getWorkzones(0, 0, false).then(function (result) {
                vm.availableWorkzones = result.data;
            }).catch(function (error) {
                console.log(error);
            });

        }

        function getCoor() {
            console.log("coordenadas");
        }

        function showMap(show) {
            vm.showme = show;
        }

        function getPageAdmin() {
          ProfileService.getUserProfile()
              .then(function(response) {
                vm.pageAuth = response.data.userRoleActions;
              });
        }

        function getVehicles() {
            if (vm.driver.specialVehicle == 3) {
                vm.driver.onbike = true;
            } else if (vm.driver.specialVehicle == 7) {
                vm.driver.onwalk = true;
            } else {

                if (vm.driver.vehicleID) {
                    VehiclesService.getVehicles(0, 0, true)
                        .then(function (response) {
                            //for (var value of response.data) {
                            var values = response.data;
                            for (var i = 0; i < values.length; i++) {
                                var value = values[i];
                                if (vm.driver.vehicleID === value.id) {
                                    vm.selectedVehicle = value;
                                    return false;
                                }
                            }
                        });
                }
            }
        }

        function getMarketPlaces() {
            MarketplaceService.getAll(0, 0, true)
                .then(function (response) {
                    var found = false;
                    vm.marketplaces = response.data;
                    for (var i = 0; i < vm.marketplaces.length; i++) {
                        if (vm.marketplaces[i].id === vm.driver.marketplaceID) {
                            vm.driver.marketplace = vm.marketplaces[i];
                            found = true;
                        }
                    }
                    if (!found) {
                        vm.driver.marketplace = vm.marketplaces[0];
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function getLogisticsOperators() {

            LogisticOperatorService.getAll(0, 0, true)
                .then(function (response) {
                    var found = false;
                    vm.logisticOperators = response.data;

                    if (!$stateParams.driver) {
                        vm.driver.logisticOperator = vm.logisticOperators[0];
                    } else {

                        for (var i = 0; (i < vm.logisticOperators.length) && vm.driver.logisticOperators.length; i++) {
                            if (vm.logisticOperators[i].id === vm.driver.logisticOperators[0].id) {
                                vm.driver.logisticOperator = vm.logisticOperators[i];
                                found = true;
                            }
                        }
                        if (!found) {
                            vm.driver.logisticOperator = vm.logisticOperators[0];
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        function getPackageSizes() {
            PackagesService.getPackagesSize().then(function (response) {
                vm.packagesSizes = response.data;
            }, function (error) {
                console.log(error);
            });
        }

        function getPackageTypes() {
            PackagesService.getPackagesTypes().then(function (response) {
                vm.packagesTypes = response.data;
            }, function (error) {
                console.log(error);
            });
        }

        function getPackagesStatus() {
            PackagesService.getPackagesStatus()
                .then(function (response) {
                    vm.packagesStatus = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        var watchStateChange = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.mainContainerExpanded = false;
            watchStateChange();
        });

        function setTabConfig(tabName) {
            angular.element('div[ui-view].container').addClass('width-transition');
            vm.cardContent = tabName;
            if (tabName === 'packages' || tabName === 'packageshistory') {
                $rootScope.mainContainerExpanded = true;
            } else {
                if (tabName === 'profile') {
                    $rootScope.mainContainerExpanded = false;
                }
            }
            $timeout(function () {
                angular.element('div[ui-view].container').removeClass('width-transition');
            }, 600);
        }

        function getUserTypes() {
            UserService.getUserTypes()
                .then(function (response) {
                    vm.userTypes = response.data;
                    vm.driver.type = vm.userTypes[0];
                });
        }

        function getCountries() {
            AppTypesService.getCountries()
                .then(function (response) {
                    vm.countries = response.data;
                    if (!$stateParams.driver) {
                        vm.driver.country = response.data[0];
                    } else {
                        var done = false;
                        for (var i = 0; i < vm.countries.length && !done; i++) {
                            if (vm.countries[i].id === $stateParams.driver.countryID) {
                                vm.driver.country = vm.countries[i];
                                done = true;
                            }
                        }
                        if (!done) {
                            vm.driver.country = vm.countries[0];
                        }
                    }
                    if (vm.countries.length) {
                        var countryId = $stateParams.driver ? $stateParams.driver.countryID : vm.countries[0].id;
                        loadCities(countryId);
                        watchCountryChanges();
                    }
                });
        }

        function watchCountryChanges() {
            $scope.$watch('vm.driver.country', function (newVal) {
                if (newVal) {
                    loadCities(newVal.id);
                }
            });
        }

        function loadCities(countryId) {
            AppTypesService.getCities(countryId)
                .then(function (response) {
                    vm.cities = response.data;
                    if (!$stateParams.driver) {
                        vm.driver.city = response.data[0];
                    } else {
                        var done = false;
                        for (var i = 0; i < vm.cities.length && !done; i++) {
                            if (vm.cities[i].id === $stateParams.driver.cityID) {
                                vm.driver.city = vm.cities[i];
                                done = true;
                            }
                        }
                        if (!done) {
                            vm.driver.city = vm.cities[0];
                        }
                    }
                });
        }

        function updateDriver() {
            //if (!vm.driver.logisticOperator)
            //{
            //    vm.driver.logisticOperator = {id : null}
            //}

            //vm.driver.logisticOperator.id = vm.pageAuth.length === 0 ? vm.driver.logisticOperator.id : null;
            var idsOPL = [];
            for (var opl of vm.driver.logisticOperators) {
                idsOPL.push({ID: opl.id});
            }

            var specialVehicle;
            if (vm.driver.onwalk)
                specialVehicle = 7 //enum bici
            else if (vm.driver.onbike)
                specialVehicle = 3 //enum sin vehiculo

            if (vm.driver.logisticOperator && vm.pageAuth)
                vm.driver.logisticOperator.id = vm.pageAuth.length === 0 ? vm.driver.logisticOperator.id : null;
            else
                vm.driver.logisticOperator = { id: null};

            DriverService.update(vm.driver.id, vm.driver.name, vm.driver.lastName, vm.driver.email, vm.driver.docNumber,
                vm.driver.country.id, vm.driver.city.id, vm.driver.password, Number(vm.driver.mobile), vm.driver.phone,
                vm.driver.avatarName, vm.driver.avatar,
                vm.driver.active, /*vm.driver.marketplace.id
                idsOPL,*/ vm.selectedVehicle ? vm.selectedVehicle.id : null, specialVehicle, vm.driver.workZones.map(getWorkZoneId), null, null,
                vm.driver.cuil, vm.driver.cbu, vm.driver.birthDate, vm.driver.distributionZones)
                .then(function (response) {
                    // console.log(response);
                    $state.go("admin.drivers");
                });

            // DriverService.updateDriver({
            //             ...vm.driver, mobile: Number(vm.driver.mobile),
            //             VehiclesID:  vm.selectedVehicle ? vm.selectedVehicle.id : null,
            //             specialVehicle,
            //     })
            //     .then(function(response) {
            //         console.log(response);
            //         $state.go("admin.drivers");
            //     });
            // //

            // { vm.driver.id, vm.driver.name, vm.driver.lastName, vm.driver.email, vm.driver.docNumber,
            //     vm.driver.country.id, vm.driver.city.id, vm.driver.password, Number(vm.driver.mobile), vm.driver.phone,
            //     vm.driver.avatarName, vm.driver.avatar,
            //     vm.driver.active, /*vm.driver.marketplace.id*/
            //     idsOPL, vm.selectedVehicle ? vm.selectedVehicle.id : null, specialVehicle,
            //     vm.driver.workZones.map(getWorkZoneId), null, null, vm.driver.cuil, vm.driver.cbu, vm.driver.birthDate}
        }

        function createDriver() {

            // var idsOPL = [];
            // for (var opl of vm.driver.logisticOperators) {
            //     idsOPL.push({ID: opl.id});
            // }

            //if (!vm.driver.logisticOperator) {
            //    vm.driver.logisticOperator = { id: null }
            //}
            //vm.driver.logisticOperator.id = vm.pageAuth.length === 0 ? vm.driver.logisticOperator.id : null;
            var specialVehicle;
            if (vm.driver.onwalk)
                specialVehicle = 7; //enum bici
            else if (vm.driver.onbike)
                specialVehicle = 3; //enum sin vehiculo

            DriverService.create(vm.driver.name, vm.driver.lastName, vm.driver.email, vm.driver.docNumber,
                vm.driver.country.id, vm.driver.city.id, vm.driver.password, Number(vm.driver.mobile), vm.driver.phone,
                vm.driver.avatar, vm.driver.active || false, /*vm.driver.marketplace.id
                idsOPL,*/ vm.selectedVehicle ? vm.selectedVehicle.id : null, specialVehicle, vm.driver.workZones.map(getWorkZoneId),
                vm.driver.avatarName, null, null, null, vm.driver.cuil, vm.driver.cbu, vm.driver.birthDate, vm.driver.distributionZones)
                .then(function (response) {
                    console.log(response);
                    $state.go("admin.drivers");
                });
        }

        function getPackagesSizes() {
            PackagesService.getPackagesSize()
                .then(function (response) {
                    vm.packagesSizes = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getWorkZoneId(e) {
            return {ID: e.id}
        }

        function isFormValid(form) {
            if (vm.action === 'update') {
                vm.formularioValido = form.$valid && (vm.selectedVehicle || vm.driver.onwalk || vm.driver.onbike);
                vm.showVehicleError = (!vm.selectedVehicle && !vm.driver.onwalk && !vm.driver.onbike);
            } else {
                vm.formularioValido = form.$valid && vm.driver.password && (vm.selectedVehicle || vm.driver.onwalk || vm.driver.onbike);
                vm.showPasswordError = !vm.driver.password;
                vm.showVehicleError = (!vm.selectedVehicle && !vm.driver.onwalk && !vm.driver.onbike);
            }
            return vm.formularioValido;
        }

        function save(form) {
            vm.submitClicked = true;
            if (vm.driver.mobile) {
                TwilioService.validateMobile(vm.driver.country.dialingCode + vm.driver.mobile)
                    .success(function (response) {
                        //if(response.data && (response.data.carrier.type).toLowerCase() == 'mobile'){
                        vm.errorMessages.mobileInvalid = false;
                        vm.formularioValido = true;
                        saveDriver(form);
                        //}else{
                        //    vm.errorMessages.mobileInvalid = true;
                        //    vm.formularioValido = false;
                        //}
                    }).error(function (e) {
                    serverErrorsNotifier.notify('Se ha producido un error inesperado. Consulte con el administrador del sistema.');
                });
            } else {
                saveDriver(form);
            }

        }

        function saveDriver(form) {
            if (isFormValid(form)) {
                if (vm.action === 'update') {
                    updateDriver();
                } else {
                    createDriver();
                }
            }
        }

        function openChangePasswordModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/admin/changePasswordModal/changePassword.html',
                controller: 'AdminChangePasswordController',
                controllerAs: 'vm',
                size: 'modal-sm',
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    userType: function () {
                        return 'driver'
                    },
                    userId: function () {
                        return vm.driver ? vm.driver.id : false;
                    }
                }
            });

            modalInstance.result.then(function (newPassword) {
                if (vm.driver && newPassword) {
                    vm.driver.password = newPassword;
                    vm.showPasswordError = false;
                } else {
                    vm.showPasswordError = true;
                }
            });
        }

        function showPackage(obj) {
            var photo = obj.avatar;
            PackagesService.getPackage(obj.id)
                .then(function (response) {
                    response.data.avatar = photo;
                    $state.go('admin.viewPackage', {obj: response.data, previusUrl: "admin.driver"});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function openVehicleModal() {
            modalInstances();
        }

        function modalInstances() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/admin/drivers/vehicleModal/vehicleModal.html',
                controller: 'AdminModalVehicleController',
                controllerAs: 'vm',
                size: 'modal-lg',
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    logisticOperatorId: function () {
                        if (vm.driver.logisticOperator)
                            return vm.driver.logisticOperator.id;
                        else
                            return 0;
                    }
                }
            });

            modalInstance.result.then(function (vehicle) {
                // console.log(vehicle);
                vm.selectedVehicle = vehicle;
                vm.showVehicleError = false;
            });
        }

        function vehicleSpecial(type) {
            if (type == 'bike') {
                vm.driver.onwalk = false
            } else {
                vm.driver.onbike = false
            }
        }

        $scope.headerList = {
            externalCode: 'Externo',
            shippingScheduleDestination: 'Nombre destinatario',
            caption: 'Descripción',
            user: 'Usuario',
            creationDate: 'Creación',
            status: 'Estado',
            marketPlaceName: 'Empresa',
            deliveryDate: 'Fecha de entrega',
            deliveryTerm: 'Plazo',
            packageSize: 'Tamaño',
            rollContainerPosition: 'Rollcontainer/Posición',
            originName: 'Nombre Origen',
            originAddress: 'Dirección Origen',
            destinyAddress: 'Dirección destino',
            destinyComment: 'Destino Comentarios',
            destinyAddressComment: 'Destino Dir Comentarios'
        };

        function getParse(data) {
            var log = [];
            angular.forEach(data, function (value) {
                var exp = {};
                exp.externalCode = value.externalCode;
                exp.shippingScheduleDestination = value.shippingScheduleDestination ? value.shippingScheduleDestination.name : '';
                exp.caption = value.caption;
                exp.user = value.user ? value.user.email : '';
                exp.creationDate = value.creationDate ? $filter('date')(new Date(value.creationDate), 'dd-MM-yyyy HH:mm:ss') : '';
                exp.status = value.status ? _.findWhere(vm.packagesStatus, {value: value.status}).name : '';
                exp.marketPlaceName = value.marketPlace ? value.marketPlace.name : '';
                exp.deliveryDate = $filter('date')(new Date(value.deliveryDate), 'dd-MM-yyyy HH:mm:ss');
                exp.deliveryTerm = value.deliveryTerm ? _.findWhere(DELIVERY_TERM, {value: value.deliveryTerm}).name : '';
                exp.packageSize = _.findWhere(vm.packagesSizes, {value: value.packageSize}).name;
                exp.rollContainerPosition = value.rollContainerPosition

                exp.destinyAddress = value.shippingScheduleDestination.shippingAddress.addressDetail;
                exp.destinyComment = value.shippingScheduleDestination.comment;
                exp.destinyAddressComment = value.shippingScheduleDestination.shippingAddress ? value.shippingScheduleDestination.shippingAddress.comment : ""

                exp.originName = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.name : '';
                exp.originAddress = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.shippingAddress.addressDetail : '';


                this.push(exp);
            }, log);
            return log;
        }

        function getJsonData() {
            return PackagesService.getDriverPackages(0, 100000, true, false, vm.driver.id, vm.searchWord, null, null);
        }

        function getJsonDataHistory() {
            return PackagesService.getHistoryDriverPackages(0, 100000, true, false, vm.driver.id, vm.searchWord, null, null);
        }

        function addlogisticOperator() {
            if (!vm.driver.logisticOperators) {
                vm.driver.logisticOperators = [];
            }

            if (vm.driver.logisticOperators.length) {
                for (var i = 0; i < vm.driver.logisticOperators.length; i++) {
                    if (vm.driver.logisticOperator.id !== vm.driver.logisticOperators[i].id) {
                        vm.errorOL = false;
                    } else if (vm.driver.logisticOperator.id === vm.driver.logisticOperators[i].id) {
                        vm.errorOL = "No se pueden ingresar Operadores Logicos iguales";
                        return false;
                    }
                }
                if (!vm.errorOP && vm.driver.logisticOperators.length < vm.logisticOperators.length) {
                    vm.driver.logisticOperators.push(vm.driver.logisticOperator);
                }
            } else {
                vm.driver.logisticOperators.push(vm.driver.logisticOperator);
            }
        }


        function removeLO(elem) {
            vm.driver.logisticOperators.splice(vm.driver.logisticOperators.indexOf(elem), 1);
        }

        function addPaqueryPoint() {
            if (!vm.driver.paqueryPoints) {
                vm.driver.paqueryPoints = [];
            }
            if (vm.driver.paqueryPoints.length) {
                vm.errorDriver = false;
                if (_.find(vm.driver.paqueryPoints, (ppDriver) => ppDriver.id === vm.paqueryPoint.id) != null)
                    vm.errorDriver = "No se pueden ingresar Paquery Point iguales";

                if (!vm.errorDriver && vm.driver.paqueryPoints.length < vm.paqueryPoints.length) {
                    vm.driver.paqueryPoints.push(vm.paqueryPoint);
                    assignDzToDriver(vm.paqueryPoint,true);
                }
            } else {
                vm.driver.paqueryPoints.push(vm.paqueryPoint);
                assignDzToDriver(vm.paqueryPoint, true);
            }
        }

        function removePaqueryPoint(elem) {
            vm.driver.paqueryPoints.splice(vm.driver.paqueryPoints.indexOf(elem), 1);
            assignDzToDriver(elem, false);
        }

        function assignDzToDriver(ppoint, add) {
            PaqueryPointService.getDzToPPoint(ppoint.id).then(function (result) {
                _.forEach(result.data, (dz) => {
                    if (!_.find(vm.driver.distributionZones, (d) => dz.id === d.id) && add) {
                        vm.driver.distributionZones.push(dz);
                    }
                    if (!add) {
                        vm.driver.distributionZones.splice(vm.driver.distributionZones.indexOf(dz), 1);
                    }
                });
                vm.driver.distributionZones.sort();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

})();
