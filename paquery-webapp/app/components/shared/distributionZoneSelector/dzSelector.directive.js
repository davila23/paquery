angular
    .module('PaQuery')
    .directive('dzSelector', DzSelector);

DzSelector.$inject = ['$timeout', '$window', 'W3wSerice', '$rootScope', '$state', 'DistributionZoneService', 'mapUtils'];

function DzSelector($timeout, $window, W3wService, $rootScope, $state, distributionZoneService, mapUtils) {
    return {
        scope: {
            id: '@?',
            name: '@?',
            distributionZone: '=',
            inputClass: '@?',
            onChange: '&',
            ngBlur: '&',
            disabled: '='
        },
        restrict: 'E',
        templateUrl: 'components/shared/distributionZoneSelector/dzSelector.template.html',
        link: function(scope, element, attrs) {

            scope.$watch('distributionZone', function(newDz) {
                // console.log("Cambio distributionZone", newDz)
                // console.log("Element:", element);
                // console.log("Attrs:", attrs);
                scope.selected = newDz;

                if (newDz)
                    scope.$broadcast('angucomplete-alt:changeInput', scope.id, newDz);
                else
                    scope.$broadcast('angucomplete-alt:clearInput', scope.id);
            });

            scope.$watch('selected', function(selected){
                // console.log("Se eligio dz:", selected)

                if (selected === undefined) {
                    scope.distributionZone = undefined;
                    return;
                }

                if (selected) {
                    scope.distributionZone = selected.originalObject ? selected.originalObject : selected;
                    $timeout(function(){ scope.$root.$apply() });
                }
                else
                    scope.distributionZone = undefined;

                $timeout(function() { scope.onChange && scope.onChange() })
            });


            scope.searchApiHandler = function (search, timeout) {
                let promise = distributionZoneService.findDistributionZone(search);
                return promise.then(function(resp) { return resp.data; })
            };
        },
        controller: function() {

        }
    }
}