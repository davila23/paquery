(function () {
    'use strict';

    angular.module('PaQuery')
        .factory('DateService', DateService);

    DateService.$inject = ['UrlHelper'];

    function DateService(UrlHelper) {
        var factory = {
            getDaysOfWeek: getDaysOfWeek,
            mapToDays: mapToDays,
        };

        return factory;

        function mapEnumToInt(arrayEnum) {
            var result = [];

            _.forEach(arrayEnum, function (item) {
                result.push(item.value)
            });

            return result;
        };

        function mapIntToEnum(intArray, enumArray) {

            var result = [];

            _.forEach(intArray, i => {
                var enm = _.find(enumArray, ea => ea.value === i)
                if (enm)
                    result.push(enm)
            })

            return result;
        }


        function getDaysOfWeek() {
            return [
                {value: 0, name: "Domingo"},
                {value: 1, name: "Lunes"},
                {value: 2, name: "Martes"},
                {value: 3, name: "Miercoles"},
                {value: 4, name: "Jueves"},
                {value: 5, name: "Viernes"},
                {value: 6, name: "Sabado"},
            ]

            // var url = 'api/admin/paquerypoint/dayofweeks',
            //     config = {};
            //
            // return UrlHelper.get(url, config);
        }

        function getValuesOfDays(array) {
            return mapEnumToInt(array);
        }

        function mapToDays(array, dayArray) {
            return mapIntToEnum(array, dayArray)
        }

        function workingScheduleFactory(arrayDays, initHour, finishHour) {
            return [{
                DaysOfWeek: arrayDays,
                initHour: initHour,
                finishHour: finishHour
            }];
        };

    }

})();
