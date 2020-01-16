(function() {
  'use strict';

define(["addressService"],function(factory) {
  var app=angular.module('PaQuery')
  app.factory('AddressesService', AddressesService);

  AddressesService.$inject = ['UrlHelper'];

  function AddressesService(UrlHelper) {
    var factory = {
      getAddresses: getAddresses,
      actionsAddress: actionsAddress,
      deleteAddress: deleteAddress
    };

    return factory;

    function getAddresses(current,count,schedule) {
      var config={start:current,size:count,isScheduled:schedule}
      var url = 'api/customer/getaddress';
      return UrlHelper.get(url,config);
    }

    function actionsAddress(config) {
      console.log(config);
      var url = 'api/customer/setaddress',
      config = config;
      return UrlHelper.post(url, config);
    }
    function deleteAddress(id) {
      console.log(id);
      var url = 'api/customer/deleteaddress/'+id;
      return UrlHelper.post(url);
    }
  }

  return app;
})


})();
