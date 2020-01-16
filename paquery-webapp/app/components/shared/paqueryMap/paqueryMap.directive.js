angular
    .module('PaQuery')
    .directive('paqueryMap', paqueryMap);

paqueryMap.$inject = ['$timeout', '$window', 'W3wSerice', '$rootScope', '$state', 'paqueryMapService'];

const paquerImage = 'img/custom-icons/blue/A44-Azul-Paquer.png';
const packageImage = 'img/custom-icons/blue/A43-Azul-Caja.png';

const customIcons = {
    'package': packageImage
}


function paqueryMap($timeout, $window, W3wService, $rootScope, $state, paqueryMapService) {
    return {
        scope: {
            origin: '=',
            originId: '=',
            destiny: '=',
            destinyId: '=',

            singleMarker: '=',
            wizardStep: '=',
            googleResponse: '=?',

            destinyW3w: '=',
            originW3w: '=',

            stopdrag: '@?',
            justShow: '=?',

            mapId: '=',

            errorMessage: '=',
            localLoad: '=',

            multipleAddress: '=',
            waypoints: '=',
            paquerPosition: '=',

            miniMap: '=?',
            customIconMarker: '@'

        },
        restrict: 'E',
        templateUrl: 'components/shared/paqueryMap/paqueryMap.template.html',
        link: function(scope, element, attrs) {

            const avaibleMarkers = ['paquer', 'origin', 'destiny'];

            scope.markers = {
                origin: null,
                destiny: null,
                paquer: null
            };

            $timeout(function(){
                scope.map = paqueryMapService.createMap('paqueryMapContainer', { zoom: 14});
            });

            const getMarkerImage = function() {
                if (!scope.customIconMarker)
                    return null;

                return customIcons[scope.customIconMarker];
            }

            var calculateAndShowRouteByW3W = function(source) {

                let sourceConfig = {
                    location: {
                        lat: scope[source].location.lat,
                        lng: scope[source].location.lng
                    }
                };

                // paqueryMapService.geodecodeLocation(sourceConfig, function(resultLocation) {
                paqueryMapService.removeMarker(scope.map, scope.markers[source]);

                const markerImage = getMarkerImage()
                // scope.markers[source] = paqueryMapService.addMarkerToMap(scope.map, resultLocation, markerImage);
                scope.markers[source] = paqueryMapService.addMarkerToMap(scope.map, sourceConfig, markerImage);
                displayRoute()
                // });

            };

            const watcherW3wFn = function(source){
                return function (newValue, oldValue) {
                    if (newValue == oldValue && newValue == undefined)
                        return;

                    if (W3wService.isAValidWord(newValue)) {
                        W3wService.getLatAndLong(newValue)
                            .then(function (response) {
                                if (response.data.geometry) {

                                    var geometry = {
                                        lat: Number(response.data.geometry.lat),
                                        lng: Number(response.data.geometry.lng)
                                    };

                                    if (!scope[source].location) {
                                        scope[source].location = {};
                                    }
                                    scope[source].location.lat = Number(geometry.lat);
                                    scope[source].location.lng = Number(geometry.lng);

                                    calculateAndShowRouteByW3W(source);

                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                };
            };
            //
            // function setLocationFn(source) {
            //     return function setLocation(result) {
            //         scope[source].location.lat = result.location.lat
            //         scope[source].location.lng = result.location.lng
            //
            //         // updateW3w(source, result.location)
            //         displayRoute()
            //     }
            // }

            function markersActive() {
                let r = { count: 0, list: [] };

                avaibleMarkers.forEach(function(m) {

                    if (scope.markers[m] != null) {
                        r.count++;
                        r.list.push(scope.markers[m]);
                    }

                });

                return r;
            }

            function displayRoute(){

                if (scope.paquerPosition) {
                    paqueryMapService.setMapLocation(scope.map, scope.paquerPosition)
                    // paqueryMapService.calculateAndDisplayRoute(scope.map, scope.paquerPosition, scope.destiny.location)
                    // return;
                }

                if (scope.singleMarker)
                    paqueryMapService.setMapLocation(scope.map, scope.destiny.location)
                else
                    paqueryMapService.calculateAndDisplayRoute(scope.map, scope.origin.location, scope.destiny.location)


                const markersResult = markersActive()

                if (markersResult.count == 1) {
                    paqueryMapService.setMapLocation(scope.map, markersResult.list[0].getPosition());
                }
            }


            $timeout(function () { scope.$watch('destinyW3w', watcherW3wFn('destiny')) });
            $timeout(function () { scope.$watch('originW3w', watcherW3wFn('origin')) });


            $timeout(function() {
               scope.$watch('paquerPosition', function(newPosition) {
                    if ( newPosition ) {
                        paqueryMapService.removeMarker(scope.map, scope.markers.paquer);
                        scope.markers.paquer = paqueryMapService.addMarkerToMap(scope.map, newPosition, paquerImage)
                    }
               })
            });


            // const parseAddressFn = function(source, callback) {
            //
            //     if (scope[source] && scope[source].address)
            //         paqueryMapService.geodecodeLocationW3w(scope[source].address, function (words) {
            //             scope[source + "W3w"] = words;
            //             callback && callback();
            //             $timeout(function() { scope.$root.$apply() })
            //         });
            //
            // };

            // const watcherAddressFn = function(source) {
            //     return function(newValue, oldValue) {
            //         if (newValue == oldValue && newValue == undefined) return;
            //         $timeout(function() { parseAddressFn(source) })
            //     }
            // };




            // scope.$watch('origin.address', watcherAddressFn('origin'));
            // scope.$watch('destiny.address', watcherAddressFn('destiny'));

            // $timeout(function() {
            //
            //    // TODO revisar problema con concurrencia de W3W
            //    if (scope.origin && scope.origin.address) {
            //        parseAddressFn('origin', function() {
            //            parseAddressFn('destiny')
            //        })
            //    }
            //    else if (scope.destiny && scope.destiny.address) {
            //         parseAddressFn('destiny')
            //    }
            //
            // });

        },
        controller: function() {
        }

    }
}