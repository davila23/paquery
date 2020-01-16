(function() {
    'use strict';
    angular
        .module('PaQuery')
        .directive('customPaginatorv2', customPaginator);

    customPaginator.$inject = ['ngTableParams', '$filter','$timeout'];

    function customPaginator(ngTableParams, $filter, $timeout) {

        const time_debounce = 700;

        var directive = {
            restrict: 'E',
            require: '',
            link: link,
            scope: {
                getList: '=',
                filterList: '=?',
                paginableTable: '=',
                isScheduled: '=',
                userId: '=',
                search: '=',
                searchRolled: '=',
                searchArrived: '=',
                searchArrivedCallback: '=',
                filterStatus: '=',
                userType: '=?',
                userRole: '=?',
                marketPlace: '=?',
                dateRange: '=?',
                deliveryTerm: '=?',
                status: '=?',
                assigned: '=?',
                notExpired: '=?'
            }
        };

        return directive;

        function link(scope, iElm, iAttrs) {
            angular.extend(scope, {
                currentPage: 1,
                currentCount: 10,
                desc: true,
                dateRange: {startDate: null, endDate: null}
            });
            watchIsScheduled(scope);
            initTable(scope, scope.search, scope.filterStatus);

            scope.$watch('filterStatus', function(newVal, oldVal) {
                if(!(newVal== undefined && oldVal== undefined)) {
                    scope.currentPage = 1;
                    initTable(scope, scope.search, newVal);
                }
            });

            scope.$watch('userRole', function(newVal, oldVal) {
                if(!(newVal== undefined && oldVal== undefined)) {
                    scope.currentPage = 1;
                    initTable(scope, scope.search, scope.filterStatus);
                }
            });

            scope.$watch('marketPlace', function(newVal, oldVal) {
                if(!(newVal== undefined && oldVal== undefined)) {
                    scope.currentPage = 1;
                    initTable(scope, scope.search, scope.filterStatus);
                }
            });

            scope.$watch('dateRange', function(newVal, oldVal) {
                if(!(newVal== undefined && oldVal== undefined)) {
                    scope.currentPage = 1;
                    clearTimeout(scope.searchTimeOut);
                    scope.searchTimeOut = setTimeout(function() {
                        initTable(scope, scope.search, scope.filterStatus);
                    }, time_debounce);
                }
            });

            scope.$watch('search', function(newVal,oldVal) {

                if(!(newVal== undefined && oldVal== undefined)){
                    scope.currentPage = 1;
                    clearTimeout(scope.searchTimeOut);
                    scope.searchTimeOut = setTimeout(function() {
                        initTable(scope, newVal, scope.filterStatus);
                    }, time_debounce);
                }

            });

            scope.$watch('searchRolled', function (newVal, oldVal) {

                if (!(newVal == undefined && oldVal == undefined)) {
                    scope.currentPage = 1;
                    clearTimeout(scope.searchTimeOut);
                    scope.searchTimeOut = setTimeout(function () {
                        initTable(scope, null, scope.filterStatus, newVal);
                    }, time_debounce);
                }

            });

            scope.$watch('searchArrived', function (newVal, oldVal) {

                if (!(newVal == undefined && oldVal == undefined)) {
                    scope.currentPage = 1;
                    clearTimeout(scope.searchTimeOut);
                    if (scope.searchArrivedCallback) {
                        scope.searchArrivedCallback(newVal);
                    } else {
                        scope.searchTimeOut = setTimeout(function () {
                            initTable(scope, null, scope.filterStatus, undefined, newVal);
                        }, time_debounce);
                    }
                }

            });


        }

        function initTable(scope, search, filter, searchRolled, searchArrived) {
            if (scope.getList) {
                scope.getList(  scope.currentPage - 1,
                                scope.currentCount,
                                scope.desc,
                                scope.isScheduled ? scope.isScheduled : false,
                                scope.userId || null,
                                search || null,
                                filter || null,
                                null,
                                scope.userType || null,
                                scope.userRole || null,
                                scope.dateRange.startDate,
                                scope.dateRange.endDate,
                                scope.marketPlace ? scope.marketPlace.id : null,
                                scope.deliveryTerm || null,
                                scope.status || null,
                                scope.assigned || false,
                                scope.notExpired || false,
                                searchRolled || null,
                                searchArrived || null)
                    .then(function(response) {

                        var resp = response;

                        scope.paginableTable = new ngTableParams({
                            page: scope.currentPage,
                            count: scope.currentCount
                        }, {
                            total: response.total,
                            getData: function ($defer, params) {

                                var sorting = params.orderBy().toString();
                                var sortColumn = undefined;
                                var changeSize = false;

                                if (sorting !== undefined && sorting !== "") {
                                    scope.desc = sorting.charAt(0) !== '+';
                                    sortColumn = sorting.substring(1);
                                }

                                if (params.page() !== scope.currentPage) {
                                    scope.currentPage = params.page();
                                } else {
                                    changeSize = scope.currentCount !== params.count();

                                    if (scope.currentCount !== params.count()) {
                                        scope.currentCount = params.count();
                                    }
                                }

                                if (scope.currentPage != 1 || changeSize) {
                                    scope.getList(scope.currentPage - 1, scope.currentCount, scope.desc, scope.isScheduled ? scope.isScheduled : false,
                                                   scope.userId || null, search || null, filter || null, sortColumn || null, scope.userType || null, scope.userRole || null,
                                                   scope.dateRange.startDate, scope.dateRange.endDate, scope.marketPlace ? scope.marketPlace.id : null,
                                                   scope.deliveryTerm || null, scope.status || null, scope.assigned || false, scope.notExpired || false)
                                        .then(function (response) {
                                            $defer.resolve(scope.filterList ? scope.filterList(response.data) : response.data);
                                        });
                                } else {
                                    $defer.resolve(scope.filterList ? scope.filterList(resp.data) : resp.data);
                                }
                            }
                        });
                    });
            }
        }

        function watchIsScheduled(scope) {
            scope.$watch('isScheduled', function(newVal,oldVal) {
                if (angular.isDefined(newVal)) {
                    scope.desc = true;
                    scope.currentPage = 1;
                    scope.currentCount = 10;
                    initTable(scope);
                }
            });
        }
    }
})();
