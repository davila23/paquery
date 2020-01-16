angular
    .module('PaQuery')
    .filter('keyValueFilter', keyValueFilter);

function keyValueFilter() {
    return function(key, array) {
        var retValue,
            done = false;

        if (angular.isUndefined(array)) {
            return [];
        }

        for (var i = 0; i < array.length && !done; i++) {
            if (array[i].value === key || array[i].id === key) {
                retValue = array[i].name;
            }
        }

        return retValue;
    }
}
