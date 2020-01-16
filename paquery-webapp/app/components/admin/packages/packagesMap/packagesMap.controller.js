(function() {
    angular.module('PaQuery')
        .controller('PackagesMapController', PackagesMapController);

    PackagesMapController.$inject = ['$scope', '$state', '$window', 'PackagesService', 'GeoLocationService'];

    function PackagesMapController($scope, $state, $window, PackagesService, GeoLocationService) {
        var vm = this;
        var destiny = [];

        const noFindValue = {
            label: 'No se han encontrado resultados',
            value: ''
        };

        angular.extend(vm, {
            destiny: destiny,
            goBack: goBack,
            city: { label: '', value: '' },
            dropCity: dropCity,
            cities: [],
            searchCities: searchCities,
            changeClass: changeClass
        });

        init();

        function searchCities(){
            this.searchUser = new SearchCities();
            return this.searchUser;
        };

        function SearchCities() {
            this.options = {
                html: true,
                minLength: 1,
                outHeight: 100,
                maxWidth: 300,
                source: function (request, response) {

                    if (!request.term) return;

                    GeoLocationService.geoAutocomplete(request.term).then(function (result) {
                        // console.log(result);

                        var predictions = [];
                        angular.forEach(result.data.predictions, function (value) {

                            var find = _.find(vm.cities, function (c) {
                                return c.name == value.description;
                            });

                            if (!find) {
                                var exp = {};
                                exp.label = value.description;
                                exp.value = value.description;
                                exp.city = {
                                    name: value.description,
                                    externalPlaceID: value.place_id,
                                    externalRefernceID: value.reference
                                };
                                this.push(exp);
                            }

                        }, predictions);

                        if (!predictions.length) {
                            predictions.push(noFindValue);
                        }

                        response(predictions);

                    }).catch(function () {
                        vm.errorMessage = 'Se ha producido un error inesperado. Consulte con el administrador del sistema.';
                    });
                }
            };
            this.events = {
                change: function (event, ui) {
                    vm.search = '';
                },
                select: function (event, ui) {

                    if (vm.cities.length == 1 && ui.item.city && vm.cities[0].name == ui.item.city.name)
                        return;

                    vm.cities = [];
                    vm.search = '';
                    if (ui.item.label === noFindValue.label)
                        return;

                    vm.cities.push(ui.item.city);

                    getPackagesDestiny();
                }
            };
        }

        function changeClass(options){
            var widget = options.methods.widget();
            // remove default class, use bootstrap style
            widget.removeClass('ui-menu ui-corner-all ui-widget-content').addClass('dropdown-menu');
        };

        function dropCity(c) {
            vm.cities = [];
        }

        function goBack() {
            return $window.history.back();
        }

        function getPackagesDestiny()
        {
            var city = "";
            if (vm.cities.length != 0)
            {
                city = vm.cities[0].name;
            }
            PackagesService.getToMap(city)
                .then(function (response) {
                    var packages = response.data;
                    vm.destiny = [];

                    for (var i = 0; i < packages.length; i++) {
                        var pack = packages[i];
                        var addressInformation = {
                            data: packages[i],
                            onClick: function (p) {
                                $state.go('admin.viewPackage', { obj: p });
                            },
                            stringValue: packages[i].shippingScheduleDestination.shippingAddress.addressDetail,
                            location: {
                                lat: packages[i].shippingScheduleDestination.shippingAddress.lat,
                                lng: packages[i].shippingScheduleDestination.shippingAddress.lng
                            },
                            address: packages[i].shippingScheduleDestination.shippingAddress.addressDetail,
                            w3w: packages[i].shippingScheduleDestination.shippingAddress.geoKey,
                            label: "#" + packages[i].externalCode + " | " + moment(packages[i].shippingScheduleDestination.scheduledDate).format('DD/MM/YYYY hh:mm')
                        }

                        vm.destiny.push(addressInformation)
                    }
                    
                    angular.element('#destiny-address').click()

              })
        }

        function init() {
            getPackagesDestiny();
        }
        

    }
})();
