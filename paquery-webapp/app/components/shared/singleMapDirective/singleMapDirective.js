angular
  .module('PaQuery')
  .directive('singleMap', singleMap);

singleMap.$inject = ['$timeout', '$window', 'W3wSerice'];

function singleMap($timeout, $window, W3wSerice) {
  return {
    scope: {
      address: '=',
      addressId: '=',
      w3w: '='
    },
    restrict: 'E',
    templateUrl: 'components/shared/singleMapDirective/singleMap.html',
    link: function(scope, element, attrs) {
      var isW3wAddressFocused = false;

      function calculateAndDisplayMarker() {
        var addressInput = document.getElementById(scope.addressId);
        var addressValue = addressInput.value;
        if (scope.marker) {
          scope.marker.setMap(null);
        }
        initializing = false;
        scope.geocoder.geocode({ 'address': addressValue }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK && results.length) {
            if (!scope.map) {
              scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                position: results[0].geometry.location
              });
            }

            var address_components = results[0].address_components,
              resultValue = results[0].formatted_address;

            for (var i = 0; i < address_components.length; i++) {
              for (var j = 0; j < address_components[i].types.length; j++) {
                if (address_components[i].types[j].indexOf('postal_code') > -1) {
                  resultValue = resultValue.replace(address_components[i].long_name, "");
                }
              }
            }

            resultValue = resultValue.replace('  ', ' ');
            addressInput.value = resultValue;
            scope.address.stringValue = resultValue;
            setCoordinates(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            scope.map.setCenter(results[0].geometry.location);
            scope.marker = new google.maps.Marker({
              map: scope.map,
              position: results[0].geometry.location
            });
            scope.map.setZoom(15);
          } else {
            if (!scope.map) {
              scope.map = new google.maps.Map(document.getElementById('map'), {
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
            setCoordinates(undefined, undefined);
            addressInput.value = '';
          }
        });
      }

      function setCoordinates(lat, lng) {
        $timeout(function() {
          scope.address.coordinates = {
            lat: lat,
            lng: lng
          };
        });
      }

      function calculateAndDisplayMarkerByW3w() {
        var addressInput = document.getElementById(scope.addressId);

        if (scope.marker) {
          scope.marker.setMap(null);
        }

        var addressConfig = {
          'location': {
            lat: scope.address.coordinates.lat,
            lng: scope.address.coordinates.lng
          }
        };

        scope.geocoder.geocode(addressConfig, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK && results.length) {
            if (!scope.map) {
              scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                position: results[0].geometry.location
              });
            }

            var address_components = results[0].address_components,
              newAddressValue = results[0].formatted_address;

            for (var i = 0; i < address_components.length; i++) {
              for (var j = 0; j < address_components[i].types.length; j++) {
                if (address_components[i].types[j].indexOf('postal_code') > -1) {
                  newAddressValue = newAddressValue.replace(address_components[i].long_name, "");
                }
              }
            }

            newAddressValue = newAddressValue.replace('  ', ' ');
            addressInput.value = newAddressValue;
            scope.address.stringValue = newAddressValue;
            angular.element('#address-container').addClass('fg-toggled');
            setCoordinates(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            scope.map.setCenter(results[0].geometry.location);
            scope.marker = new google.maps.Marker({
              map: scope.map,
              position: results[0].geometry.location
            });
            scope.map.setZoom(15);
          } else {
            if (!scope.map) {
              scope.map = new google.maps.Map(document.getElementById('map'), {
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
            setCoordinates(undefined, undefined);
            addressInput.value = '';
          }
        });
      }

      function isAValidWord(word) {
        var repetitions = 0;

        for (var i = 0; i < word.length; i++) {
          if (word[i] === '.') {
            repetitions++;
          }
        }
        return repetitions === 2;
      }

      setTimeout(function() {
        scope.$watch('w3w', function(newValue) {
          if (isW3wAddressFocused && isAValidWord(newValue)) {
            W3wSerice.getLatAndLong(newValue)
              .then(function(response) {
                var geometry = {
                  lat: Number(response.data.geometry.lng),
                  lng: Number(response.data.geometry.lat)
                };
                if (response.data.geometry) {
                  scope.address.coordinates.lat = Number(geometry.lat);
                  scope.address.coordinates.lng = Number(geometry.lng);
                  calculateAndDisplayMarkerByW3w();
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        });
      });

      angular.element('#w3w-address-input').bind('blur', function(e) {
        isW3wAddressFocused = false;
      });
      angular.element('#w3w-address-input').bind('focus', function(e) {
        isW3wAddressFocused = true;
      });

      $window.initSingleMap = function() {
        scope.geocoder = new google.maps.Geocoder();
        scope.addressInput = document.getElementById(scope.addressId);
        scope.autocomplete = new google.maps.places.Autocomplete(scope.addressInput);
        document.getElementById(scope.addressId).addEventListener('change', calculateAndDisplayMarker);
        calculateAndDisplayMarker();
      }

    }
  }
}
