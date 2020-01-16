angular
    .module('PaQuery')
    .directive('googleMap', googleMap);

googleMap.$inject = ['$timeout', '$window', 'W3wSerice', '$rootScope', '$window', 'SessionService', '$state'];

function googleMap($timeout, $window, W3wSerice, $rootScope, $window, SessionService, $state) {
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
            stopdrag: '@',
            justShow: '=',
            mapId: '=',
            errorMessage: '=',
            localLoad: '=',
            multipleAddress: '=',
            waypoints: '=',
            paquerPosition: '='
        },
        restrict: 'E',
        templateUrl: 'components/shared/googleMapDirective/googleMap.html',
        link: function (scope, element, attrs) {
            scope.googleResponse = scope.googleResponse ? scope.googleResponse : [];
            var isW3wOriginFocused = false,
                isW3wDestinyFocused = false,
                breakUpdateW3W = true;
            scope.userType = SessionService.getUserType();

            function setData(data) {
                return {
                    'location': {
                        lat: data.geometry.location.lat(),
                        lng: data.geometry.location.lng()
                    },
                    address: data.formatted_address
                }
            }

            function setDragEvent(marker, bol) {
                if (scope.stopdrag) {
                    return false;
                }
                if (scope.dragHandler1) {
                    google.maps.event.removeListener(scope.dragHandler1);
                    scope.dragHandler1 = "";
                }
                if (scope.dragHandler2) {
                    google.maps.event.removeListener(scope.dragHandler2);
                    scope.dragHandler2 = "";
                }
                marker.set("iam", bol);
                scope[(bol ? "dragHandler1" : "dragHandler2")] = google.maps.event.addListener(marker, "dragend", function () {
                    scope.geocoder.geocode({
                        latLng: marker.getPosition()
                    }, function (result) {
                        var bol = marker.get("iam");
                        marker.setPosition(result[0].geometry.location);
                        scope.map.setCenter(result[0].geometry.location);
                        scope[(bol ? "marker1" : "marker2")] = marker;
                        (bol ? scope.origin = (setData(result[0])) : scope.destiny = (setData(result[0])));
                        scope.googleResponse[bol ? 0 : 1] = result;
                        updateW3w((bol ? "origin" : "destiny"), { lat: marker.getPosition().lat(), lng: marker.getPosition().lng(), });
                        scope.$apply();
                    });
                })
            }

            function calculateAndDisplayRoute() {
                var originInput = document.getElementById(scope.originId);
                var destinyInput = document.getElementById(scope.destinyId);
                var originValue = originInput.value;
                var destinyValue = destinyInput.value;
                if (angular.isDefined(originValue) && angular.isString(originValue) && angular.isDefined(destinyValue) && angular.isString(destinyValue)) {
                    // path case
                    if (originValue && destinyValue) {
                        //If I have both points I should remove markerts
                        //and draw the path

                        if (scope.marker1) {
                            scope.marker1.setMap(null);
                        }
                        if (scope.marker2) {
                            scope.marker2.setMap(null);
                        }
                        var oneDone = false;

                        scope.geocoder.geocode({ 'address': originValue }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK && results.length) {
                                if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                    $timeout(function () {
                                        scope.errorMessage = 'La dirección de origen ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                    });
                                    originInput.value = '';
                                    scope.origin.address = '';
                                    scope.origin.w3w = '';
                                    setCoordinates('origin', undefined, undefined);
                                    calculateAndDisplayRoute();
                                } else {
                                    scope.errorMessage = '';
                                    var address_components = results[0].address_components,
                                        newOriginValue = results[0].formatted_address;
                                    scope.googleResponse[0] = results;
                                    for (var i = 0; i < address_components.length; i++) {
                                        for (var j = 0; j < address_components[i].types.length; j++) {
                                            if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                newOriginValue = newOriginValue.replace(address_components[i].long_name, "");
                                            }
                                        }
                                    }

                                    var done = false;
                                    for (var i = 0; i < address_components.length && !done; i++) {
                                        var types = address_components[i].types;
                                        if (types) {
                                            for (var j = 0; j < types.length && !done; j++) {
                                                if (types[j] === 'locality' || types[j] === 'administrative_area_level_1') {
                                                    scope.origin.currentCity = address_components[i].long_name;
                                                    done = true;
                                                }
                                            }
                                        }
                                    }
                                    if (!done) {
                                        scope.origin.currentCity = '';
                                    }

                                    if (!areTheSameCities()) {
                                        scope.errorMessage = 'El origen y el destino deben pertenecer a la misma ciudad.';
                                    } else {
                                        scope.errorMessage = '';
                                    }

                                    newOriginValue = newOriginValue.replace('  ', ' ');
                                    originInput.value = newOriginValue;
                                    scope.origin.address = newOriginValue;
                                    setCoordinates('origin', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                    if (oneDone) {
                                        scope.directionsDisplay.setMap(scope.map);
                                        scope.directionsService.route({

                                            origin: originValue,
                                            destination: destinyValue,
                                            travelMode: google.maps.TravelMode.DRIVING
                                        }, function (response, status) {
                                            if (status === google.maps.DirectionsStatus.OK) {
                                                scope.directionsDisplay.setDirections(response);
                                            } else {
                                                console.log('Directions request failed due to ' + status);
                                            }
                                        });
                                    } else {
                                        oneDone = true;
                                    }
                                }
                            }
                        });
                        scope.geocoder.geocode({ 'address': destinyValue }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK && results.length) {
                                if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                    $timeout(function () {
                                        scope.errorMessage = 'La dirección de destino ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                    });
                                    destinyInput.value = '';
                                    scope.destiny.address = '';
                                    setCoordinates('destiny', undefined, undefined);
                                    scope.destiny.w3w = '';
                                    calculateAndDisplayRoute();
                                } else {
                                    scope.errorMessage = '';
                                    var address_components = results[0].address_components,
                                        newDestinyValue = results[0].formatted_address;
                                    scope.googleResponse[1] = results;

                                    for (var i = 0; i < address_components.length; i++) {
                                        for (var j = 0; j < address_components[i].types.length; j++) {
                                            if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                newDestinyValue = newDestinyValue.replace(address_components[i].long_name, "");
                                            }
                                        }
                                    }

                                    var done = false;
                                    for (var i = 0; i < address_components.length && !done; i++) {
                                        var types = address_components[i].types;
                                        if (types) {
                                            for (var j = 0; j < types.length && !done; j++) {
                                                if (types[j] === 'locality' || types[j] === 'administrative_area_level_1') {
                                                    scope.destiny.currentCity = address_components[i].long_name;
                                                    done = true;
                                                }
                                            }
                                        }
                                    }

                                    if (!areTheSameCities()) {
                                        scope.errorMessage = 'El origen y el destino deben pertenecer a la misma ciudad.';
                                    } else {
                                        scope.errorMessage = '';
                                    }

                                    newDestinyValue = newDestinyValue.replace('  ', ' ');
                                    destinyInput.value = newDestinyValue;
                                    scope.destiny.address = newDestinyValue;
                                    setCoordinates('destiny', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                    if (oneDone) {
                                        scope.directionsDisplay.setMap(scope.map);
                                        scope.directionsService.route({
                                            origin: originValue,
                                            destination: destinyValue,
                                            travelMode: google.maps.TravelMode.DRIVING
                                        }, function (response, status) {
                                            if (status === google.maps.DirectionsStatus.OK) {
                                                scope.directionsDisplay.setDirections(response);
                                            } else {
                                                console.log('Directions request failed due to ' + status);
                                            }
                                        });
                                    } else {
                                        oneDone = true;
                                    }
                                }
                            }
                        });
                    } else {
                        scope.directionsDisplay.setMap(null);

                        //empty map case, no markers, no path
                        if (!originValue && !destinyValue) {
                            scope.errorMessage = '';
                            if (scope.destinyW3w && !destinyValue || scope.originW3w && !originValue) {
                                return false;
                            }
                            if (scope.marker1) {
                                scope.marker1.setMap(null);
                            }
                            if (scope.marker2) {
                                scope.marker2.setMap(null);
                            }
                            scope.origin.w3w = '';
                            scope.destiny.w3w = '';
                            setCoordinates('origin', undefined, undefined);
                            setCoordinates('destiny', undefined, undefined);
                            if (scope.map) {
                                //center the map on Argentina if there is no points selected
                                scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                                scope.map.setZoom(4);
                            }
                        } else {
                            //If I it is already marked I should
                            //delete the oldest and draw the new one
                            if (scope.marker1 && !scope.origin.w3w) {
                                scope.marker1.setMap(null);
                            }
                            //If there is just 1 point I should draw its
                            //marker
                            //just origin case
                            if (originValue) {
                                scope.geocoder.geocode({ 'address': originValue }, function (results, status) {
                                    if (status === google.maps.GeocoderStatus.OK && results.length) {
                                        if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                            $timeout(function () {
                                                scope.errorMessage = 'La dirección de origen ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                            });
                                            originInput.value = '';
                                            scope.origin.address = '';
                                            setCoordinates('origin', undefined, undefined);
                                            scope.origin.w3w = '';
                                            calculateAndDisplayRoute();
                                        } else {
                                            if (scope.destiny.w3w || scope.origin) {

                                            }
                                            scope.errorMessage = '';
                                            if (!scope.map) {
                                                scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                                    zoom: 15,
                                                    position: results[0].geometry.location
                                                });
                                            }

                                            var address_components = results[0].address_components,
                                                newOriginValue = results[0].formatted_address;
                                            scope.googleResponse[0] = results;

                                            for (var i = 0; i < address_components.length; i++) {
                                                for (var j = 0; j < address_components[i].types.length; j++) {
                                                    if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                        newOriginValue = newOriginValue.replace(address_components[i].long_name, "");
                                                    }
                                                }
                                            }

                                            newOriginValue = newOriginValue.replace('  ', ' ');
                                            if (newOriginValue === scope.origin.address) {
                                                return false;
                                            } else {
                                                originInput.value = newOriginValue;
                                                scope.origin.address = newOriginValue;
                                                setCoordinates('origin', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                                scope.map.setCenter(results[0].geometry.location);
                                                scope.marker1 = new google.maps.Marker({
                                                    draggable: (scope.stopdrag ? false : true),
                                                    map: scope.map,
                                                    position: results[0].geometry.location
                                                });
                                                setDragEvent(scope.marker1, true);
                                                scope.map.setZoom(15);
                                            }

                                        }
                                    } else {
                                        if (!scope.map) {
                                            scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                                zoom: 4,
                                                center: {
                                                    lat: -38,
                                                    lng: -57.605
                                                }
                                            });
                                        } else {
                                            //scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                                            //scope.map.setZoom(3);
                                        }
                                        scope.origin.w3w = '';
                                        setCoordinates('origin', undefined, undefined);
                                        originInput.value = '';
                                    }
                                });
                            } else {
                                scope.origin.w3w = '';
                                setCoordinates('origin', undefined, undefined);
                            }

                            //If I have it already marked I should
                            //delete the oldest and draw the new one
                            if (scope.marker2 && !scope.destinyW3w) {
                                scope.marker2.setMap(null);
                            }
                            //If I have just 1 point I should draw its
                            //marker
                            //just destiny case
                            if (destinyValue) {
                                scope.geocoder.geocode({ 'address': destinyValue }, function (results, status) {
                                    if (status === google.maps.GeocoderStatus.OK && results.length) {
                                        if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                            $timeout(function () {
                                                scope.errorMessage = 'La dirección de destino ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                            });
                                            destinyInput.value = '';
                                            scope.destiny.address = '';
                                            setCoordinates('destiny', undefined, undefined);
                                            scope.destiny.w3w = '';
                                            calculateAndDisplayRoute();
                                        } else {
                                            scope.errorMessage = '';
                                            if (!scope.map) {
                                                scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                                    zoom: 15,
                                                    position: results[0].geometry.location
                                                });
                                            }

                                            var address_components = results[0].address_components,
                                                newDestinyValue = results[0].formatted_address;
                                            scope.googleResponse[1] = results;

                                            for (var i = 0; i < address_components.length; i++) {
                                                for (var j = 0; j < address_components[i].types.length; j++) {
                                                    if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                        newDestinyValue = newDestinyValue.replace(address_components[i].long_name, "");
                                                    }
                                                }
                                            }

                                            newDestinyValue = newDestinyValue.replace('  ', ' ');
                                            destinyInput.value = newDestinyValue;
                                            scope.destiny.address = newDestinyValue;
                                            setCoordinates('destiny', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                            scope.map.setCenter(results[0].geometry.location);
                                            scope.marker2 = new google.maps.Marker({
                                                draggable: (scope.stopdrag ? false : true),
                                                map: scope.map,
                                                position: results[0].geometry.location
                                            });
                                            setDragEvent(scope.marker2);
                                            scope.map.setZoom(15);
                                        }
                                    } else {
                                        if (!scope.map) {
                                            scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                                zoom: 4,
                                                center: {
                                                    lat: -38,
                                                    lng: -57.605
                                                }
                                            });
                                        } else {
                                            //scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                                            //scope.map.setZoom(3);
                                        }

                                        scope.destiny.w3w = '';
                                        setCoordinates('destiny', undefined, undefined);
                                        destinyInput.value = '';
                                    }
                                });
                            } else {
                                if (scope.destiny.w3w) {
                                    return false;
                                } else {
                                    scope.destiny.w3w = '';
                                    setCoordinates('destiny', undefined, undefined);
                                }

                            }
                        }
                    }
                }
            }

            function areTheSameCities() {
                return scope.origin.currentCity && scope.destiny.currentCity && scope.origin.currentCity === scope.destiny.currentCity;
            }

            function calculateAndDisplayRouteByW3w(place) {
                var originInput = document.getElementById(scope.originId) ? document.getElementById(scope.originId) : '';
                var destinyInput = document.getElementById(scope.destinyId) ? document.getElementById(scope.destinyId) : '';
                var originValue = place === 'origin' ? '' : originInput.value ? originInput.value : '';
                var destinyValue = place === 'destiny' ? '' : destinyInput.value ? destinyInput.value : '';
                if (angular.isDefined(originValue) && angular.isString(originValue) && angular.isDefined(destinyValue) && angular.isString(destinyValue)) {
                    // path case
                    if ((originValue || place === 'origin') && (destinyValue || place === 'destiny') || ((scope.destiny.location.lat && scope.destiny.location.lng) && (scope.origin.location.lat && scope.origin.location.lng) && (scope.origin.w3w && scope.destiny.w3w))) {
                        //If I have both points I should remove markerts
                        //and draw the path
                        if (scope.marker1) {
                            scope.marker1.setMap(null);
                        }
                        if (scope.marker2) {
                            scope.marker2.setMap(null);
                        }
                        var oneDone = false;

                        var originConfig;
                        if (place === 'origin' || (!scope.origin.address && scope.origin.w3w && scope.origin.location.lat && scope.origin.location.lng)) {
                            originConfig = {
                                'location': {
                                    lat: scope.origin.location.lat,
                                    lng: scope.origin.location.lng
                                }
                            };
                        } else {
                            originConfig = {
                                'address': originValue
                            };
                        }
                        scope.geocoder.geocode(originConfig, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK && results.length) {
                                if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                    $timeout(function () {
                                        scope.errorMessage = 'La dirección de origen ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                    });
                                    originInput.value = '';
                                    scope.origin.address = '';
                                    setCoordinates('origin', undefined, undefined);
                                    scope.origin.w3w = '';
                                    calculateAndDisplayRouteByW3w(place);
                                } else {
                                    scope.errorMessage = '';
                                    var address_components = results[0].address_components,
                                        newOriginValue = results[0].formatted_address;
                                    scope.googleResponse[0] = results;

                                    for (var i = 0; i < address_components.length; i++) {
                                        for (var j = 0; j < address_components[i].types.length; j++) {
                                            if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                newOriginValue = newOriginValue.replace(address_components[i].long_name, "");
                                            }
                                        }
                                    }
                                    if (!scope.origin.location.lat && !scope.origin.location.lng) {
                                        newOriginValue = newOriginValue.replace('  ', ' ');
                                        originInput.value = newOriginValue;
                                        scope.origin.address = newOriginValue;
                                        angular.element('#' + place + '-side-container').addClass('fg-toggled');
                                        setCoordinates('origin', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                    }

                                    if (scope.paquerPosition && scope.paquerPosition.lat) {
                                        var geo = new google.maps.LatLng(scope.paquerPosition.lat, scope.paquerPosition.lng);
                                        scope.marker3 = new google.maps.Marker({
                                            draggable: false,
                                            map: scope.map,
                                            position: geo,
                                            label: 'Paquer'
                                        });
                                        setDragEvent(scope.marker3, true);
                                    }

                                    if (oneDone) {
                                        var waypts = [];
                                        if (scope.waypoints && scope.waypoints.points) {

                                            try {
                                                scope.alreadyInitialized = false;
                                                scope.mapRefreshed = false;
                                                initializeMap()
                                            } catch (e) { }

                                            for (var i = 0; i < scope.waypoints.points.length; i++) {
                                                //waypts.push({
                                                //    location: new google.maps.LatLng(scope.waypoints.points[i].lat, scope.waypoints.points[i].lng),
                                                //});
                                                waypts.push({
                                                    lat: scope.waypoints.points[i].lat,
                                                    lng: scope.waypoints.points[i].lng
                                                });
                                            }

                                            

                                            scope.directionsDisplay.setMap(scope.map);
                                            var myPolyline = new google.maps.Polyline({
                                                path: waypts,
                                               
                                                strokeColor: '#FF0000',
                                                strokeOpacity: 1.0,
                                                strokeWeight: 4,
                                                map: scope.map
                                            });
                                            scope.map.setZoom(14);
                                            scope.map.setCenter(new google.maps.LatLng(waypts[0].lat, waypts[0].lng));
                                            scope.mapRefreshed = true;
                                        }
                                        else
                                        {
                                            scope.directionsDisplay.setMap(scope.map);
                                            scope.directionsService.route({
                                                origin: place === 'origin' ? { lat: originConfig.location.lat, lng: originConfig.location.lng } : originValue,
                                                destination: place === 'destiny' ? { lat: destinyConfig.location.lat, lng: destinyConfig.location.lng } : destinyValue,
                                                travelMode: google.maps.TravelMode.DRIVING,
                                                waypoints: waypts
                                            }, function (response, status) {
                                                if (status === google.maps.DirectionsStatus.OK) {
                                                    scope.directionsDisplay.setDirections(response);
                                                } else {
                                                    console.log('Directions request failed due to ' + status);
                                                }
                                            });
                                        }
                                    } else {
                                        oneDone = true;
                                    }
                                }
                            }
                        });

                        var destinyConfig;
                        if (place === 'destiny' || (!scope.destiny.address && scope.destiny.w3w && scope.destiny.location.lat && scope.destiny.location.lng)) {
                            destinyConfig = {
                                'location': {
                                    lat: scope.destiny.location.lat,
                                    lng: scope.destiny.location.lng
                                }
                            };
                        } else {
                            destinyConfig = {
                                address: destinyValue
                            };
                        }
                        scope.geocoder.geocode(destinyConfig, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK && results.length) {
                                if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                    $timeout(function () {
                                        scope.errorMessage = 'La dirección de destino ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                    });
                                    destinyInput.value = '';
                                    scope.destiny.address = '';
                                    setCoordinates('destiny', undefined, undefined);
                                    scope.destiny.w3w = '';
                                    calculateAndDisplayRouteByW3w(place);
                                } else {
                                    scope.errorMessage = '';
                                    var address_components = results[0].address_components,
                                        newDestinyValue = results[0].formatted_address;
                                    scope.googleResponse[1] = results;

                                    for (var i = 0; i < address_components.length; i++) {
                                        for (var j = 0; j < address_components[i].types.length; j++) {
                                            if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                newDestinyValue = newDestinyValue.replace(address_components[i].long_name, "");
                                            }
                                        }
                                    }
                                    if (!scope.destiny.location.lat && !scope.destiny.location.lng) {
                                        newDestinyValue = newDestinyValue.replace('  ', ' ');
                                        destinyInput.value = newDestinyValue;
                                        scope.destiny.address = newDestinyValue;
                                        angular.element('#' + place + '-side-container').addClass('fg-toggled');
                                        setCoordinates('destiny', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                    }
                                    if (oneDone) {
                                        scope.directionsDisplay.setMap(scope.map);
                                        scope.directionsService.route({
                                            origin: place === 'origin' ? { lat: originConfig.location.lat, lng: originConfig.location.lng } : originValue,
                                            destination: place === 'destiny' ? { lat: destinyConfig.location.lat, lng: destinyConfig.location.lng } : destinyValue,
                                            travelMode: google.maps.TravelMode.DRIVING
                                        }, function (response, status) {
                                            if (status === google.maps.DirectionsStatus.OK) {
                                                scope.directionsDisplay.setDirections(response);
                                            } else {
                                                console.log('Directions request failed due to ' + status);
                                            }
                                        });
                                    } else {
                                        oneDone = true;
                                    }
                                }
                            }
                        });
                    } else {
                        scope.directionsDisplay.setMap(null);

                        //If I it is already marked I should
                        //delete the oldest and draw the new one
                        if (scope.marker1) {
                            scope.marker1.setMap(null);
                        }
                        //If there is just 1 point I should draw its
                        //marker
                        //just origin case

                        if (originValue || place === 'origin') {
                            var originConfig;
                            if (place === 'origin') {
                                originConfig = {
                                    'location': {
                                        lat: scope.origin.location.lat,
                                        lng: scope.origin.location.lng
                                    }
                                };
                            } else {
                                originConfig = {
                                    address: originValue
                                };
                            }

                            scope.geocoder.geocode(originConfig, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK && results.length) {
                                    if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                        $timeout(function () {
                                            scope.errorMessage = 'La dirección de origen ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                        });
                                        originInput.value = '';
                                        scope.origin.address = '';
                                        setCoordinates('origin', undefined, undefined);
                                        scope.origin.w3w = '';
                                        calculateAndDisplayRouteByW3w(place);
                                    } else {
                                        scope.errorMessage = '';
                                        if (!scope.map) {
                                            scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                                zoom: 15,
                                                position: results[0].geometry.location
                                            });
                                        }

                                        var address_components = results[0].address_components,
                                            newOriginValue = results[0].formatted_address;
                                        scope.googleResponse[0] = results;

                                        for (var i = 0; i < address_components.length; i++) {
                                            for (var j = 0; j < address_components[i].types.length; j++) {
                                                if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                    newOriginValue = newOriginValue.replace(address_components[i].long_name, "");
                                                }
                                            }
                                        }
                                        if (!scope.origin.address) {
                                            newOriginValue = newOriginValue.replace('  ', ' ');
                                            originInput.value = newOriginValue;
                                            scope.origin.address = newOriginValue;
                                            angular.element('#' + place + '-side-container').addClass('fg-toggled');
                                        }
                                        setCoordinates('origin', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                        scope.map.setCenter(results[0].geometry.location);
                                        scope.marker1 = new google.maps.Marker({
                                            draggable: (scope.stopdrag ? false : true),
                                            map: scope.map,
                                            position: results[0].geometry.location
                                        });
                                        setDragEvent(scope.marker1, true);
                                        scope.map.setZoom(15);
                                    }
                                } else {
                                    if (!scope.map) {
                                        scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                            zoom: 4,
                                            center: {
                                                lat: -38,
                                                lng: -57.605
                                            }
                                        });
                                    } else {
                                        //scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                                        //scope.map.setZoom(3);
                                    }
                                    setCoordinates('origin', undefined, undefined);
                                    originInput.value = '';
                                }
                            });
                        } else {
                            if (!scope.origin.w3w) {
                                setCoordinates('origin', undefined, undefined);
                            }
                        }

                        //If I have it already marked I should
                        //delete the oldest and draw the new one
                        if (scope.marker2) {
                            scope.marker2.setMap(null);
                        }
                        //If I have just 1 point I should draw its
                        //marker
                        //just destiny case
                        if (destinyValue || place === 'destiny') {
                            var destinyConfig;
                            if (place === 'destiny') {
                                destinyConfig = {
                                    'location': {
                                        lat: scope.destiny.location.lat,
                                        lng: scope.destiny.location.lng
                                    }
                                };
                            } else {
                                destinyConfig = {
                                    address: destinyValue
                                };
                            }
                            scope.geocoder.geocode(destinyConfig, function (results, status) {
                                if (status === google.maps.GeocoderStatus.OK && results.length) {
                                    if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                        $timeout(function () {
                                            scope.errorMessage = 'La dirección de destino ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                        });
                                        destinyInput.value = '';
                                        scope.destiny.address = '';
                                        setCoordinates('destiny', undefined, undefined);
                                        scope.destiny.w3w = '';
                                        calculateAndDisplayRouteByW3w(place);
                                    } else {
                                        scope.errorMessage = '';
                                        if (!scope.map) {
                                            scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                                zoom: 15,
                                                position: results[0].geometry.location
                                            });
                                        }

                                        var address_components = results[0].address_components,
                                            newDestinyValue = results[0].formatted_address;
                                        scope.googleResponse[1] = results;

                                        for (var i = 0; i < address_components.length; i++) {
                                            for (var j = 0; j < address_components[i].types.length; j++) {
                                                if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                    newDestinyValue = newDestinyValue.replace(address_components[i].long_name, "");
                                                }
                                            }
                                        }

                                        newDestinyValue = newDestinyValue.replace('  ', ' ');
                                        destinyInput.value = newDestinyValue;
                                        scope.destiny.address = newDestinyValue;
                                        angular.element('#' + place + '-side-container').addClass('fg-toggled');
                                        setCoordinates('destiny', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                        scope.map.setCenter(results[0].geometry.location);
                                        scope.marker2 = new google.maps.Marker({
                                            draggable: (scope.stopdrag ? false : true),
                                            map: scope.map,
                                            position: results[0].geometry.location
                                        });
                                        setDragEvent(scope.marker2);
                                        scope.map.setZoom(15);
                                    }
                                } else {
                                    if (!scope.map) {
                                        scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                            zoom: 4,
                                            center: {
                                                lat: -38,
                                                lng: -57.605
                                            }
                                        });
                                    } else {
                                        //scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                                        //scope.map.setZoom(3);
                                    }
                                    setCoordinates('destiny', undefined, undefined);
                                    destinyInput.value = '';
                                }
                            });
                        } else {
                            setCoordinates('destiny', undefined, undefined);
                        }
                    }
                }
            }

            function calculateAndDisplayMarkerByW3w() {
                var destinyInput = document.getElementById(scope.destinyId);

                if (scope.marker2) {
                    scope.marker2.setMap(null);
                }

                var destinyConfig = {
                    'location': {
                        lat: scope.destiny.location.lat,
                        lng: scope.destiny.location.lng
                    }
                };

                scope.geocoder.geocode(destinyConfig, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK && results.length) {
                        if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                            $timeout(function () {
                                scope.errorMessage = 'La dirección de destino ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                            });
                            destinyInput.value = '';
                            scope.destiny.address = '';
                            setCoordinates('destiny', undefined, undefined);
                            scope.destiny.w3w = '';
                            calculateAndDisplayMarkerByW3w();
                        } else {
                            scope.errorMessage = '';
                            if (!scope.map) {
                                scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                    zoom: 15,
                                    position: results[0].geometry.location
                                });
                            }

                            var address_components = results[0].address_components,
                                newDestinyValue = results[0].formatted_address;
                            scope.googleResponse[1] = results;

                            for (var i = 0; i < address_components.length; i++) {
                                for (var j = 0; j < address_components[i].types.length; j++) {
                                    if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                        newDestinyValue = newDestinyValue.replace(address_components[i].long_name, "");
                                    }
                                }
                            }
                            if (!scope.destiny.w3w) {
                                newDestinyValue = newDestinyValue.replace('  ', ' ');
                                destinyInput.value = newDestinyValue;
                                scope.destiny.address = newDestinyValue;
                                angular.element('#destiny-side-container').addClass('fg-toggled');
                            }
                            setCoordinates('destiny', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            scope.map.setCenter(results[0].geometry.location);
                            scope.marker2 = new google.maps.Marker({
                                draggable: (scope.stopdrag ? false : true),
                                map: scope.map,
                                position: results[0].geometry.location
                            });
                            setDragEvent(scope.marker2);
                            scope.map.setZoom(15);


                        }
                    } else {
                        if (!scope.map) {
                            scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                zoom: 3,
                                center: {
                                    lat: -38,
                                    lng: -57.605
                                }
                            });
                        } else {
                            scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                            scope.map.setZoom(3);
                        }
                        setCoordinates('destiny', undefined, undefined);
                        destinyInput.value = '';
                    }
                });
            }

            function calculateAndDisplayMarker(label,packageStatus, onClickMarker, p) {
                var destinyInput = document.getElementById(scope.destinyId);
                var destinyValue = destinyInput.value;

                if (angular.isDefined(destinyValue) && angular.isString(destinyValue)) {
                    if (scope.destinyW3w && !destinyValue) {
                        return false;
                    }
                    if (scope.marker2) {
                        scope.marker2.setMap(null);
                    }

                    if (destinyValue || scope.destinyW3w) {
                        scope.geocoder.geocode({ 'address': destinyValue }, function (results, status) {
                            console.log(status);
                            if (status === google.maps.GeocoderStatus.OK && results.length) {
                                if (results[0].formatted_address.toLowerCase().indexOf('argentina') === -1) {
                                    $timeout(function () {
                                        scope.errorMessage = 'La dirección de destino ingresada no pertenece a Argentina, ingrese una dirección correcta.';
                                    });
                                    destinyInput.value = '';
                                    scope.destiny.address = '';
                                    setCoordinates('destiny', undefined, undefined);
                                    scope.destiny.w3w = '';
                                    calculateAndDisplayMarker();
                                } else {
                                    console.log(results[0].geometry.location);
                                    scope.errorMessage = '';
                                    if (!scope.map) {
                                        scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                            zoom: scope.multipleAddress ? 5 : 15,
                                            position: results[0].geometry.location
                                        });
                                    }

                                    var address_components = results[0].address_components,
                                        newDestinyValue = results[0].formatted_address;
                                    scope.googleResponse[1] = results;

                                    for (var i = 0; i < address_components.length; i++) {
                                        for (var j = 0; j < address_components[i].types.length; j++) {
                                            if (address_components[i].types[j].indexOf('postal_code') > -1) {
                                                newDestinyValue = newDestinyValue.replace(address_components[i].long_name, "");
                                            }
                                        }
                                    }

                                    newDestinyValue = newDestinyValue.replace('  ', ' ');
                                    destinyInput.value = newDestinyValue;
                                    scope.destiny.address = newDestinyValue;
                                    setCoordinates('destiny', results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                    scope.map.setCenter(results[0].geometry.location);
                                    scope.marker2 = new google.maps.Marker({
                                        draggable: (scope.stopdrag ? false : true),
                                        map: scope.map,
                                        position: results[0].geometry.location,
                                        title: label,
                                        icon: packageStatus === 3 ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    });
                                    if (onClickMarker)
                                    {
                                        addListenerClick(onClickMarker,p)
                                    }

                                    setDragEvent(scope.marker2);

                                    if (!scope.multipleAddress)
                                        scope.map.setZoom(15);
                                    else
                                        scope.map.setZoom(12);
                                }
                            } else {
                                if (!scope.map) {
                                    scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                        zoom: 3,
                                        center: {
                                            lat: -38,
                                            lng: -57.605
                                        }
                                    });
                                } else {
                                    scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                                    scope.map.setZoom(3);
                                }

                                setCoordinates('destiny', undefined, undefined);
                                scope.destiny.w3w = '';
                                destinyInput.value = '';
                            }
                        });
                    } else {
                        scope.destiny.w3w = '';
                        setCoordinates('destiny', undefined, undefined);
                        if (scope.map) {
                            scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                            scope.map.setZoom(3);

                        }
                    }
                }
            }

            function setCoordinates(side, lat, lng) {

                $timeout(function () {
                    scope[side].location = {
                        lat: lat,
                        lng: lng
                    };
                    updateW3w(side, scope[side].location);
                });

            }

            function updateW3w(side, newValue) {
                //   if (scope.destiny.address && isAValidWord(scope.destiny.w3w) && !(scope.origin ? scope.origin.w3w : scope.origin) && !(scope.origin ? scope.origin.address : scope.origin)) {
                //     return false;
                //   }

                //   if ( (scope.origin ? scope.origin.address : scope.origin) && isAValidWord(scope.origin.w3w) && !scope.destiny.w3w  && !scope.destiny.address) {
                //     return false;
                //   }

                if (newValue && newValue.lat && newValue.lng) {
                    W3wSerice.getW3w(newValue.lat, newValue.lng)
                        .then(function (response) {
                            scope[side].w3w = response.data.words;
                            angular.element('#' + side + '-w3w-container').addClass('fg-toggled');
                        });
                } else {
                    if (scope[side].addressInformation) {
                        scope[side].w3w = '';
                    }
                    angular.element('#' + side + '-w3w-container').removeClass('fg-toggled');
                }

            }

            angular.element('#w3w-origin-input').bind('blur', function (e) {
                isW3wOriginFocused = false;
            });
            angular.element('#w3w-origin-input').bind('focus', function (e) {
                isW3wOriginFocused = true;
            });
            angular.element('#w3w-destiny-input').bind('blur', function (e) {
                isW3wDestinyFocused = false;
            });
            angular.element('#w3w-destiny-input').bind('focus', function (e) {
                isW3wDestinyFocused = true;
            });
            angular.element('#w3w-address-input').bind('blur', function (e) {
                isW3wDestinyFocused = false;
            });
            angular.element('#w3w-address-input').bind('focus', function (e) {
                isW3wDestinyFocused = true;
            });

            function isAValidWord(word) {
                var repetitions = 0;
                if (word) {
                    for (var i = 0; i < word.length; i++) {
                        if (word[i] === '.') {
                            repetitions++;
                        }
                    }
                }

                return repetitions === 2;
            }

            $timeout(function () {
                scope.$watch('destinyW3w', function (newValue) {
                    if (isAValidWord(newValue)) {
                        W3wSerice.getLatAndLong(newValue)
                            .then(function (response) {
                                var geometry = {
                                    lat: Number(response.data.geometry.lat),
                                    lng: Number(response.data.geometry.lng)
                                };
                                if (response.data.geometry) {
                                    if (!scope.destiny.location) {
                                        scope.destiny.location = {};
                                    }
                                    scope.destiny.location.lat = Number(geometry.lat);
                                    scope.destiny.location.lng = Number(geometry.lng);
                                    if (scope.singleMarker) {
                                        calculateAndDisplayMarkerByW3w();
                                    } else {
                                        calculateAndDisplayRouteByW3w('destiny');
                                    }
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                });

                scope.$watch('originW3w', function (newValue) {
                    if (isAValidWord(newValue)) {
                        W3wSerice.getLatAndLong(newValue)
                            .then(function (response) {
                                var geometry = {
                                    lat: Number(response.data.geometry.lat),
                                    lng: Number(response.data.geometry.lng)
                                };
                                if (response.data.geometry) {
                                    scope.origin.location.lat = Number(geometry.lat);
                                    scope.origin.location.lng = Number(geometry.lng);
                                    calculateAndDisplayRouteByW3w('origin');

                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                });
            });

            angular.element('#destiny-address').bind('click', function (e) {
                addWatchDestinyaddress();
            });

            function addListenerClick(onClickMarker, p) {
                scope.marker2.addListener('click', function () { return onClickMarker(p) });
            }

            function addWatchDestinyaddress() {

                    $timeout(function () {

                        if (!scope.geocoder)
                            return;

                        try {
                            scope.alreadyInitialized = false;
                            scope.mapRefreshed = false;
                            initializeMap()
                        } catch (e) { }


                        if (scope.multipleAddress && scope.destiny.length > 0) {

                            
                            for (var i = 0; i < scope.destiny.length; i++) {
                              
                                var onClick = scope.destiny[i].onClick;
                                if (scope.destiny[i].location.lat) {
                                    scope.marker2 = new google.maps.Marker({
                                        draggable: (scope.stopdrag ? false : true),
                                        map: scope.map,
                                        position: scope.destiny[i].location,
                                        title: scope.destiny[i].label,
                                        icon: scope.destiny[i].data.status === 3 ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    });
                                    setDragEvent(scope.marker2);

                                    addListenerClick(onClick, scope.destiny[i].data)
                                    scope.map.setCenter(scope.destiny[i].location);
                                }
                                else {
                                    document.getElementById(scope.destinyId).value = scope.destiny[i].stringValue;
                                    calculateAndDisplayMarker(scope.destiny[i].label, scope.destiny[i].data.status, function (p) { return onClick(p); }, scope.destiny[i].data);
                                }


                            }
                            if (scope.map) {
                                scope.map.setZoom(10);
                            }

                            scope.mapRefreshed = true;
                        }

                    });
            }

            function initializeMap() {
                if (!scope.justShow || scope.justShow && !scope.alreadyInitialized) {
                    scope.alreadyInitialized = true;
                    $timeout(function () {
                        if (!scope.mapRefreshed) {
                            scope.map = new google.maps.Map(element[0].querySelector(scope.mapId ? '#map' + scope.mapId : '#map'), {
                                zoom: scope.singleMarker ? 3 : 4,
                                center: {
                                    lat: -38,
                                    lng: -57.605
                                }
                            });
                        }
                        scope.mapRefreshed = true;
                    });
                }
            }

            $window.resetMap = function () {
                if (scope.marker1) {
                    scope.marker1.setMap(null);
                }
                if (scope.marker2) {
                    scope.marker2.setMap(null);
                }
                scope.directionsDisplay.setMap(null);
                if (scope.origin) {
                    scope.origin.w3w = '';
                    setCoordinates('origin', undefined, undefined);
                }
                if (scope.destiny) {
                    scope.destiny.w3w = '';
                    setCoordinates('destiny', undefined, undefined);
                }

                //center the map on Argentina if there is no points selected
                scope.map.setCenter(new google.maps.LatLng(-38, -57.605));
                scope.map.setZoom(4);
            }

            $window.initMap = function () {
                $timeout(function () {
                    if (window.hasOwnProperty('google')) {
                        scope.mapInitialized = true;
                        scope.geocoder = new google.maps.Geocoder();
                        if (scope.wizardStep === 2) {
                            initializeMap();
                        }
                        scope.$watch('wizardStep', function (newValue) {
                            if (newValue === 2) {
                                initializeMap();
                            }
                        });


                        if (scope.singleMarker) {
                            var currentInput = document.getElementById(scope.destinyId);
                            scope.destinyInput = currentInput;
                            scope.autocomplete_2 = new google.maps.places.Autocomplete(scope.destinyInput);
                            if (currentInput && !scope.multipleAddress) {
                                currentInput.addEventListener('change', function () {
                                    $timeout(function () {
                                        calculateAndDisplayMarker();
                                    });
                                });
                                calculateAndDisplayMarker();
                            }
                            else {
                                addWatchDestinyaddress();
                            }
                        } else {
                            scope.directionsService = new google.maps.DirectionsService;
                            scope.directionsDisplay = new google.maps.DirectionsRenderer({ draggable: false });
                            scope.directionsDisplay.addListener('directions_changed', function (e) {
                                var actual = scope.directionsDisplay.getDirections();
                                if (actual.request.origin.lat) {
                                    setMarkerDisplay(actual.request.origin, true)
                                }
                                if (actual.request.destination.lat) {
                                    setMarkerDisplay(actual.request.destination)
                                }
                            });

                            function setMarkerDisplay(geometry, markerType) {
                                scope[(markerType ? "marker1" : "marker2")].setPosition(geometry);
                                scope.map.setCenter(geometry);
                                scope.geocoder.geocode({
                                    latLng: geometry
                                }, function (result) {
                                    (markerType ? scope.origin = (setData(result[0])) : scope.destiny = (setData(result[0])));
                                    scope.googleResponse[markerType ? 0 : 1] = result;
                                    updateW3w((markerType ? "origin" : "destiny"), geometry)
                                    scope.$apply();
                                });
                            }

                            scope.directionsDisplay.setMap(scope.map);

                            scope.originInput = document.getElementById(scope.originId);
                            scope.destinyInput = document.getElementById(scope.destinyId);

                            scope.autocomplete_1 = new google.maps.places.Autocomplete(scope.originInput);
                            scope.autocomplete_2 = new google.maps.places.Autocomplete(scope.destinyInput);

                            if (scope.originInput) {
                                scope.originInput.addEventListener('change', function () {
                                    $timeout(function () {
                                        calculateAndDisplayRouteByW3w();
                                    });
                                });
                            }
                            if (scope.destinyInput) {
                                scope.destinyInput.addEventListener('change', function () {
                                    $timeout(function () {
                                        calculateAndDisplayRouteByW3w();
                                    });
                                });
                            }

                            if (scope.originInput || scope.destinyInput) {
                                calculateAndDisplayRouteByW3w();
                            }

                        }
                    }
                });
            }
        }
    }
}
