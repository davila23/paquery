(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('VehiclesService', VehiclesService);

  VehiclesService.$inject = ['UrlHelper'];

  function VehiclesService(UrlHelper) {
    var factory = {
        saveVehicle: saveVehicle,
        updateVehicle: updateVehicle,
        deleteVehicle:deleteVehicle,
        getVehicleTypes: getVehicleTypes,
        getVehicles: getVehicles
      };

    return factory;

    function saveVehicle(name, detail, model, vehicleBrand, vehiclePatent, vehicleType, active, logisticOperatorId,/*driverID,*/ insuranceCompanyID, avatar) {
      var url = 'api/vehicleadmin/create',
        config = {
          Name : name,
          Detail : detail,
          Model: model,
          VehicleBrand :vehicleBrand,
          VehiclePatent: vehiclePatent,
          VehicleType :vehicleType,
          Active: active,
          OwnerID: logisticOperatorId,
          InsuranceCompanyID :insuranceCompanyID,
          Avatar: avatar
        };

      return UrlHelper.post(url, config);
    }

    function updateVehicle(vehicleID, name, detail, model, vehicleBrand, vehiclePatent, vehicleType, active, logisticOperatorId, /*driverID,*/ insuranceCompanyID, avatar) {
      var url = 'api/vehicleadmin/update',
        config = {
          ID: vehicleID,
          Name : name,
          Detail : detail,
          Model: model,
          VehicleBrand :vehicleBrand,
          VehiclePatent: vehiclePatent,
          VehicleType :vehicleType,
          Active: active,
          OwnerID: logisticOperatorId,
          InsuranceCompanyID :insuranceCompanyID,
          Avatar: avatar
        };

      return UrlHelper.post(url, config);
    }

    function getVehicleTypes(){
      var url = 'api/vehicleadmin/vehicletype';

      return UrlHelper.get(url);
    }

    function getVehicles(page, take, desc, logisticOperatorId) {
      var url = 'api/vehicleadmin/getall',
        config = {
          page: page,
          take: take,
          desc: desc,
          logisticOperatorId: logisticOperatorId
        };

      return UrlHelper.get(url, config);
    }

    function deleteVehicle(vehicleId) {
      var url = 'api/vehicleadmin/delete/?id='+vehicleId;
      return UrlHelper.post(url);
    }

  }
})();
