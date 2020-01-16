angular
    .module('PaQuery')
    .directive('paqueryPolygonMap', paqueryPolygonMap);

paqueryPolygonMap.$inject = ['$timeout', '$window', 'W3wSerice', '$rootScope', '$state', 'paqueryPolygonMapService'];

function paqueryPolygonMap($timeout, $window, W3wService, $rootScope, $state, paqueryPolygonMapService) {
    return {
        scope: {
            origin: '=',
            originId: '=',
            destiny: '=',
            destinyId: '=',
            geometry: '=',

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
        templateUrl: 'components/shared/paqueryPolygonMap/paqueryMap.template.html',
        link: function(scope, element, attrs) {

            const avaibleMarkers = ['paquer', 'origin', 'destiny'];

            scope.markers = {
                origin: null,
                destiny: null,
                paquer: null
            };

            $timeout(function(){
                scope.map = paqueryPolygonMapService.createMap('paqueryMapContainer', { zoom: 14});
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

                // paqueryPolygonMapService.geodecodeLocation(sourceConfig, function(resultLocation) {
                paqueryPolygonMapService.removeMarker(scope.map, scope.markers[source]);

                const markerImage = getMarkerImage()
                // scope.markers[source] = paqueryPolygonMapService.addMarkerToMap(scope.map, resultLocation, markerImage);
                scope.markers[source] = paqueryPolygonMapService.addMarkerToMap(scope.map, sourceConfig, markerImage);
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
                    paqueryPolygonMapService.setMapLocation(scope.map, scope.paquerPosition)
                    // paqueryPolygonMapService.calculateAndDisplayRoute(scope.map, scope.paquerPosition, scope.destiny.location)
                    // return;
                }

                if (scope.singleMarker)
                    paqueryPolygonMapService.setMapLocation(scope.map, scope.destiny.location)
                else
                    paqueryPolygonMapService.calculateAndDisplayRoute(scope.map, scope.origin.location, scope.destiny.location)


                const markersResult = markersActive()

                if (markersResult.count == 1) {
                    paqueryPolygonMapService.setMapLocation(scope.map, markersResult.list[0].getPosition());
                }
            }


            $timeout(function () { scope.$watch('destinyW3w', watcherW3wFn('destiny')) });
            $timeout(function () { scope.$watch('originW3w', watcherW3wFn('origin')) });


            $timeout(function() {
               scope.$watch('paquerPosition', function(newPosition) {
                    if ( newPosition ) {
                        paqueryPolygonMapService.removeMarker(scope.map, scope.markers.paquer);
                        scope.markers.paquer = paqueryPolygonMapService.addMarkerToMap(scope.map, newPosition, paquerImage)
                    }
               })
            });


            // const parseAddressFn = function(source, callback) {
            //
            //     if (scope[source] && scope[source].address)
            //         paqueryPolygonMapService.geodecodeLocationW3w(scope[source].address, function (words) {
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
