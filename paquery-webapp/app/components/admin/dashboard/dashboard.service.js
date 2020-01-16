(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('AdminDashboardService', AdminDashboardService);

    AdminDashboardService.$inject = ['UrlHelper'];

    function AdminDashboardService(UrlHelper) {

        var year = new Date().getFullYear();
        var url = 'api/packagereport/getall';
        //mm/dd/yyyy
        function getPackageReport(tipo,mes, anio) {
            year = anio !== undefined ? anio : year;
            var day = new Date().getDate();
            var month = addMonths(new Date(),1).getMonth();
            mes = mes || '';
            month = (mes === '' || mes === 13) ? month : mes;
            if(month === 0 && new Date().getMonth() === 11){
                month = 12;
            }
            //mm/dd/yyyy
            var fromPaquetes = '1/1/' + year;
            var toPaquetes = '12/31/' + year;
            var from = month + '/' + day + '/' + year;
            var lastWeek = getLastWeek();
            var mapStrategy = { 'mes' : {from:month + '/1/' + year,to:month + '/' + getDaysInMonth(year,month-1) + '/' + year,groupBy:1},
                                'semana' : {from:lastWeek.getMonth() + 1 + '/' + lastWeek.getDate() + '/' + lastWeek.getFullYear(),to:from,groupBy:1},
                                'paquetes' : {from:fromPaquetes,to:toPaquetes,groupBy:3},
                                'dia' : {from:from,to:from,groupBy:1}};

            return UrlHelper.get(url, mapStrategy[tipo], true);
        }

        function isLeapYear (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        }

        function getDaysInMonth(year, month) {
            return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        }

        function addMonths (date,value) {
            var n = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + value);
            date.setDate(Math.min(n, getDaysInMonth(date.getFullYear(), date.getMonth())));
            return date;
        }

        function getLastWeek(){
            var today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) ;
        }

        function getTotalizadores() {
                var url = 'api/packageadmin/getdashboardtotals?from=1/1/1990&to=12/31/' + year;
                return UrlHelper.get(url);
        }

        var factory = {
            getPackageReport: getPackageReport,
            getTotalizadores: getTotalizadores
        };

        return factory;
    }

})();
