(function() {
  'use strict';

  angular.module('PaQuery')
    .constant('VERSION', "Version 2.3.2")

    // PRODUCCION
  //  .constant('API_MS_PACKAGES','https://ms-api.paquery.com/packages/')
  //  .constant('ENDPOINT', 'https://api.paquery.com/')

    // LOCAL
    // .constant('API_MS_PACKAGES','http://localhost:8100/')
    // .constant('ENDPOINT','http://api-local.paquery.com:8080/')

    // PREPROD
     .constant('API_MS_PACKAGES','https://ms-api-preprod.paquery.com/packages/')
     .constant('ENDPOINT', 'https://api-pre.paquery.com/')

    // .constant('ENDPOINT', 'https://api.paquery.com/')
    .constant('KEYCAPTCHA', '6LdzlDMUAAAAAFxhMkaIcpq3DW3sLF1bZWeVuAbz')
    .constant('CARONTE_ENDPOINT', 'https://ms-api-preprod.paquery.com/caronte/')
    .constant('HERE_API_KEY', 'MBtttw0ilTLGyGoskMgB')
    .constant('HERE_API_CODE', 'e7fgY70B6UbgzM0DejwUSw')
    .constant('HERE_URL_AUTOCOMPLETE', 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json')

    .constant('URLMP', '//secure.mlstatic.com/mptools/render.js' )
    .constant('falgZendesk', false)
    .constant('DELIVERY_TERM',[{value: 1, name: 'Plazo 48 hs'},
                  {value: 2, name: 'Día siguiente'},
                  {value: 3, name: 'Mismo día'},
                  {value: 5, name: '1 Semana despúes'},
                  {value: 4, name: '2hs despúes'}])
    .constant('DATE_OPTS', {
        locale: {
                format: 'DD/MM/YYYY',
                applyClass: 'btn-primary-datepicker',
                applyLabel: "Aplicar",
                fromLabel: "Desde",
                toLabel: "Hasta",
                cancelLabel: 'Limpiar',
                customRangeLabel: 'Custom',
                daysOfWeek: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
                firstDay: 1,
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        ranges: {
                'Ultimos 7 Dias': [moment().subtract(6, 'days'), moment()],
                'Ultimos 30 Dias': [moment().subtract(29, 'days'), moment()],
                'Hace 3 meses': [moment().subtract(3, 'month'), moment()],
                'Hace 6 meses': [moment().subtract(6, 'month'), moment()],
                'Hace 12 meses': [moment().subtract(12, 'month'), moment()]
        },
        eventHandlers: {
            'showCalendar.daterangepicker':function(scope)
            {
                angular.element("input[name='daterangepicker_end']").prop("readonly",true);
                angular.element("input[name='daterangepicker_end']").prop("disabled",true);
                angular.element("input[name='daterangepicker_start']").prop("readonly",true);
                angular.element("input[name='daterangepicker_start']").prop("disabled",true);
            },
            'cancel.daterangepicker':function(scope)
            {
                scope.model = {
                    startDate: null,
                    endDate: null
                };
            }
        }
    });
})();
