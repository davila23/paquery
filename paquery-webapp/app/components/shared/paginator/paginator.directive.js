(function() {
    'use strict';
    angular
        .module('PaQuery')
        .directive('customPaginator', customPaginator);

    customPaginator.$inject = ['ngTableParams', '$filter'];

    function customPaginator(ngTableParams, $filter) {
        var directive = {
            restrict: 'E',
            link: link,
            scope: {
                getList: '=',
                filterUsertype: '=?',
                paginableTable: '=',
                isScheduled: '=',
                userId: '=',
                search: '=',
                filterStatus: '=',
                userType: '='
            }
        };

        return directive;

        function link(scope, iElm, iAttrs) {
            angular.extend(scope, {
                currentPage: 1,
                currentCount: 10,
                desc: true
            });
            watchIsScheduled(scope);
            initTable(scope, scope.search, scope.filterStatus);

            scope.$watch('filterStatus', function(newVal) {
                  scope.currentPage = 1;
                  initTable(scope, scope.search, newVal);
            });

            scope.$watch('search', function(newVal) {
                  scope.currentPage = 1;
                  initTable(scope, newVal, scope.filterStatus);
            });
        }

        function initTable(scope, search, filter) {
            if (scope.getList) {
                scope.getList(scope.currentPage - 1, scope.currentCount, scope.desc, scope.isScheduled ? scope.isScheduled : false, scope.userId , search || null , filter || null, scope.userType)
                    .then(function(response) {
                                             
                        var data = response.data;
                        scope.paginableTable = new ngTableParams({
                            page: scope.currentPage,
                            count: scope.currentCount,
                            sorting: {
                                name: 'asc'
                            }
                        }, {
                            total: response.total,
                            getData: function($defer, params) {
                                if (params.page() !== scope.currentPage) {
                                    scope.currentPage = params.page();
                                    scope.getList(scope.currentPage - 1, scope.currentCount, scope.desc, scope.isScheduled ? scope.isScheduled : false, scope.userId , search || null , filter || null)
                                        .then(function(response) {
                                            data = response.data;
                                            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                                            var result = orderedData.slice(0, params.page() * params.count());
                                            $defer.resolve(result);
                                        });
                                } else {
                                    if (scope.currentCount !== params.count()) {
                                        scope.currentCount = params.count();
                                        scope.getList(scope.currentPage - 1, scope.currentCount, scope.desc, scope.isScheduled ? scope.isScheduled : false, scope.userId , search || null , filter || null)
                                            .then(function(response) {
                                                data = response.data;
                                                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                                                var result = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                                $defer.resolve(result);
                                            });
                                    } else {
                                        var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                                        var result = orderedData.slice((params.page() - scope.currentPage) * params.count(), params.page() * params.count());
                                        $defer.resolve(result);
                                    }
                                }
                            }
                        });
                    });
            }
        }

        function watchIsScheduled(scope) {
            scope.$watch('isScheduled', function(newVal) {
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
