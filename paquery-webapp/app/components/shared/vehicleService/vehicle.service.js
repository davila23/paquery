(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('VehicleService', VehicleService);

  VehicleService.$inject = ['UrlHelper'];

  function VehicleService(UrlHelper) {
    var factory = {
      create: create,
      updateVehicle: updateVehicle,
      deleteVehicle: deleteVehicle,
      getVehicles: getVehicles,
      getVehicle: getVehicle
    };

    return factory;

    function create(name, detail, model, vehicleBrand, vehiclePatent, vehicleType, vehicleType, driverID, insuranceCompanyID) {
      var url = 'api/vehicleadmin/create',
        config = {
          Name: name,
          Detail: detail,
          Model: model,
          VehicleBrand: vehicleBrand,
          VehiclePatent: vehiclePatent,
          VehicleType: vehicleType,
          DriverID: driverID,
          InsuranceCompanyID: insuranceCompanyID
        };

      UrlHelper.post(url, config);
    }

    function updateVehicle(vehicleId, name, detail, model, vehicleBrand, vehiclePatent, vehicleType, vehicleType, driverID, insuranceCompanyID) {
      var url = 'api/vehicleadmin/update',
        config = {
          id: vehicleId,
          Name: name,
          Detail: detail,
          Model: model,
          VehicleBrand: vehicleBrand,
          VehiclePatent: vehiclePatent,
          VehicleType: vehicleType,
          DriverID: driverID,
          InsuranceCompanyID: insuranceCompanyID
        };

      UrlHelper.post(url, config);
    }

    function deleteVehicle(customerId) {
      var url = 'api/vehicleadmin/delete/' + customerId;

      UrlHelper.post(url);
    }

    function getVehicles(page, take, desc) {
      var url = 'api/vehicleadmin/getall',
        config = {
          page: page,
          take: take,
          desc: desc
        };

      return UrlHelper.get(url, config);
    }


    function getVehicle(vehicleId) {
      var url = 'api/vehicleadmin/get/' + vehicleId;

      return UrlHelper.get(url);
    }

  }
})();
