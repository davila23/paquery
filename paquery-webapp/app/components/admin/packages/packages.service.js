(function() {
    'use strict';

    angular.module('PaQuery')
        .factory('PackagesService', PackagesService);

    PackagesService.$inject = ['UrlHelper', '$http', 'serverErrorsNotifier','ENDPOINT','SessionService'];

    function PackagesService(UrlHelper, $http, serverErrorsNotifier,ENDPOINT,SessionService) {
        var factory = {
            createPackage: createPackage,
            getPackage: getPackage,
            getPage: getPage,
            getPageWithoutZone:getPageWithoutZone,
            deletePackage: deletePackage,
            cancelPackage: cancelPackage,
            cancelPackageById: cancelPackageById,
            saveDelivery: saveDelivery,
            saveSend: saveSend,
            schedule: schedule,
            getShippingSchedule: getShippingSchedule,
            getAmount: getAmount,
            validateCode: validateCode,
            getPackageStatus: getPackageStatus,
            getNewPackageModel: getNewPackageModel,
            createPackageFromAdmin: createPackageFromAdmin,
            getPackagesSize: getPackagesSize,
            getPackagesTypes: getPackagesTypes,
            getPosiblePackagesStatus: getPosiblePackagesStatus,
            getPackagesStatus: getPackagesStatus,
            confirmCodeVerification: confirmCodeVerification,
            get_QR: get_QR,
            changeStatus: changeStatus,
            setRate: setRate,
            getDriverPackages: getDriverPackages,
            getPackagesHistory: getPackagesHistory,
            updatePackageFromAdmin: updatePackageFromAdmin,
            updatePackageFromAdminV2: updatePackageFromAdminV2,
            exportPdf: exportPdf,
            getHistoryDriverPackages: getHistoryDriverPackages,
            getPackageTraceRoute: getPackageTraceRoute,
            getDashboardPackages: getDashboardPackages,
            getToMap: getToMap,
            labelPackage: labelPackage
        };

        return factory;

        function labelPackage(paqueryPackage) {

            var url = 'api/packageadmin/' + paqueryPackage.id + '/generatelabel';

            var request = {
                method: 'GET',
                url: ENDPOINT + url,
                data: '',
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': SessionService.getTokenType() + ' ' + SessionService.getToken(),
                    'Accept': 'application/pdf'
                }
            };

            $http(request)
                .success(function (data, status, headers) {
                    console.log("process success");

                    headers = headers();

                    var contentType = headers['content-type'];

                    var linkElement = document.createElement('a');
                    try {
                        var blob = new Blob([data], {type: contentType});
                        var url = window.URL.createObjectURL(blob);

                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", "Paquetes.pdf");

                        var clickEvent = new MouseEvent("click",
                            {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                        linkElement.dispatchEvent(clickEvent);
                    } catch (ex) {
                        console.log(ex);
                    }

                })
                .error(function (e) {
                    var decodedString = String.fromCharCode.apply(null, new Uint8Array(e));
                    var obj = JSON.parse(decodedString);
                    var message = obj['message'];
                    serverErrorsNotifier.notify(message);
                    console.log("process error" + message)
                });
        }

        function createPackage(packageID) {
            var url = 'api/package/create',
                config = {
                    ID: packageID
                };

            return UrlHelper.post(url, config);
        }

        function createPackageFromAdmin(currentUser, packageType, description, comments, stimatedCost, externalPackageNumber, sellerCode, packageSize, packageStatus, destinyAddressInformation, originAddressInformation, destinyUser, originUser, photo, photoName, paquer, opl, attachment) {
            var url = 'api/packageadmin/create',
                config = {
                    Caption: description,
                    Detail: comments,
                    Avatar: photoName,
                    AdditionalCode: null,
                    PackageType: packageType,
                    PackageSize: packageSize.value,
                    UserID: currentUser.id,
                    Status: packageStatus,
                    AvatarImg: photo,
                    externalCode: externalPackageNumber,
                    //AvatarHeight: 0, future
                    //AvatarWidth: 0, future
                    DisplayOrder: null,
                    EstimatedCost: stimatedCost,
                    Rate: null,
                    Trace: getTraceModel(currentUser.id, destinyAddressInformation),
                    ShippingScheduleDestination: getShippingScheduleModel(destinyUser, destinyAddressInformation, packageType, paquer),
                    CreationDate: new Date(),
                    OwnerID: opl ? opl.id : null,
                    OwnerType: opl ? 'LogisticOperator' : null,
                    Attachment: attachment
                };

            if (packageType === 2) {
                config.ShippingScheduleOrigin = getShippingScheduleModel(originUser, originAddressInformation, packageType, paquer);
            }
            return UrlHelper.post(url, config);
        }


        function updatePackageFromAdmin(packageId, packageType, caption, detail, stimatedCost, externalPackageNumber, packageSize, packageStatus,rate, shippingScheduleDestination, shippingScheduleOrigin, reason) {
            var url = 'api/packageadmin/update',
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
                    ShippingScheduleOrigin: shippingScheduleOrigin ? getShippingScheduleToApi(shippingScheduleOrigin) : null,
                    Reason : reason
                };


            return UrlHelper.post(url, config);
        }

        function updatePackageFromAdminV2( {   packageId, packageType, caption, detail,
                                               stimatedCost, externalPackageNumber,
                                               packageSize, packageStatus,rate,
                                               shippingScheduleDestination, shippingScheduleOrigin, reason, signatureImage, signatureFileName }) {
            var url = 'api/packageadmin/update',
                config = {
                    Id: packageId,
                    Caption: caption,
                    Detail: detail,
                    PackageType: packageType,
                    PackageSize: packageSize,
                    Status: packageStatus,
                    ExternalCode: externalPackageNumber,
                    EstimatedCost: stimatedCost,
                    Rate: rate,
                    ShippingScheduleDestination: getShippingScheduleToApi(shippingScheduleDestination),
                    ShippingScheduleOrigin: shippingScheduleOrigin ? getShippingScheduleToApi(shippingScheduleOrigin) : null,
                    Reason : reason
                };

            if (signatureImage && signatureFileName) {
                config.signatureImage = signatureImage;
                config.signatureFileName = signatureFileName;
            }

            return UrlHelper.post(url, config);
        }

        function getShippingScheduleToApi(shippingSchedule) {
            return {
                ID: shippingSchedule.id,
                AddressDetail: shippingSchedule.addressDetail,
                Comment: shippingSchedule.comment,
                DestinationEmail: shippingSchedule.destinationEmail,
                ScheduledDate: moment(shippingSchedule.scheduledDate).add(3,'hours').format('YYYY-MM-DDTHH:mm:ss'), //''YYYY-MM-DDTHH:mm:ss+00:00'),
                Name: shippingSchedule.name,
                DriverID: shippingSchedule.driverID,
                DistributionZone: shippingSchedule.distributionZone,
                ShippingAddress: {
                    GeoKey: shippingSchedule.shippingAddress.geoKey,
                    AddressDetail: shippingSchedule.shippingAddress.addressDetail,
                    Comment: shippingSchedule.shippingAddress.comment
                }
            }
        }


        function deletePackage(packageId) {
            var url = 'api/packageadmin/delete/' + packageId;

            UrlHelper.post(url);
        }

        // I put isScheduled param because of the generic configuration
        // of the customPaginator component
        function getDriverPackages(page, take, desc, isScheduled, driverId, search, status, sortColumn, p9, p10, p11, p12, p13, p14, p15, p16, p17, searchRolled) {
            var url = 'api/packageadmin/getbydriverid',
                config = {
                    page: page,
                    take: take,
                    desc: desc,
                    driverID: driverId,
                    search:search,
                    sortColumn: sortColumn,
                    searchRolled: searchRolled
                };

            return UrlHelper.get(url, config);
        }


        function getHistoryDriverPackages(page, take, desc, isScheduled, driverId, search, status, sortColumn) {
            var url = 'api/packageadmin/getbydriveridhistory',
                config = {
                    page: page,
                    take: take,
                    desc: desc,
                    driverID: driverId,
                    search:search,
                    sortColumn: sortColumn
                };

            return UrlHelper.get(url, config);
        }


        function getDashboardPackages(page, take, desc, isScheduled, userId, search, filter, b, userType, userRole, startDate, endDate, marketPlace, deliveryTerm, status, assigned, notExpired) {
            var url = 'api/packageadmin/getdashboardpackages',
                config = {
                    page: page,
                    take: take,
                    assigned: assigned,
                    deliveryTerm: deliveryTerm,
                    status: status,
                    notExpired: notExpired
                };

            return UrlHelper.get(url, config);
        }

        //function updatePackageFromAdmin(packageId, userID, packageType, description, comments, sellerCode, packageSize, packageStatus) {
        //    debugger;
        //    var url = 'api/packageadmin/update',
        //        config = {
        //            id: packageId,
        //            Caption: description,
        //            Detail: comments,
        //            Avatar: 0,
        //            AdditionalCode: sellerCode,
        //            PackageType: packageType,
        //            PackageSize: packageSize,
        //            UserID: userID,
        //            Status: packageStatus,
        //            AvatarImg: '',
        //            ShippingSchedule: {},
        //            AvatarHeight: 0,
        //            AvatarWidth: 0,
        //            DisplayOrder: 0.0,
        //            Rate: 0,
        //            User: {},
        //            Trace: {}
        //        };
        //    return UrlHelper.post(url, config);
        //}

        // I put isScheduled param because of the generic configuration
        // of the customPaginator component
        function getPage(page, take, desc, isScheduled, userId, search, status, sortColumn, city, searchArrived) {
            var url = 'api/packageadmin/getall',
                config = {
                    page: page,
                    take: take,
                    desc: desc,
                    userID: userId,
                    status: status,
                    search:search,
                    sortColumn: sortColumn,
                    city: city,
                    searchArrived: searchArrived
                };
            if (!userId) {
                config.userID = 0;
            }

            return UrlHelper.get(url, config);
        }

        function getPageWithoutZone(page, take, desc, isScheduled, userId, search, status, sortColumn, city, searchArrived) {
            var url = 'api/packageadmin/getallwithoutzone',
                config = {
                    page: page,
                    take: take,
                    desc: desc,
                    userID: userId,
                    status: status,
                    search:search,
                    sortColumn: sortColumn,
                    city: city,
                    searchArrived: searchArrived
                };
            if (!userId) {
                config.userID = 0;
            }

            return UrlHelper.get(url, config);
        }

        function getToMap(city) {
            var url = 'api/packageadmin/gettomap',
                config = {
                    city: city
                };
            return UrlHelper.get(url, config);
        }

        function getPackage(id) {
            var url = 'api/packageadmin/get/',
                config = {
                    id: id
                };

            return UrlHelper.get(url, config);
        }



        function deletePackage(packageID) {
            var url = 'api/packageadmin/delete',
              config = {
                id: packageID
              };

            return UrlHelper.get(url, config);
        }

        function cancelPackageById(packageId) {
            var url = 'api/package/cancel',
                config = {
                    id: packageId
                };

            return UrlHelper.post(url, config);
        }

        function cancelPackage(packageModel) {
            var url = 'api/package/cancel',
                config = {
                    package: packageModel
                };

            return UrlHelper.post(url, config);
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

        function schedule(packageModel) {
            var url = 'api/package/schedule',
                config = {
                    package: packageModel
                };

            return UrlHelper.post(url, config);
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

        function setRate(packageId, rate) {
            var url = 'api/packageadmin/setrate',
                config = {
                    ID: packageId,
                    rate: rate
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

        function getPosiblePackagesStatus(packageId) {
            var url = 'api/packageadmin/getnextpackagestatus',
                config = {
                    id: packageId
                };

            return UrlHelper.get(url, config);
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

        function getShippingScheduleModel(user, addressInformation, scheduleType, paquer) {
            debugger;
            var model = {
                Name: user.completeName || '',
                DestinationEmail: user.email,
                Comment: user.comments,
                AddressDetail: addressInformation.address,
                ScheduledDate: addressInformation.immediately.status ? new Date() : addressInformation.immediately.date !== '' ? moment(addressInformation.immediately.date, 'DD/MM/YYYY hh:mm').format('YYYY-MM-DDTHH:mm:ss+00:00') : moment("1970/01/01", 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss+00:00'),
                ScheduledHour: null,
                IsImmediateDelivery: addressInformation.immediately.status,
                ExpirationDate: null,
                ScheduleType: scheduleType,
                UserPairCode: null,
                DriverPairCode: null,
                DriverID: paquer ? paquer.id : null,
                ShippingAddress: getNewShippingScheduleAddressModel(user, addressInformation),
                InsuranceCompanyID: null,
                Active: true,
                Deleted: false
            };

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
                Lng: addressInformation.coordinates ? addressInformation.coordinates.lng : addressInformation.location.lng,
                Lat: addressInformation.coordinates ? addressInformation.coordinates.lat : addressInformation.location.lat,
                CityID: null,
                Show: true,
                Active: true,
                Deleted: false
            };

            return model;
        }

        function getTraceModel(userID, addressInformation) {
            var model = {
                comment: addressInformation.comments,
                traceData: '',
                geoKey: addressInformation.w3w,
                lng: addressInformation.coordinates ? addressInformation.coordinates.lng : addressInformation.location.lng,
                lat: addressInformation.coordinates ? addressInformation.coordinates.lat : addressInformation.location.lat,
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

        function confirmCodeVerification(config) {
            var url = 'api/package/confirmusercode';

            return UrlHelper.post(url, config);
        }

        function get_QR(id) {
            var url = 'api/validation/GetQRCode',
                config = {
                    code: id
                };

            return UrlHelper.get(url, config);
        }

        function changeStatus(packageId, status) {
            var url = 'api/package/changestatus',
                config = {
                    ID: packageId,
                    status: status
                };

            return UrlHelper.post(url, config);
        }

        // I put isScheduled param because of the generic configuration
        // of the customPaginator component
        function getPackagesHistory(page, take, desc, isScheduled, userId, search, status, sortColumn, userType, userRole, from, to, marketplaceID) {
            var url = 'api/packageadmin/gethistory',
                config = {
                    page: page,
                    take: take,
                    desc: desc,
                    search:search,
                    sortColumn: sortColumn,
                    from: from ? from.format("MM/DD/YYYY") : from,
                    to: to ? to.format("MM/DD/YYYY") : to,
                    marketplaceID: marketplaceID
                };

            if (userId) {
                config.userID = userId;
            }

            return UrlHelper.get(url, config);
        }

        function exportPdf(request, $scope, filename, isUpdate)
        {
            // SEND THE FILES.
            $http(request)
                .success(function (data, status, headers) {
                    $scope.firstButtonOk = true;
                    $scope.secondButtonOk = false;
                    $scope.operacionConExito = true;
                    $scope.textoOperacion = 'El archivo se proceso con éxito';
                    console.log("process success" + data);

                    if (isUpdate)
                        return;

                    headers = headers();
                    if (!filename)
                    {
                        filename = "Paquetes.pdf";
                    }

                    var contentType = headers['content-type'];

                    var linkElement = document.createElement('a');
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);

                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", filename);

                        var clickEvent = new MouseEvent("click",
                            {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                        linkElement.dispatchEvent(clickEvent);
                    } catch (ex) {
                        console.log(ex);
                    }

                })
                .error(function (e) {
                    serverErrorsNotifier.notify(e.message);
                    console.log("process error" + e)
                });
        }

        function getPackageTraceRoute(packageID) {
            var url = 'api/geolocation/getpackagetraceroute',
                config = {
                    packageID: packageID
                };

            return UrlHelper.get(url, config);
        }

        // function getCSVExportByRange(dateFrom, dateTo){
        //
        //     var from = $filter('date')(dateFrom,'dd/MM/yyyy');
        //     var to = $filter('date')(dateTo,'dd/MM/yyyy');
        //
        //     var url = 'api/packagereport/exportbyrange',
        //         config = {
        //             from: dateFrom.getTime(),
        //             to: dateTo.getTime()
        //         };
        //
        //     $http.get(ENDPOINT + url, {params: config})
        //         .success(function(data) {
        //             var file = new Blob([data], { type: 'application/csv' });
        //             saveAs(file, 'filename.csv');
        //         });
        //
        // }
    }

})();
