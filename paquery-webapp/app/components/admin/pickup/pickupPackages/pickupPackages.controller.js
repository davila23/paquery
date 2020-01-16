(function () {
        'use strict';

        angular
            .module('PaQuery')
            .controller('PickupPackagesController', PickupPackagesController);

        PickupPackagesController.$inject = ['PackagesService', 'PickupService', '$state', '$http', 'UrlHelper', '$scope', '$filter', 'DELIVERY_TERM', 'ProfileService', '$uibModal','MarketplaceService'];

        function PickupPackagesController(PackagesService, PickupService, $state, $http, UrlHelper, $scope, $filter, DELIVERY_TERM, ProfileService, $uibModal,MarketplaceService) {
            var vm = this;
            angular.extend(vm, {
                getPackages: getPackages,
                deletePackage: deletePackage,
                cancelPackage: cancelPackage,
                showPackage: showPackage,
                getParse: getParse,
                getJsonData: getJsonData,
                validateCouponPickupPackage: validateCouponPickupPackage,
                checkCouponPickupPackage: checkCouponPickupPackage,
                authentication: authentication,
                actionBySearchArrived: actionBySearchArrived,
                refreshPackages: refreshPackages
            });

            init();

            function checkCouponPickupPackage(id) {
                PickupService.checkCouponPickupPackage(id).then(function (response) {
                    var valid = mappedCouponStatus(response);
                    resultCoupon(response.data, valid);
                }).catch(function (error) {
                    console.log(error);
                });
            }

            function validateCouponPickupPackage(id) {
                PickupService.validateCouponPickupPackage(id).then(function (response) {
                    var valid = mappedCouponStatus(response);
                    resultCoupon(response.data, valid);
                }).catch(function (error) {
                    console.log(error);
                });
            }

            function actionBySearchArrived(searchArrived) {
                PickupService.actionBySearchArrived(searchArrived).then(function (response) {
                    updateTableSortingByPackageID(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            }

            function mappedCouponStatus(response) {
                if (response.data.status == 0) {
                    return true;
                } else {
                    return false;
                }
            }

            function resultCoupon(data, valid) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/admin/pickup/pickupPackages/validate.html',
                    controller: 'ValidateCouponController',
                    controllerAs: 'vm',
                    size: 'modal-sm',
                    backdrop: 'static',
                    keyboard: true,
                    resolve: {
                        data: data,
                        valid: valid,
                    }
                });

                modalInstance.result.then(function () {
                    // Actualizo el paquete en la lista si es valido(status 0)
                    if (data.status == 0) {
                        var index = vm.tableSorting.data.findIndex(paquete => paquete.id === data.package.id);
                        vm.tableSorting.data[index] = data.package;
                    }
                });
            }

            function updateTableSortingByPackageID(paqueryPackage){
                var index = vm.tableSorting.data.findIndex(paquete => paquete.id === paqueryPackage.id);
                vm.tableSorting.data[index] = paqueryPackage;
            }

            function getPackages(page, take, desc, isScheduled, userId, search, status, sortColumn, city) {
                var search = vm.searchWord;
                if (search == 0 || search == null) {
                    search = "";
                }
                angular.element("#input2").val("")

                return PickupService.getPage(page, take, desc, isScheduled, userId, search, status, sortColumn, city);

            }

            function init() {
                getUserProfile();
                getPackagesStatus();
                getPackagesTypes();
                getPackagesSizes();
                getDeliveryTerms();
                getMarketplaces();
            }


            function getDeliveryTerms() {
                vm.deliveryTerms = DELIVERY_TERM;
            }

            function getPackagesStatus() {
                PackagesService.getPackagesStatus()
                    .then(function (response) {
                        vm.packagesStatus = response.data.filter(function (item) {
                            return item.name !== 'Cancelado' && item.name !== 'Entregado';
                        });
                        vm.packagesStatus.unshift({name: "Todos", value: null});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            function getPackagesTypes() {
                PackagesService.getPackagesTypes()
                    .then(function (response) {
                        vm.packagesTypes = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
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

            function showPackage(obj) {
                // var photo = obj.avatar;
                PickupService.getPackage(obj.id)
                    .then(function (response) {
                        // response.data.avatar = photo;
                        $state.go('admin.viewPickupPackage', {obj: response.data});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            function cancelPackage(packageId) {
                PickupService.cancelPackageById(packageId).then(function () {
                    $state.reload();
                });
            }

            function deletePackage(packageId) {
                PickupService.deletePackage(packageId).then(function () {
                    $state.reload();
                });
            }

            $scope.nombreCsv = 'paquetes_' + $filter('date')(new Date(), 'yyyy-MM-dd');

            $scope.headerList = {
                externalCode: 'Externo',
                shippingScheduleOrigin: 'Paquery Point',
                caption: 'Descripción',
                user: 'Usuario',
                creationDate: 'Creación',
                status: 'Estado',
                marketPlaceName: 'Empresa',
                // shippingScheduleSendDate: 'Fecha de entrega',
                deliveryTerm: 'Plazo',
                // rollContainerPosition: 'Rollcontainer/Posición',
                originName: 'Nombre Origen',
                originAddress: 'Dirección Origen',
                // destinyAddress: 'Dirección destino',
                // destinyComment: 'Destino Comentarios',
                // destinyAddressComment: 'Destino Dir Comentarios'
            };

            function getParse(data) {
                var log = [];
                angular.forEach(data, function (value) {
                    var exp = {};
                    exp.externalCode = value.externalCode;
                    exp.shippingScheduleOrigin = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.name : '';
                    exp.caption = value.caption;
                    exp.user = value.user ? value.user.email : '';
                    exp.creationDate = value.creationDate ? $filter('date')(new Date(value.creationDate), 'dd-MM-yyyy HH:mm:ss') : '';
                    exp.status = value.status ? _.findWhere(vm.packagesStatus, {value: value.status}).name : '';
                    exp.marketPlaceName = getNameMarketPlaceByPackage(value);
                    // exp.shippingScheduleSendDate = value.shippingScheduleOrigin ? $filter('date')(new Date(value.shippingScheduleOrigin.scheduledDate), 'dd-MM-yyyy HH:mm:ss') : '';
                    exp.deliveryTerm = value.deliveryTerm ? _.findWhere(DELIVERY_TERM, {value: value.deliveryTerm}).name : '';
                    // exp.rollContainerPosition = value.rollContainerPosition

                    // exp.destinyAddress = value.shippingScheduleDestination.shippingAddress.addressDetail
                    // exp.destinyComment = value.shippingScheduleDestination.comment
                    // exp.destinyAddressComment = value.shippingScheduleDestination.shippingAddress ? value.shippingScheduleDestination.shippingAddress.comment : ""

                    exp.originName = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.name : '';
                    exp.originAddress = value.shippingScheduleOrigin ? value.shippingScheduleOrigin.shippingAddress.addressDetail : '';

                    this.push(exp);
                }, log);
                return log;
            }

            function getNameMarketPlaceByPackage(paqueryPackage) {
                var found = false;
                var i = 0;
                var marketplace = null;
                while (i < vm.marketplaces.length && !found) {
                    if (vm.marketplaces[i].id == paqueryPackage.ownerID
                        && paqueryPackage.ownerType == 40) {
                        marketplace = vm.marketplaces[i];
                        found = true;
                    }
                    i++;
                }
                return marketplace ? marketplace.name : ' ';
            }

            function getMarketplaces() {
                vm.marketplaces = [];
                MarketplaceService.getAll(0, 0, true)
                    .then(function(response) {
                        vm.marketplaces = response.data;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }

            function getJsonData() {
                var status = vm.packages ? vm.packages.status.value : null;
                return vm.getPackages(0, 100000, true, false, undefined, vm.searchWord || null, status || null, null);
            }

            function getUserProfile() {
                ProfileService.getUserProfile()
                    .then(function (response) {
                        vm.getUserFinish = true;
                        vm.paqueryAdmin = response.data.mainPaqueryAdmin;
                        vm.authPageRol = response.data.userRoleActions;
                        vm.auth = vm.authPageRol.length > 0;
                        vm.userName = response.data.name + ' ' + response.data.lastName;
                        vm.profilePicture = response.data.avatarImg;
                        vm.user = response.data;
                    });
            }

            function authentication(viewPermison) {
                try {
                    return (vm.authPageRol.length == 0 || vm.authPageRol.length == 7)
                } catch (e) {
                    return false;
                }
            }

            function refreshPackages() {
                $state.reload();
            }
        }

    }

)();
