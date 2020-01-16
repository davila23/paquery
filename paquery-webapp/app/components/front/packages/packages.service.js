(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('FrontPackageService', FrontPackageService);

    FrontPackageService.$inject = ['UrlHelper'];

    function FrontPackageService(UrlHelper) {
        var factory = {
            create: create,
            deletePackage: deletePackage,
            cancelPackage: cancelPackage,
            saveDelivery: saveDelivery,
            saveSend: saveSend,
            schedule: schedule,
            getShippingSchedule: getShippingSchedule,
            getAmount: getAmount,
            changeStatus: changeStatus,
            validateCode: validateCode,
            getPackageStatus: getPackageStatus,
            getNewPackageModel: getNewPackageModel,
            getPackagesSize: getPackagesSize,
            getPackagesTypes: getPackagesTypes,
            getPackagesStatus: getPackagesStatus,
            getPackage: getPackage,
            get_QR: get_QR,
            confirmVerificationCode: confirmVerificationCode,
            loadPackage: loadPackage,
            getCalification: getCalification,
            getMpLink: getMpLink,
            getMpLinkByStatus: getMpLinkByStatus,
            getPackagesHistory: getPackagesHistory,
            updatePosition: updatePosition,
        };

        return factory;

        function updatePosition(id){
          var url = "api/package/updateposition?packageID=" + id;
          return UrlHelper.get(url);
        }

        function get_QR(id) {
            var url = 'api/validation/GetQRCode',
                config = {
                    code: id
                };

            return UrlHelper.get(url, config);
        }

        function getCalification(idShippingSchedule) {
            var url = 'api/package/getservicerate',
                config = {
                    idShippingSchedule: idShippingSchedule
                };

            return UrlHelper.get(url, config);
        }

        function confirmVerificationCode(config) {
            var url = 'api/package/confirmusercode';

            return UrlHelper.post(url, config);
        }

        function create(currentUser, packageType, caption, comments, estimatedCost, externalCode, packageSize, packageStatus, destinyAddressInformation, originAddressInformation, destinyUser, originUser, photo, photoName, PaymentID, attachment) {
            var url = 'api/package/create',
                config = {
                    PaymentID: PaymentID,
                    Caption: caption,
                    Detail: comments,
                    Avatar: photoName,
                    AdditionalCode: null,
                    PackageType: packageType,
                    PackageSize: packageSize,
                    UserID: currentUser.id,
                    Status: packageStatus,
                    AvatarImg: photo,
                    externalCode : externalCode,
                    //AvatarHeight: 0, future
                    //AvatarWidth: 0, future
                    DisplayOrder: null,
                    EstimatedCost: estimatedCost,
                    Rate: null,
                    Trace: getTraceModel(currentUser.id, destinyAddressInformation),
                    ShippingScheduleDestination: getShippingScheduleModel(destinyUser, destinyAddressInformation, packageType),
                    CreationDate: new Date(),
                    Attachment: attachment
                };

            if (packageType === 2) {
                config.ShippingScheduleOrigin = getShippingScheduleModel(originUser, originAddressInformation, packageType);
            }
            return UrlHelper.post(url, config);
        }

        function getMpLinkByStatus(packageID, packageStatus) {
            var url = 'api/payment/GetMPLink',
                config = {
                    ID: packageID,
                    status: packageStatus
                };

            return UrlHelper.post(url, config);
        }


        function getMpLink(currentUser, packageType, caption, comments, estimatedCost, packageSize, packageStatus, destinyAddressInformation, originAddressInformation, destinyUser, originUser, photo, photoName) {
            var url = 'api/payment/GetMPLink',
                config = {
                    Caption: caption,
                    Detail: comments,
                    Avatar: photoName,
                    AdditionalCode: null,
                    PackageType: packageType,
                    PackageSize: packageSize,
                    UserID: currentUser.id,
                    Status: packageStatus,
                    AvatarImg: photo,
                    //AvatarHeight: 0, future
                    //AvatarWidth: 0, future
                    DisplayOrder: null,
                    EstimatedCost: estimatedCost,
                    Rate: null,
                    Trace: getTraceModel(currentUser.id, destinyAddressInformation),
                    ShippingScheduleDestination: getShippingScheduleModel(destinyUser, destinyAddressInformation, packageType),
                    CreationDate: new Date()
                };

            if (packageType === 2) {
                config.ShippingScheduleOrigin = getShippingScheduleModel(originUser, originAddressInformation, packageType);
            }

            return UrlHelper.post(url, config);
        }


        function getShippingScheduleModel(user, addressInformation, scheduleType, id) {
            var model = {
                Name: user.completeName || '',
                DestinationEmail : user.email,
                Comment: user.comments,
                AddressDetail: addressInformation.address,
                ScheduledDate: addressInformation.immediately.status ? new Date() : addressInformation.immediately.date !== '' ? moment(addressInformation.immediately.date, 'DD/MM/YYYY hh:mm').format('YYYY-MM-DDTHH:mm:ss+00:00') : moment("1970/01/01", 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00'),
                ScheduledHour: null,
                IsImmediateDelivery: addressInformation.immediately.status,
                ExpirationDate: null,
                ScheduleType: scheduleType,
                UserPairCode: null,
                DriverPairCode: null,
                DriverID: null,
                ShippingAddress: getNewShippingScheduleAddressModel(user, addressInformation),
                InsuranceCompanyID: null,
                Active: true,
                Deleted: false
            };

            if (id) {
              model.ID = id;
            }
            debugger;
            return model;
        }

        function getNewShippingScheduleAddressModel(user, addressInformation) {
            var model = {
                Name: user.completeName,
                AddressDetail: addressInformation.address,
                Comment: addressInformation.comments,
                CreationDate: new Date(),
                ModificationDate: null,
                AddressType: null,
                GeoKey: addressInformation.w3w,
                Lng: addressInformation.location ? addressInformation.location.lng :addressInformation.location.lng,
                Lat: addressInformation.location ? addressInformation.location.lat :addressInformation.location.lat,
                CityID: null,
                Show: true,
                Active: true,
                Deleted: false
            };

            return model;
        }

        function getTraceModel(userID, addressInformation) {
          debugger;
            var model = {
                comment: addressInformation.comments,
                traceData: '',
                geoKey: addressInformation.w3w,
                lng: addressInformation.location ? addressInformation.location.lng :addressInformation.location.lng,
                lat: addressInformation.location ? addressInformation.location.lat :addressInformation.location.lat,
                creationDate: new Date(),
                approveDate: null,
                creationUserID: userID,
                createdBySystem: true,
                depotID: null,
                packageID: null,
                cityID: null,
                geolocationID: null,
                active: true,
                deleted: true
            };

            return model;
        }

        function getPackage(page, take, desc, schedule, userId, search, status, sortColumn, p9, p10, p11, p12, p13, p14, p15, p16, p17, searchRolled) {
            var url = 'api/package/getpage',
                config = {
                    page: page,
                    take: take,
                    isScheduled: schedule,
                    desc: desc,
                    search: search,
                    sortColumn: sortColumn,
                    searchRolled: searchRolled
                };

            return UrlHelper.get(url, config);
        }


        function deletePackage(packageID) {
            var url = 'api/package/delete/' + packageID;

            return UrlHelper.get(url);
        }

        function cancelPackage(id) {
            var url = 'api/package/cancel',
                config = {
                    id: id
                };
            return UrlHelper.post(url, config);
        }

        function loadPackage(id) {
            var url = 'api/package/load?id=' + id;
            return UrlHelper.get(url);
        }

        function saveDelivery(packageModel) {
            var url = 'api/package/savedelivery',
                config = {
                    package: packageModel
                };

            return UrlHelper.post(url, config);
        }

        function saveSend(packageModel) {
            var url = 'api/package/savesend',
                config = {
                    package: packageModel
                };

            return UrlHelper.post(url, config);
        }

        function scheduleOld(packageModel) {
            var url = 'api/package/schedule',
                config = packageModel;

            return UrlHelper.post(url, config);
        }

        function schedule(packageId, packageType, caption, detail, stimatedCost, externalPackageNumber, packageSize, packageStatus,rate, shippingScheduleDestination, shippingScheduleOrigin) {
            var url = 'api/package/schedule',
                config = {
                    Id: packageId,
                    Caption: caption,
                    Detail: detail,
                    PackageType: packageType,
                    PackageSize: packageSize,
                    Status: packageStatus,
                    ExternalCode: externalPackageNumber,
                    EstimatedCost: stimatedCost,
                    Rate:rate,
                    ShippingScheduleDestination: getShippingScheduleToApi(shippingScheduleDestination),
                    ShippingScheduleOrigin: shippingScheduleOrigin ? getShippingScheduleToApi(shippingScheduleOrigin) : null
                };


            return UrlHelper.post(url, config);
        }

        function getShippingScheduleToApi(shippingSchedule) {
            return {
                ID: shippingSchedule.id,
                AddressDetail: shippingSchedule.addressDetail,
                Comment: shippingSchedule.comment,
                DestinationEmail: shippingSchedule.destinationEmail,
                ScheduledDate: moment(shippingSchedule.scheduledDate).format('YYYY-MM-DDTHH:mm:ss'), //moment(shippingSchedule.scheduledDate, 'DD/MM/YYYY hh:mm').format('YYYY-MM-DDTHH:mm:ss+00:00'),
                Name: shippingSchedule.name,
                DriverID: shippingSchedule.driverID,
                ShippingAddress: {
                    GeoKey: shippingSchedule.shippingAddress.geoKey,
                    AddressDetail: shippingSchedule.shippingAddress.addressDetail,
                    Comment: shippingSchedule.shippingAddress.comment
                }
            }
        }

        function getShippingSchedule(packageID) {
            var url = 'api/package/getshippingschedule',
                config = {
                    packageID: packageID
                };

            return UrlHelper.post(url, config);
        }

        function getAmount(packageID) {
            var url = 'api/package/getamount/' + packageID;

            return UrlHelper.get(url);
        }

        function changeStatus(packageId, status) {
            var url = 'api/package/changestatus',
                config = {
                    ID: packageId,
                    status: status
                };

            return UrlHelper.post(url, config);
        }

        function validateCode(packageModel) {
            var url = 'api/package/ValidateCode',
                config = {
                    package: packageModel
                };

            return UrlHelper.post(url, config);
        }

        function getPackageStatus(packageID) {
            var url = 'api/apptype/packagestatus/' + packageID;

            return UrlHelper.get(url);
        }

        function getPackagesSize() {
            var url = 'api/apptype/packagesize';

            return UrlHelper.get(url);
        }

        function getPackagesTypes() {
            var url = 'api/apptype/packagetype';

            return UrlHelper.get(url);
        }

        function getPackagesStatus() {
            var url = 'api/apptype/Packagestatus';

            return UrlHelper.get(url);
        }

        function getNewPackageModel() {
            return {
                ID: 0,
                Caption: '',
                Detail: '',
                Avatar: 0,
                AdditionalCode: '',
                PackageType: {},
                PackageSize: {},
                UserID: 0,
                Status: '',
                AvatarImg: '',
                ShippingSchedule: {},
                AvatarHeight: 0,
                AvatarWidth: 0,
                DisplayOrder: 0.0,
                Rate: 0,
                User: {},
                Trace: {}
            }
        }

        function getPackagesHistory(page, take, desc, isScheduled, userId, search, status, sortColumn) {
          var url = 'api/package/gethistory',
              config = {
                  page: page,
                  take: take,
                  desc: desc,
                  search:search,
                  sortColumn: sortColumn
              };
            return UrlHelper.get(url, config);
        }
    }

})();
