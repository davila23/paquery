PaQuery
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/admin/dashboard');

        $stateProvider
        // -- FRONT --
            .state("frontLogin", {
                url: "/front/login",
                templateUrl: 'components/front/login/login.html',
                controller: 'FrontLoginController',
                controllerAs: 'vm',
                params: {
                    registedUser: null
                }
            })

            // -- REGISTRATION -- //
            .state("frontRegister", {
                url: "/front/register?code",
                templateUrl: 'components/front/register/register.html',
                controller: 'FrontRegisterController',
                controllerAs: 'vm',
                params: {
                    user: null,
                    code: null
                }
            })
            // -- RECOVERY PASS -- //
            .state("adminRecoveryPassword", {
                url: "/admin/recovery",
                templateUrl: 'components/admin/recovery/recovery.html',
                controller: 'AdminRecoveryController',
                controllerAs: 'vm',
                params: {
                    user: null
                }
            })
            .state("adminRecoveryCode", {
                url: "/admin/recoverypassword?code",
                templateUrl: 'components/admin/recovery/recoveryCode/recoveryCode.html',
                controller: 'AdminRecoveryCodeController',
                controllerAs: 'vm',
                params: {
                    code: null
                }
            })
            .state("recoveryPassword", {
                url: "/front/recovery",
                templateUrl: 'components/front/recovery/recovery.html',
                controller: 'RecoveryController',
                controllerAs: 'vm',
                params: {
                    user: null
                }
            })
            .state("frontRecoveryCode", {
                url: "/front/recoverypassword?code",
                templateUrl: 'components/front/recovery/recoveryCode/recoveryCode.html',
                controller: 'FrontRecoveryCodeController',
                controllerAs: 'vm',
                params: {
                    code: null
                }
            })
            // -- VALIDATION CODE -- //
            .state("frontValidateCode", {
                url: "/front/validateCode",
                templateUrl: 'components/front/register/validateCode/validateCode.html',
                controller: 'FrontValidationCodeController',
                controllerAs: 'vm',
                params: {
                    user: null
                }
            })
            .state("frontCompleteLogin", {
                url: "/front/completeLogin",
                templateUrl: 'components/front/login/SocialLogin/loginSocial.html',
                controller: 'LoginSocialController',
                controllerAs: 'vm',
                params: {
                    user: null
                }
            })
            .state("frontTrackPackage", {
                url: "/front/trackPackage",
                templateUrl: 'components/front/tracking/trackPackage.html',
                controller: 'FrontTrackPackageController',
                controllerAs: 'vm',
                params: {
                    user: null
                },
                data: {
                    permission: null
                }
            })

            // -- FRONT --
            .state("front", {
                url: '/front',
                abstract: true,
                templateUrl: 'components/shared/home/home.html',
                data: {
                    permission: 'front'
                }
            })
            .state("front.dashboard", {
                url: '/dashboard',
                templateUrl: 'components/front/packages/packages/packages.html',
                controller: 'FrontPackagesController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.trackPackage", {
                url: "/front/track-package",
                templateUrl: 'components/front/tracking/trackPackage.html',
                controller: 'FrontTrackPackageController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.history", {
                url: '/history',
                templateUrl: 'components/front/packages/packagesHistory/packagesHistory.html',
                controller: 'FrontPackagesHistoryController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.viewPackage", {
                url: '/view_packages',
                templateUrl: 'components/front/packages/package/package.html',
                controller: 'FrontViewPackageController',
                controllerAs: 'vm',
                params: {
                    obj: null
                },
                data: {
                    permission: 'front'
                }
            })
            .state("front.statusPackage", {
                url: '/status_packages',
                templateUrl: 'components/front/packages/packageStatus/packageStatus.html',
                controller: 'FrontPackageStatusController',
                controllerAs: 'vm',
                params: {
                    obj: null
                },
                data: {
                    permission: 'front'
                }
            })
            .state("front.addresses", {
                url: '/addresses',
                templateUrl: 'components/front/addresses/addresses.html',
                controller: 'FrontAddressesController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.newAddresses", {
                url: '/new_address',
                templateUrl: 'components/front/addresses/newAddress/newAddress.html',
                controller: 'FrontNewAddress',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.sendPackage", {
                url: '/send-package',
                templateUrl: 'components/front/sendPackage/sendPackage.html',
                controller: 'FrontSendPackageController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.receivePackage", {
                url: '/receive-package',
                templateUrl: 'components/front/receivePackage/receivePackage.html',
                controller: 'FrontReceivePackageController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            .state("front.notification", {
                url: '/notification',
                templateUrl: 'components/front/notifications/notification/notification.html',
                controller: 'FrontNotificationController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                },
                params: {
                    notification: null
                }
            })
            .state("front.profile", {
                url: '/profile',
                templateUrl: 'components/front/profile/profile.html',
                controller: 'FrontProfileController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                },
                params: {
                    user: null
                }
            })
            .state("front.payments", {
                url: '/payments',
                templateUrl: 'components/front/payments/payments/payments.html',
                controller: 'FrontPaymentsController',
                controllerAs: 'vm',
                data: {
                    permission: 'front'
                }
            })
            // -- ADMINISTRATION --
            .state("adminLogin", {
                url: "/admin/login",
                templateUrl: 'components/admin/login/login.html',
                controller: 'AdminLoginController',
                controllerAs: 'vm'
            })
            .state("admin", {
                url: '/admin',
                abstract: true,
                templateUrl: 'components/shared/home/home.html',
                data: {
                    permission: 'admin'
                }
            })
            .state("common", {
                abstract: true,
                templateUrl: 'components/shared/home/home.html',
            })
            .state("admin.dashboard", {
                url: "/dashboard",
                templateUrl: 'components/admin/dashboard/dashboard.html',
                controller: 'AdminDashboardController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.user", {
                url: '/user',
                templateUrl: 'components/admin/users/user/user.html',
                controller: 'AdminUserController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    user: null,
                    action: null
                },
                cache: false
            })
            .state("admin.users", {
                url: '/users',
                templateUrl: 'components/admin/users/users/users.html',
                controller: 'AdminUsersController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.driver", {
                url: '/driver',
                templateUrl: 'components/admin/drivers/driver/driver.html',
                controller: 'AdminDriverController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    driver: null
                }
            })
            .state("admin.drivers", {
                url: '/drivers',
                templateUrl: 'components/admin/drivers/drivers/drivers.html',
                controller: 'AdminDriversController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.workzone", {
                url: '/workzone',
                templateUrl: 'components/admin/workzone/workzone/zone.html',
                controller: 'AdminWorkZoneController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    workzone: null
                }
            })

            .state("admin.zones", {
                url: '/zones',
                templateUrl: 'components/admin/zone/zones/zones.html',
                controller: 'AdminZonesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.zone", {
                url: '/zone',
                templateUrl: 'components/admin/zone/zone/zone.html',
                controller: 'AdminZoneController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    zone: null
                }
            })

            .state("admin.distributionZone", {
                url: '/distributionZone',
                templateUrl: 'components/admin/distributionZone/distributionZone/distributionZone.html',
                controller: 'AdminDistributionZoneController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    distributionZone: null
                }
            })

            .state("admin.distributionZones", {
                url: '/distributionZones',
                templateUrl: 'components/admin/distributionZone/distributionZones/distributionZones.html',
                controller: 'AdminDistributionZonesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })


            .state("admin.workzones", {
                url: '/workzones',
                templateUrl: 'components/admin/workzone/workzones/zones.html',
                controller: 'AdminWorkZonesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.driversMap", {
                url: '/paquers-map',
                templateUrl: 'components/admin/drivers/driversMap/driversMap.html',
                controller: 'DriversMapController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            /*Se agrega route de PaquryPoints*/
            .state("admin.paqueryPoint", {
                url: '/paqueryPoint',
                templateUrl: 'components/admin/paqueryPoints/paqueryPoint/paqueryPoint.html',
                controller: 'AdminPaqueryPointController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    paqueryPoint: null
                }
            })
            .state("admin.paqueryPoints", {
                url: '/paqueryPoints',
                templateUrl: 'components/admin/paqueryPoints/paqueryPoints/paqueryPoints.html',
                controller: 'AdminPaqueryPointsController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            /*------------------*/

            .state("admin.marketplace", {
                url: '/marketplace',
                templateUrl: 'components/admin/marketplaces/marketplace/marketplace.html',
                controller: 'AdminMarketplaceController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    marketplace: null
                }
            })
            .state("admin.marketplaces", {
                url: '/marketplaces',
                templateUrl: 'components/admin/marketplaces/marketplaces/marketplaces.html',
                controller: 'AdminMarketplacesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.logisticOperator", {
                url: '/logisticOperator',
                templateUrl: 'components/admin/logisticOperators/logisticOperator/logisticOperator.html',
                controller: 'AdminLogOpController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    logisticOperator: null
                }
            })
            .state("admin.logisticOperators", {
                url: '/logisticOperators',
                templateUrl: 'components/admin/logisticOperators/logisticOperators/logisticOperators.html',
                controller: 'AdminLogOpsController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.notification", {
                url: '/notification',
                templateUrl: 'components/admin/notifications/notification/notification.html',
                controller: 'AdminNotificationController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    notification: null
                }
            })
            // .state("admin.notifications", {
            //   url: '/notifications',
            //   templateUrl: 'components/admin/notifications/notifications/notifications.html',
            //   controller: 'AdminNotificationsController',
            //   controllerAs: 'vm',
            //   data: {
            //     permission: 'admin'
            //   }
            // })
            // .state("admin.package", {
            //   url: '/package',
            //   templateUrl: 'components/admin/packages/package/package.html',
            //   controller: 'AdminPackageController',
            //   controllerAs: 'vm',
            //   data: {
            //     permission: 'admin'
            //   }
            // })
            .state("admin.viewPackage", {
                url: '/view_packages',
                templateUrl: 'components/admin/packages/package/package.html',
                controller: 'AdminViewPackageController',
                controllerAs: 'vm',
                params: {
                    obj: null,
                    previusUrl: null
                },
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.statusPackage", {
                url: '/status_packages',
                templateUrl: 'components/admin/packages/packageStatus/packageStatus.html',
                controller: 'AdminPackageStatusController',
                controllerAs: 'vm',
                params: {
                    obj: null
                },
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.sendPackage", {
                url: '/send-package',
                templateUrl: 'components/admin/sendPackage/sendPackage.html',
                controller: 'AdminSendPackageController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.receivePackage", {
                url: '/receive-package',
                templateUrl: 'components/admin/receivePackage/receivePackage.html',
                controller: 'AdminReceivePackageController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.packages", {
                url: '/packages',
                templateUrl: 'components/admin/packages/packages/packages.html',
                controller: 'AdminPackagesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.packageswithoutzone", {
                url: '/packages-withoutzone',
                templateUrl: 'components/admin/packages/packagesWithoutZone/packages.html',
                controller: 'AdminPackagesWithoutZoneController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.packagesHistory", {
                url: '/packages-history',
                templateUrl: 'components/admin/packages/packagesHistory/packagesHistory.html',
                controller: 'AdminPackagesHistoryController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    isPaquerView: 'false'
                }
            })
            .state("admin.packagesMap", {
                url: '/packages-map',
                templateUrl: 'components/admin/packages/packagesMap/packagesMap.html',
                controller: 'PackagesMapController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })

            // PICK UP
            .state("admin.pickupPackages", {
                url: '/pickup-packages',
                templateUrl: 'components/admin/pickup/pickupPackages/pickupPackages.html',
                controller: 'PickupPackagesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.pickupHistory", {
                url: '/pickup-history',
                templateUrl: 'components/admin/pickup/pickupHistory/pickupHistory.html',
                controller: 'PickupHistoryController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.viewPickupPackage", {
                url: '/view_pickup-packages',
                templateUrl: 'components/admin/pickup/pickupPackage/package.html',
                controller: 'PickupViewController',
                controllerAs: 'vm',
                params: {
                    obj: null,
                    previusUrl: null
                },
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.massUploadPickup", {
                url: '/massUploadPickup',
                templateUrl: 'components/admin/pickup/massUploadPickup/massUploadPickup.html',
                controller: 'MassUploadPickupController',
                data: {
                    permission: 'admin'
                }//,
                // params: {
                //     isUpdate: 'false'
                // }
            })
            // PICK UP

            .state("admin.vehicle", {
                url: '/vehicle',
                templateUrl: 'components/admin/vehicles/vehicle/vehicle.html',
                controller: 'AdminVehicleController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                },
                params: {
                    vehicle: null
                }
            })
            .state("admin.vehicles", {
                url: '/vehicles',
                templateUrl: 'components/admin/vehicles/vehicles/vehicles.html',
                controller: 'AdminVehiclesController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.logs", {
                url: '/logs',
                templateUrl: 'components/admin/logs/logs/logs.html',
                controller: 'AdminLogsController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.payments", {
                url: '/payments',
                templateUrl: 'components/admin/payments/payments/payments.html',
                controller: 'AdminPaymentsController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("admin.trackPackage", {
                url: '/track-package',
                templateUrl: 'components/admin/tracking/trackPackage.html',
                controller: 'AdminTrackPackageController',
                controllerAs: 'vm',
                data: {
                    permission: 'admin'
                }
            })
            .state("common.shops", {
                url: '/shops',
                templateUrl: 'components/shared/shops/shops.html',
                controller: 'ShopsController',
                data: {
                    permission: 'common'
                }
            })
            .state("admin.massUpload", {
                url: '/massUpload',
                templateUrl: 'components/admin/massUpload/massUpload.html',
                controller: 'MassUploadController',
                data: {
                    permission: 'admin'
                },
                params: {
                    isUpdate: 'false'
                }
            })

    });
