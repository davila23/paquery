(function () {
    'use strict';
    angular
        .module('PaQuery')
        .directive('workingScheduleTime', workingScheduleTime);

    workingScheduleTime.$inject = ['DateService', '$filter'];

    function workingScheduleTime(DateService, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'components/shared/workingScheduleTime/working.schedule.time.html',
            scope: {
                scheduleTime: '=',
            },
            link: function (scope, iElm, iAttrs) {

                scope.days = [];
                scope.selections = [];

                scope.getDays = function () {

                    scope.days = DateService.getDaysOfWeek();
                    scope.selectedDay = scope.days[0];
                }


                // scope.$watch('scheduleTime', (newValue, oldValue) => {
                //
                //     if (newValue == oldValue) return;
                //
                //     scope.scheduleTime.daysOFWeek = DateService.mapToDays(newValue.daysOFWeek, scope.days);
                // });

                scope.addDay = function () {
                    if (!scope.scheduleTime.daysOFWeek)
                        scope.scheduleTime.daysOFWeek = [];

                    const day = scope.selectedDay;
                    if (scope.scheduleTime.daysOFWeek.indexOf(day.value) == -1)
                        scope.scheduleTime.daysOFWeek.push(day.value)

                    scope.scheduleTime.daysOFWeek = scope.scheduleTime.daysOFWeek.sort()
                }

                scope.removeDay = function (elem) {
                    scope.scheduleTime.daysOFWeek.splice(scope.scheduleTime.daysOFWeek.indexOf(elem.value), 1);
                }
                scope.getDays();
            }
        }
    }
})();
