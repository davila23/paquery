(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminTrackPackageController', AdminTrackPackageController);

    AdminTrackPackageController.$inject = ['$scope', '$state', 'SessionService', 'W3wSerice', 'serverErrorsNotifier', 'vcRecaptchaService', 'PackagesService', 'TrackingService','KEYCAPTCHA'];

    function AdminTrackPackageController($scope, $state, SessionService, W3wSerice, serverErrorsNotifier, vcRecaptchaService, PackagesService, TrackingService,KEYCAPTCHA) {
        var vm = this;
        vm.responseCurrentUbication = {}

        angular.extend(vm, {
            getInfoPackage: getInfoPackage,
            stateConfirm: stateConfirm,
            showMap: false,
            cardContent: 'origin',
            wizardStep: 1,
            destiny: {
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
            }
        });

        $scope.response = null;
        $scope.widgetId = null;
        vm.showForReset = true;

        $scope.model = {
            key: KEYCAPTCHA
        };

        PackagesService.getPackagesStatus()
            .then(function(status) {
               vm.statusPosibles = status;
            });

        $scope.setResponse = function (response) {
            $scope.response = response;
        };

        $scope.setWidgetId = function (widgetId) {
            $scope.widgetId = widgetId;
        };

        $scope.cbExpiration = function() {
            vm.showForReset = false;
            vcRecaptchaService.reload($scope.widgetId);
            $scope.response = null;
        };

        function getInfoPackage() {
            TrackingService.getValidationRecaptcha($scope.response)
                .then(function(result) {
                    var responseOfGoogle = JSON.parse(result.data);
                    if(responseOfGoogle.success == true){

                        TrackingService.getInformationPackage(vm.codePackage)
                            .then(function(result) {
                                vm.package = result.data[0];
                                if(vm.package != undefined){
                                    cargarDatosPackage(vm.package);
                                    packageStates(vm.package);

                                    TrackingService.getCurrentUbicationPackage(vm.codePackage)
                                        .then(function (response) {
                                            vm.responseCurrentUbication = response.data;
                                            setValuesMap();
                                        })
                                        .catch(function (error) {
                                            vm.showMap = false;
                                        });
                                }else{
                                    serverErrorsNotifier.notify("No se encontró paquete con código: " + vm.codePackage);
                                }
                                vm.showForReset = false;
                                vcRecaptchaService.reload($scope.widgetId);
                            })
                            .catch(function () {
                                serverErrorsNotifier.notify("No se encontró paquete con código: " + vm.codePackage);
                                vm.showForReset = false;
                                vcRecaptchaService.reload($scope.widgetId);
                            });
                    }else{
                        serverErrorsNotifier.notify("Error con la validacion de captcha, por favor reingrese captcha");
                        vm.showForReset = false;
                        vcRecaptchaService.reload($scope.widgetId);
                    }
                })
                .catch(function () {
                    serverErrorsNotifier.notify("Error con la validacion de captcha, por favor reingrese captcha");
                    vm.showForReset = false;
                    vcRecaptchaService.reload($scope.widgetId);
                });
        }

        function cargarDatosPackage(pkg)  {
            try {
                vm.statusList = filtrarStates(pkg)

                vm.packageDestino = pkg.shippingScheduleDestination.shippingAddress.addressDetail;
                vm.packageAliasW3W = pkg.shippingScheduleDestination.shippingAddress.geoKey;

                vm.packageFechaEntrega = pkg.deliveryDate ? new Date(pkg.deliveryDate) : new Date(pkg.shippingScheduleDestination.scheduledDate);
                vm.packageFechaEntrega.setDate( vm.packageFechaEntrega.getDate() );

            }
            catch(e) {
                console.error("Error al cargar datos de paquete", e);
            }

        }


        function packageStates(pack) {
            // PackagesService.getPosiblePackagesStatus(pack.id)
            //     .then(function(s) { vm.packageStatusPosibles = s })
        }

        function setValuesMap() {
            vm.showMap = true;
            vm.destiny= {
                addressInformation: {
                    stringValue: vm.responseCurrentUbication.detail ? vm.responseCurrentUbication.detail : '',
                    location: {
                        lat: vm.responseCurrentUbication.lat ? vm.responseCurrentUbication.lat : undefined,
                        lng: vm.responseCurrentUbication.lng ? vm.responseCurrentUbication.lng : undefined
                    },
                    address: vm.responseCurrentUbication.detail ? vm.responseCurrentUbication.detail : '',
                    w3w: vm.responseCurrentUbication.geoKey ? vm.responseCurrentUbication.geoKey : '',
                    immediately: {
                        status: '',
                        date: moment(vm.responseCurrentUbication.creationDate).format('DD/MM/YYYY hh:mm')
                    }
                }
            }
        }

        function stateConfirm(state) {
            if (!vm.package)
                return false;

            var item = GetItemStatusListById(vm.package.status);

            if (isSpecialStatus(vm.package.status) && vm.package.status !== 31 && vm.package.status !== 32)
            {
                return (state.statusId !== 21 && state.statusId !== 40)
            }
            else
                return item.orden < state.orden;
        }

        function isSpecialStatus(status)
        {
            return status == 21 || status == 40 || status == 31 || status==32
        }

        function filtrarStates(pkg) {
            var states = [];

            statusList.forEach(function(s) {

                var state = angular.copy(s);

                var item = GetItemStatusListById(pkg.status);

                state.confirm = item.orden <= state.orden || (isSpecialStatus(pkg.status) && pkg.status != 31 && pkg.status!=32);// == 21 || pkg.status == 40;

                if (pkg.status == state.statusId)
                    vm.packageStatus = state.desc;

                // agrego los estados excepcionales solo si es el actual
                if ((pkg.status == state.statusId || !state.excep || (pkg.status == 32 && state.statusId==31)))
                {
                    if ((isSpecialStatus(pkg.status)) || !isSpecialStatus(pkg.status))
                    {
                        states.push(state);
                    }
                }
                    

            });

            if (states.length > 0)
                states[states.length - 1].fin = true;

            return states;
        }

        function obtenerStateExcep(s) {
            var result = undefined;
            statusListExcep

            return result;
        }

        function GetItemStatusListById(current)
        {
            var res;
            statusList.forEach(function (s) {
                if (current == s.statusId)
                {
                    res = s;
                }
            })

            return res;
        }

        var statusList = [
            {
                orden: 0,
                desc: "Pendiente de ingreso a PaQuery",
                statusId: 1,
                image: 'confirm'
            },
            {
                orden: 1,
                desc: "Ingresado a PaQuery",
                statusId: 22,
                image: 'confirm'
            },
            {
                orden: 2,
                desc: "Arribado a PaQuery Point",
                statusId:2,
                image: 'quality'
            },
            {
                orden: 3,
                desc:"En Poder del Paquer",
                statusId:3,
                image: 'dispatch'
            },
            {
                orden: 4,
                desc:"En camino",
                statusId:4,
                image: 'confirm',
                excep: true
            },
            {
               orden: 5,
               desc:"Pendiente de programar",
               statusId:5,
               image: 'confirm',
               excep: true
            },
            {
                orden: 6,
                desc: "Intento de Entrega 1",
                statusId: 31,
                image: 'confirm',
                excep: true
            },
            {
                orden: 7,
                desc: "Intento de Entrega 2",
                statusId: 32,
                image: 'confirm',
                excep: true
            },
            {
                orden: 8,
                desc:"Entregado",
                statusId:20,
                image: 'delivery'
            },
            {
                orden: 9,
                desc:"Cancelado",
                statusId:21,
                image: 'confirm',
                excep: true

            },
            //{
            //    orden: 8,
            //    desc:"Pendiente de Pago",
            //    statusId:30,
            //    image: 'confirm',
            //    excep: true
            //},
            {
                orden: 10,
                desc: "Devuelto",
                statusId: 40,
                image: 'confirm',
                excep: true
            }
            
        ];

        var statusListExcep = [

        ]



    }
})();
