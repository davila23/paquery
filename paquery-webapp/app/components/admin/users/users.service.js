(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('UsersAdminService', UsersAdminService);

    UsersAdminService.$inject = ['UrlHelper'];

    function UsersAdminService(UrlHelper) {
        var factory = {
            getUserAmount: getUserAmount,
            create: create,
            update: update,
            getValidCode: getValidCode,
            reSendValidCode: reSendValidCode,
        };

        return factory;

        function create(authMode, name, lastName, email, ammount, role, country, city, logisticOperatorId, marketplaceId, mobile, password, photo, photoName, TermsAndConditions,paqueryPointId) {
            var url = 'api/customeradmin/create',
                config = {
                    AuthMode: authMode,
                    Name: name,
                    LastName: lastName,
                    Email: email,
                    Ammout: ammount,
                    UserRoleID: role,
                    CountryID: country,
                    CityID: city,
                    Pwd: password,
                    Mobile: mobile,
                    Avatar: photoName,
                    AvatarImg: photo,
                    LogisticOperatorID: logisticOperatorId,
                    MarketplaceId: marketplaceId,
                    TermsAndConditions : TermsAndConditions,
                    paqueryPointID:paqueryPointId
                };

            return UrlHelper.post(url, config);
        }

        function update(userId, name, lastName, email, ammount, role, countryId, cityId, logisticOperatorId, marketplaceId, mobile, password, photo, photoName, TermsAndConditions,paqueryPointId) {
            var url = 'api/customeradmin/update',
                config = {
                    ID: userId,
                    Name: name,
                    LastName: lastName,
                    Email: email,
                    Ammout: ammount,
                    UserRoleID: role,
                    CountryID: countryId,
                    CityID: cityId,
                    Pwd: password,
                    Mobile: mobile,
                    Avatar: photoName,
                    AvatarImg: photo,
                    LogisticOperatorID: logisticOperatorId,
                    MarketplaceId: marketplaceId,
                    TermsAndConditions: TermsAndConditions,
                    paqueryPointID:paqueryPointId
                };

            return UrlHelper.post(url, config);
        }

        function getUserAmount(userID) {
            var url = 'api/customeradmin/getamount',
                config = {
                    userID: userID
                };

            return UrlHelper.get(url, config);
        }

        function getValidCode(userID) {
          var url = 'api/customeradmin/getvalidationcode',
              config = {
                userID: userID
              };

          return UrlHelper.get(url, config);
        }

        function reSendValidCode(userID) {
          var url = 'api/customeradmin/resendvalidationcode?userID='+userID;
          return UrlHelper.post(url);
        }

    }
})();
