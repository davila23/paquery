(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('PaymentsService', paymentsService);

    paymentsService.$inject = ['UrlHelper'];

    function paymentsService(UrlHelper) {
        var factory = {
            savePayment: savePayment,
            getAllPayments: getAllPayments,
            getPaymentTypes: getPaymentTypes,
            getMovements: getMovements,
        };

        return factory;

        function savePayment(payment) {
            var url = 'api/payments',
                config = {
                    payment: payment
                };

            return UrlHelper.post(url, config);
        }

        // I put isScheduled param because of the generic configuration
        // of the customPaginator component
        function getAllPayments(page, take, desc, isScheduled, userId) {
            var url = 'api/paymentadmin/getall',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            if (userId) {
                config.userID = userId;
            }

            return UrlHelper.get(url, config);
        }

        function getPaymentTypes() {
            var url = 'api/apptype/paymenttype';

            return UrlHelper.get(url);
        }

        function getMovements(page, take, desc, isScheduled, userId) {
            var url = 'api/paymentadmin/getallmovements',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            if (userId) {
                config.userID = userId;
            }

            return UrlHelper.get(url, config);
        }

    }
})();
