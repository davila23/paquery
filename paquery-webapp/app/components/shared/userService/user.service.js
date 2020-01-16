(function() {
    'use strict';
    angular.module('PaQuery')
        .factory('UserService', UserService);

    UserService.$inject = ['UrlHelper'];

    function UserService(UrlHelper) {
        var factory = {
            create: create,
            update: update,
            deleteCustomer: deleteCustomer,
            getUsers: getUsers,
            getUser: getUser,
            getUserRoles: getUserRoles,
            getUserTypes: getUserTypes,
            setMobileNumber: setMobileNumber,
            allUserRoles: allUserRoles
        };

        return factory;

        function create(authMode, name, lastName, email, ammount, type, country, city, mobile, password, avatar) {
            var url = 'api/customer/create',
                config = {
                    AuthMode: authMode,
                    Name: name,
                    LastName: lastName,
                    Email: email,
                    Ammout: ammount,
                    UserTypeID: type,
                    CountryID: country,
                    CityID: city,
                    Pwd: password,
                    Mobile: mobile,
                    Avatar: avatar
                };

            return UrlHelper.post(url, config);
        }

        function update(userId, name, lastName, email, ammount, type, countryId, cityId, mobile, password, photo, photoName) {
            var url = 'api/customer/update',
                config = {
                    ID: userId,
                    Name: name,
                    LastName: lastName,
                    Email: email,
                    Ammout: ammount,
                    UserTypeID: type,
                    CountryID: countryId,
                    CityID: cityId,
                    Pwd: password,
                    Mobile: mobile,
                    Avatar: photoName,
                    AvatarImg: photo
                };

            return UrlHelper.post(url, config);
        }

        function deleteCustomer(customerId) {
            var url = 'api/customeradmin/delete',
              config={
                id: customerId
              };

            return UrlHelper.delete(url, config);
        }

        function getUsers(page, take, desc, isScheduled, userId, search, status, orderBy, userType, userRol) {
            var url = 'api/customeradmin/getall',
                config = {
                    page: page,
                    take: take,
                    desc: desc,
                    search: search ? search : null,
                    status: status ? status : null,
                    userType: userType,
                    userRol: userRol
                };


            return UrlHelper.get(url, config);
        }


        function getUser(userId) {
            var url = 'api/customeradmin/get/' + userId;

            return UrlHelper.get(url);
        }

        function getUserRoles() {
            var url = 'api/apptype/userrole';

            return UrlHelper.get(url);
        }

        //function getUserRoles() {
        //    var url = 'api/apptype/customerstatus';

        //    return UrlHelper.get(url);
        //}

        function getUserTypes() {
            var url = 'api/apptype/usertype';

            return UrlHelper.get(url);
        }


        function setMobileNumber(userId, number) {
            var url = 'api/customer/setmobilenumber',
                config = {
                    ID: userId,
                    Mobile: number
                };

            UrlHelper.post(url, config);
        }

        function registerUser(name, lastName, email, password, mobile) {
            var url = 'api/accountadmin/register',
                config = {
                    Name: name,
                    Email: email,
                    lastName: lastName,
                    Mobile: mobile,
                    Pwd: password
                };

            return UrlHelper.post(url, config);
        }

        function allUserRoles ()
        {
            return {
                Administrador: { id: 1 },
                Cliente: { id: 2 },
                AdministradorOPL: { id: 3 },
                OperadorOPL: { id: 4 },
                AdministradorMP: { id: 5 },
                OperadorMP: { id: 6 },
                AdministradoraqueryPoint: { id: 7},
                OperadorPaqueryPoint: { id: 8}
            }

        }
        

    }
})();
