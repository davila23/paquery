 (function() {
     'use strict';

     angular.module('PaQuery')
         .factory('ProfileService', ProfileService);
     ProfileService.$inject = ['UrlHelper'];

     function ProfileService(UrlHelper) {
         var factory = {
             getUserProfile: getUserProfile,
             postMPLink: postMPLink,
             postMPAddAmount:postMPAddAmount,
             getMPAmount:getMPAmount

         };

         return factory;

         function getUserProfile() {
             var url = 'api/profile/load';
             return UrlHelper.get(url);
         }

        function postMPLink(rate) {
          var url = 'api/Payment/GetMPLink',
              config = {
                rate: rate
              };

          return UrlHelper.post(url, config);
        }

        function postMPAddAmount(amount){
          var url = 'api/customer/addamount?amount='+ amount;

          return UrlHelper.post(url);
        }

        function getMPAmount() {
          var url = 'api/customer/getamount';
          return UrlHelper.get(url);
        }



     }
 })();
