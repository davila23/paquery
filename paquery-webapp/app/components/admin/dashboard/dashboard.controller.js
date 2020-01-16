(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminDashboardController', AdminDashboardController);

    AdminDashboardController.$inject = ['serverErrorsNotifier', 'AdminDashboardService', 'PackagesService', '$uibModal', '$state'];

    function AdminDashboardController(serverErrorsNotifier, AdminDashboardService, PackagesService, $uibModal, $state) {
        var vm = this;
        angular.extend(vm, {
            getPackageReportBy: getPackageReportBy,
            getPackageReportTotal: getPackageReportTotal,
            openPackagesModal: openPackagesModal
        });

        var dataForChart = [];
        var dataForBarChart = [];
        var dataForPieChart = [];
        var year = new Date().getFullYear();
        vm.anioSelected = {anio: year};
        vm.anioSelectedTotales = {anio: year};
        var stringTitle = '';
        vm.filtrosAnio = [];


        var menos2Anios = year - 2;
        for (var i = menos2Anios; i <= year ; i++) {
            vm.filtrosAnio.push({anio:i});
            if(i === year){
                vm.filtrosAnio.sort(function(a, b) {
                    return b.anio - a.anio;
                });
            }
        }

        var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        function gd(date) {
            var d = new Date(date);
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            return new Date(year, month, day+1);
        }

        function getValueState(state, data) {
            var valor = data.find(function(v) { return v.status == state.id });
            if (valor == undefined)
                valor = { quantity : 0 };

            return valor.quantity;
        }

        function getPackageReportBy(tipo,mes) {
            mes = mes || '';
            AdminDashboardService.getPackageReport(tipo,mes,vm.anioSelected.anio)
                .then(function(response) {
                    stringTitle = mes === '' ? meses[new Date().getMonth()] : meses[mes-1];
                    dataForChart = [];
                    $.each(response.data, function (index,value) {
                        var registro=[];
                        registro.push(gd(value.date));

                        $.each(statesPackage, function(index, state) {
                            registro.push(getValueState(state, value.data));
                        });

                        dataForChart.push(registro);
                    });
                    drawChart();
                    drawBarChartMeses();
                })
                .catch(function(err) {
                    serverErrorsNotifier.notify(err.message);
                });
        }

        function getPackageSemana() {
            AdminDashboardService.getPackageReport('semana')
                .then(function(response) {
                    dataForBarChart = [];
                    $.each(response.data, function (index,value) {
                        var registro=[];
                        registro.push(gd(value.date));

                        $.each(statesPackage, function(index, state) {
                            registro.push(getValueState(state, value.data));
                        });

                        dataForBarChart.push(registro);
                    });
                    drawBarChart();
                })
                .catch(function(err) {
                    serverErrorsNotifier.notify(err.message);
                });
        }

        function getAllTotalizadores() {
            AdminDashboardService.getTotalizadores()
                .then(function(response) {
                    vm.totalizadores = response.data;
                })
                .catch(function(err) {
                    var msg = err.message ? err.message : 'Error al obtener totalizadores';
                    serverErrorsNotifier.notify(msg);
                });
        }

        function getPackageReportTotal(tipo) {
            AdminDashboardService.getPackageReport(tipo,'',vm.anioSelectedTotales.anio)
                .then(function(response) {
                    dataForPieChart = [];
                    dataForPieChart.push(['Estados','Cantidades']);
                    $.each(response.data, function (index,value) {
                        $.each(statesPackage, function(index, state) {
                            if(getValueState(state, value.data) !== 0){
                                dataForPieChart.push([state.name,getValueState(state, value.data)]);
                            }
                        });
                    });
                    drawPieChart();
                })
                .catch(function(err) {
                    serverErrorsNotifier.notify(err.message);
                });
        }

        //SE EJECUTA CADA VEZ QUE EL BROWSER CAMBIA DE TAMAÑO
        $(window).resize(function(){
            drawChart();
            drawBarChartMeses();
            drawPieChart();
            drawBarChart();
        });

        const statesPackage = [
            { id: 2, name: 'Ingresado a PaQuery Point' },
            { id: 1, name: 'Pendiente'},
            { id: 21, name: 'Cancelado'},
            { id: 3, name: 'En poder del Paquer' },
            { id: 20, name: 'Entregado'},
            { id: 5, name :'Pendiente de programar'}
        ];

        function drawChart() {
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(thisDrawChart);

            function thisDrawChart() {

                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fechas');
                $.each(statesPackage, function(i, s) { data.addColumn('number', s.name) });
                // data.addColumn('number', 'Pendiente de Retiro');
                // data.addColumn('number', 'Pendiente');
                // data.addColumn('number', 'Cancelado');
                // data.addColumn('number', 'Pendiente de entrega');
                // data.addColumn('number', 'Entregado');
                // data.addColumn('number', 'Pendiente de programar');

                data.addRows(dataForChart);

                var options = {'title':'Cantidad de paquetes en '+ stringTitle,
                    chartArea: {width: '60%',left:50, top:40,bottom: 55}
                };

                var divChart = document.getElementById('chart_div');
                if(divChart){
                    var chart =  new google.visualization.LineChart(divChart);
                    chart.draw(data, options);
                }
            }
        }

        function drawBarChartMeses() {
            google.charts.load('current', {'packages':['bar']});
            google.charts.setOnLoadCallback(thisDrawBarChartMeses);

            function thisDrawBarChartMeses() {

                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fechas');
                $.each(statesPackage, function(i, s) { data.addColumn('number', s.name) });
                // data.addColumn('number', 'Pendiente de Retiro');
                // data.addColumn('number', 'Pendiente');
                // data.addColumn('number', 'Cancelado');
                // data.addColumn('number', 'Pendiente de entrega');
                // data.addColumn('number', 'Entregado');
                // data.addColumn('number', 'Pendiente de programar');

                data.addRows(dataForChart);

                var options = {'title':'Cantidad de paquetes en '+ stringTitle,
                    chartArea: {width: '60%',left:50, top:40,bottom: 55},
                    isStacked: 'relative'
                };

                var divPaqueresMeses = document.getElementById('chart_div_BarChart_Meses');
                if(divPaqueresMeses){
                    var chart =  new google.visualization.ColumnChart(divPaqueresMeses);
                    chart.draw(data, options);
                }
            }
        }

        function drawPieChart() {
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(thisDrawPieChart);

            function thisDrawPieChart() {

                var data = google.visualization.arrayToDataTable(dataForPieChart);

                var options = {'title':'Cantidad de paquetes en este año',
                    chartArea: {width: '90%', left:13, top:33,bottom: 13},
                    pieHole: 0.4,
                    slices: {
                        0: {color: 'blue'},
                        1: {color: 'green'}
                    }
                };

                var divPaqueresTotales = document.getElementById('chart_div_paquetesTotales');
                if(divPaqueresTotales){
                    var chart = new google.visualization.PieChart(divPaqueresTotales);
                    chart.draw(data, options);
                }
            }
        }

        function drawBarChart() {
            google.charts.load('current', {packages: ['corechart', 'bar']});
            google.charts.setOnLoadCallback(thisDrawBarChart);
            function thisDrawBarChart() {
                // var data = google.visualization.arrayToDataTable(dataForPieChart);

                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Fechas');
                $.each(statesPackage, function(i, s) { data.addColumn('number', s.name) });
                // data.addColumn('number', 'Pendiente de Retiro');
                // data.addColumn('number', 'Pendiente');
                // data.addColumn('number', 'Cancelado');
                // data.addColumn('number', 'Pendiente de entrega');
                // data.addColumn('number', 'Entregado');
                // data.addColumn('number', 'Pendiente de programar');

                data.addRows(dataForBarChart);

                var options = {
                    title: 'Cantidad de paquetes en la última semana',
                    chartArea: {width: '50%',height:'80%',left:95}
                };

                var divPaquetesSemana = document.getElementById('chart_div_paquetesSemana');
                if(divPaquetesSemana){
                    var chart = new google.visualization.BarChart(divPaquetesSemana);
                    chart.draw(data, options);
                }

            }
        }

        function openPackagesModal(deliveryTerm, status, assigned, notExpired) {
            modalInstances(deliveryTerm, status, assigned, notExpired);
        }

        function modalInstances(deliveryTerm, status, assigned, notExpired) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'components/shared/paginableSelector/paginableSelector.html',
                controller: 'PaginableSelectorController',
                controllerAs: 'vm',
                size: 'modal-lg',
                backdrop: 'static',
                keyboard: true,
                resolve: {
                    statusID: function () {
                        return 1;
                    },
                    params: function () {

                        var res = {
                            notExpired:notExpired,
                            deliveryTerm:deliveryTerm,
                            status:status,
                            assigned:assigned
                        };
                        return res
                    },
                   
                    getListFunction: function () {
                        return PackagesService.getDashboardPackages;
                    },
                    attributes: function () {
                        return [{
                            title: 'Código Externo',
                            field: 'externalCode'
                        }, {
                            title: 'Descripción',
                            field: 'caption'
                        }, {
                            title: 'Fecha de Creación',
                            field: 'creationDate'
                        }];
                    },
                    elementName: function () {
                        return 'paquete';
                    }
                }
            });

            modalInstance.result.then(function (pack) {
                PackagesService.getPackage(pack.id).then(function (response) {
                    $state.go('admin.viewPackage', { obj: response.data });
                });
            });

        }

        $( document ).ready(function() {
            vm.getPackageReportBy('mes');
            vm.getPackageReportTotal('paquetes');
            getPackageSemana();
            getAllTotalizadores();
        });

    }

})();