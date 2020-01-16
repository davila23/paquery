angular
    .module('PaQuery')
    .directive('inputAddress', inputAddress);

inputAddress.$inject = ['$timeout', '$window', 'W3wSerice', '$rootScope', '$state', 'paqueryMapService', 'mapUtils'];

function inputAddress($timeout, $window, W3wService, $rootScope, $state, paqueryMapService, mapUtils) {
    return {
        scope: {
            id: '@?',
            name: '@?',
            address: '=',
            location: '=?',
            w3w: '=?',
            idW3wContainer: '@?',
            inputClass: '@?',
            onChange: '&',
            ngBlur: '&',
            disabled: '='
        },
        restrict: 'E',
        templateUrl: 'components/shared/inputAddress/inputAddress.template.html',
        link: function(scope, element, attrs) {

            // scope.countries = [
            //         {label: "Argentina", language: "es", countryCode: "ARG", locationId: "NT_FL1OefShVnpTtm-2FIsPfC"},
            //         {label: "Argentina, Ramos Mejía, Argentina", language: "es", countryCode: "ARG", locationId: "NT_OxZDCpf0ffbpc9ewkIzk4A"},
            //         {label: "Argentina, La Tablada, Argentina", language: "es", countryCode: "ARG", locationId: "NT_xald19qCfXRhHHn.H8pOGA"},
            //         {label: "Argentina, Quilmes Oeste, Argentino Roca", language: "es", countryCode: "ARG", locationId: "NT_w3qOAOPm8u9hienHCGC4HB"},
            //         {label: "Argentina, Catriel, Argentina", language: "es", countryCode: "ARG", locationId: "NT_8xmMNq7KG8yjs0g8fPztNB"},
            // ]


            $timeout(function(){scope.$watch('address',
                function(newAddress) {
                    console.log("Cambio address", newAddress)
                })
            });

            const updateGeometry = function(geometry) {
                if (geometry && geometry.lat && geometry.lng) {
                    if (!scope.location)
                        scope.location = {};
                    scope.location.lat = geometry.lat
                    scope.location.lng = geometry.lng
                }
            };

            const setLocationAddress = function(address) {
                if (!scope.location)
                    scope.location = {};

                scope.location.address = address;
            }

            $timeout(function() {
                scope.$watch('w3w', function(newW3w, oldW3w) {
                    if (newW3w === oldW3w && !newW3w)
                        return;

                    if (!W3wService.isAValidWord(newW3w))
                        return;

                    W3wService.getLatAndLong(newW3w)
                        .then(function(resp) {
                            console.log("response W3W:",resp);

                            updateGeometry(resp.data.geometry);

                            if (!scope.address) {
                                paqueryMapService.getAddressByLocation(resp.data.geometry, function(respGeo) {
                                    // console.log("RespGeo:", respGeo);
                                    if (respGeo && respGeo.location && respGeo.location.Address) {
                                        scope.address = mapUtils.getLabelAddress(respGeo.location.Address)
                                        scope.$broadcast('angucomplete-alt:changeInput', scope.id, scope.address)
                                        scope.$apply()
                                    }
                                })
                            }
                        })
                        .catch(function(err) {
                            console.error(err)
                        })
                })
            });

            const updateW3wFromAddress = function(address) {
                if (address && address !== "") {
                    W3wService.getByAddress(address)
                        .then(function (response) {
                            scope.w3w = response.data.words;
                            if (scope.idW3wContainer && scope.idW3wContainer != "") {
                                angular.element("#"+ scope.idW3wContainer).addClass('fg-toggled')
                            }

                            updateGeometry(response.data.geometry)

                        })
                        .catch(function(err){console.error(err)});
                }
            };

            scope.$watch('selectedAddress', function(selectedAddress){
                console.log("Se eligio address:", selectedAddress)


                if (selectedAddress === undefined)
                    return;

                if (selectedAddress) {
                    scope.address = mapUtils.getLabelAddress(selectedAddress.originalObject.address);
                    setLocationAddress(selectedAddress.originalObject.address);
                    updateW3wFromAddress(scope.address);
                    $timeout(function(){ scope.$root.$apply() });

                    // paqueryMapService.geocodeLocation({locationId: selectedAddress.originalObject.locationId}, function(location) {
                    //     console.log("Se recupero: ", location )
                    // })

                }
                else {
                    scope.address = undefined;
                    setLocationAddress(undefined);

                }

                $timeout(function() { scope.onChange && scope.onChange() })
            });


            scope.searchApiHandler = function (address, timeout) {
                let promise = paqueryMapService.searchAddress(address, {timeout:timeout})
                // let promise = paqueryMapService.geocodeLocation(address);
                return promise
            }


            $timeout(function() { updateW3wFromAddress(scope.address)});

        },
        controller: function() {

        }
    }
}