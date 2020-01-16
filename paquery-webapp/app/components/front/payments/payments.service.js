(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('FrontPaymentsService', PaymentsService);

    PaymentsService.$inject = ['UrlHelper'];

    function PaymentsService(UrlHelper) {
        var factory = {
            savePayment: savePayment,
            getPaymentTypes: getPaymentTypes,
            getPayments: getPayments,
            getMovements: getMovements,
            decreaseAmount: decreaseAmount
        };

        return factory;

        function savePayment(payment) {
            var url = 'api/payments',
                config = {
                    payment: payment
                };

            return UrlHelper.post(url, config);
        }

        function getPayments(page, take, desc) {
            var url = 'api/payment/getall',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function getMovements(page, take, desc) {
            var url = 'api/payment/getallmovements',
                config = {
                    page: page,
                    take: take,
                    desc: desc
                };

            return UrlHelper.get(url, config);
        }

        function getPaymentTypes() {
            var url = 'api/apptype/paymenttype';

            return UrlHelper.get(url);
        }

        function decreaseAmount(id, amount) {
          var url = 'api/customer/decreaseamount?amount='+amount + '&packageID=' + id;
              return UrlHelper.post(url);
        }
    }
})();
