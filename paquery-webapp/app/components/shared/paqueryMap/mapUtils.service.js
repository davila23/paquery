(function() {
    'use strict';
    angular.module('PaQuery')
        .factory('mapUtils', MapUtils);

    MapUtils.$inject = ['UrlHelper'];

    function MapUtils(UrlHelper) {

        const isLocationValid = function(location) {
            return location != null && (
                ( location.lat != null && location.lng != null) || (location.Latitude != null && location.Longitude != null)
            );
        };

        const unifyLocation = function(location) {
            return (location.lat || location.Latitude) + ',' + (location.lng || location.Longitude)
        };

        const addRouteShapeToMap = function (map, route) {
            var lineString = new H.geo.LineString(),
                routeShape = route.shape,
                polyline;

            routeShape.forEach(function(point) {
                var parts = point.split(',');
                lineString.pushLatLngAlt(parts[0], parts[1]);
            });

            polyline = new H.map.Polyline(lineString, {
                style: {
                    lineWidth: 8, strokeColor: 'rgba(0, 128, 255, 0.7)'
                },
                arrows: {
                    fillColor: 'white', frequency: 2, width: 1.4, length: 1.0
                }
            });
            // Add the polyline to the map
            map.addObject(polyline);

            // And zoom to its bounding rectangle
            map.setViewBounds(polyline.getBounds(), true);
        };

        const normalizeLocation = function(location) {

            if (!location) return null;

            location = location.location || location;

            const result = {
                lat: location.lat || location.Latitude,
                lng: location.lng || location.Longitude
            }

            return result
        };

        const addField = function (address, divider, name, altername) {
            const value = address[name] || address[altername];
            return value ? (divider !== null ? divider : " " ) + value : ""
        }

        const getLabelAddress = function(address) {

          const a = address;

          let result = "";

        // result += a.street != null ? a.street : "";
        // result += a.county ? ", " + a.county : "";
        // result += a.postalCode ?  ", " + a.postalCode : "";
        // result += a.district ? ", " + a.district : "";

        // result += a.houseNumber != null ? " " + a.houseNumber : "";
        // result += a.country ? ", " + a.country : "";

          result += addField(a,'' , 'street', "Street" );
          result += addField(a,' ' , 'houseNumber', "HouseNumber" );//a.houseNumber != null ? " " + a.houseNumber : "";
          result += addField(a,', ', 'district', "District"); //a.district ? ", " + a.district : "";
          result += addField(a,', ', 'postalCode', "PostalCode"); //a.postalCode ?  ", " + a.postalCode : "";
          result += addField(a,', ', 'county', 'County'); //a.county ? ", " + a.county : "";

          if (( a.county || a.County )!== ( a.city || a.City ) )
            result += addField(a, ', ', 'city', 'City'); //a.county ? ", " + a.county : "";
            // result += ", " + address.city;

          result += addField(a,', ', 'country', 'Country'); //a.country ? ", " + a.country : "";

          if (result === "" || result === " ")
              result = a.label || a.Label;

          return result;
        };

        const factory = {
            isLocationValid: isLocationValid,
            unifyLocation: unifyLocation,
            normalizeLocation: normalizeLocation,

            addRouteShapeToMap: addRouteShapeToMap,
            getLabelAddress: getLabelAddress
        };

        return factory;
    }
})();
