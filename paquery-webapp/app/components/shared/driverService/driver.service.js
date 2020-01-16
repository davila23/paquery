(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('DriverService', DriverService);

  DriverService.$inject = ['UrlHelper', '$state'];

  function DriverService(UrlHelper, $state) {
    var factory = {
      create: create,
      update: update,
      updateDriver: updateDriver,
      deleteDriver: deleteDriver,
      getDrivers: getDrivers,
      getDriver: getDriver,
      getDriversByMarketplace: getDriversByMarketplace,
      getDriversByLogisticOperator: getDriversByLogisticOperator
    };

    return factory;

      function create(name, lastName, email, docNumber, countryId, cityId, password, mobile, phone, avatarImg, active, /*MarketplaceID, idsOPL,*/
                      VehiclesID, specialVehicle, workZone, avatarName, avatarHeight, avatarWidth, cityName, cuil, cbu, birthDate, distributionZones) {
      var url = 'api/driveradmin/create',
        config = {
          AvatarImg: avatarImg,
          Avatar: avatarName,
          Status: status,
          Name: name,
          AvatarHeight: avatarHeight,
          AvatarWidth: avatarWidth,
          Image: null,
          CityName: cityName,
          LastName: lastName,
          Email: email,
          DocNumber: docNumber,
          Mobile: mobile,
          Phone: phone,
          CityId: cityId,
          countryId: countryId,
          Pwd: password,
          Active: active,
          //LogisticOperators: idsOPL,
          //MarketplaceID: MarketplaceID,
          VehicleID: VehiclesID,
          SpecialVehicle: specialVehicle,
            WorkZones: workZone,
            BirthDate: birthDate,
            CUIL: cuil,
            CBU: cbu,
          distributionZones: distributionZones
        };
      return UrlHelper.post(url, config);
    }

      function update(driverId, name, lastName, email, docNumber, countryId, cityId, password, mobile, phone, avatarName, avatarImage, active, /*MarketplaceID,idsOPL,*/
                      VehiclesID, specialVehicle, workZone, driverType, code, cuil, cbu, birthDate, distributionZones) {
      var url = 'api/driveradmin/update',
        config = {
          ID: driverId,
          Name: name,
          LastName: lastName,
          Email: email,
          DocNumber: docNumber,
          Mobile: mobile,
          Phone: phone,
          DriverType: driverType,
          Code : code,
          countryId: countryId,
          CityId: cityId,
          Pwd: password,
            Avatar: avatarName,
            AvatarImg: avatarImage,
          Active: active,
          //LogisticOperators: idsOPL,
          /*MarketplaceID: MarketplaceID,*/
          VehicleID: VehiclesID,
          SpecialVehicle: specialVehicle,
            WorkZones: workZone,
            BirthDate: birthDate,
            CUIL: cuil,
            CBU: cbu,
           DistributionZones: distributionZones
        };
      return UrlHelper.post(url, config);
    }

    function updateDriver(driver) {
        var url = "api/driveradmin/update";

        const bodyDriver = {
            ...driver,
            ID: driver.driverID,
            Pwd: driver.password,
            CountryID: driver.country.id,
            CityID: driver.city.id,
            Avatar: driver.avatarName,
            AvatarImg: driver.avatarImage,
            LogisticOperators: driver.idsOPL,
            VehicleID: driver.VehiclesID,
            BirtDate: driver.birthDate,
        };

        return UrlHelper.post(url, bodyDriver);
    }

    function deleteDriver(driverId) {
      var url = 'api/driveradmin/delete/',
        config = {
          id: driverId
        };

      return UrlHelper.delete(url, config);
    }

    function getDrivers(page, take, desc, isScheduled, driverId, search, status, sortColumn) {
      var url = 'api/driveradmin/getall',
        config = {
            page: page,
            take: take,
            desc: desc,
            search: search,
            sortColumn: sortColumn
        };

      return UrlHelper.get(url, config);
    }

    function getDriver(driverId) {
      var url = 'api/driveradmin/get/',
        config = {
          id: driverId
        };

      return UrlHelper.get(url, config);
    }

    function getDriversByMarketplace(marketplaceID) {
        var url = 'api/driveradmin/getbymarketplace/',
          config = {
              marketplaceID: marketplaceID
          };

        return UrlHelper.get(url, config);
    }

    function getDriversByLogisticOperator(logisticOperatorID) {
        var url = 'api/driveradmin/getbylogisticoperator',
          config = {
              logisticOperatorID: logisticOperatorID
          };

        return UrlHelper.get(url, config);
    }
    

  }
})();
