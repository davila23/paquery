(function() {
    'use strict';

    $("body").on("focusout", "input[validations]", function() {
        $(".data-tooltip").delay(3000).fadeOut('slow').remove();
        $(".textMessage").delay(1000).fadeOut('slow', function() {
            $(this).remove()
        });
    })

    angular.module('PaQuery')
        .controller('FrontAddressesController', FrontAddressesController)
        .controller('FrontNewAddress', FrontNewAddress)
        .directive('validations', Validation);
    Validation.$inject = ["$parse"]

    function Validation($parse) {
        return {
            restrict: 'A',
            require: "?ngModel",
            link: function(scope, element, attrs, controller) {
                var ngModelGet = $parse(attrs.ngModel);
                var data = ngModelGet(scope);
                var $parent = $(element).parent();
                scope.$watch(attrs.ngModel, function(uno, dos) {
                    uno = uno ? uno : "";
                    var text = false;
                    var bol = 0;
                    switch (attrs.vtype) {
                        case "1":
                            var message = "Solo letras admite este campo";
                            ngModelGet.assign(scope, uno.replace(/([0-9])+/g, ""));
                            bol = uno ? uno.search(/([0-9])+/g) : 0;
                            break;
                        case "2":
                            var message = "Solo numeros admite este campo";
                            ngModelGet.assign(scope, uno.replace(/[^0-9]/g, ""));
                            bol = uno ? uno.search(/[^0-9]/g) : 0;
                            break;
                        case "3":
                            var message = "El formato ingresado de correo es erroneo";
                            var success = "Correo electronico valido";
                            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            text = (re.test(uno));
                            break;
                    }

                    if (attrs.vtype != "3" && bol > 0) { setTooltip(message) }
                    if (attrs.vtype == "3" && uno && !text) { setTextMessage(message) }
                    if (attrs.vtype == "3" && uno && text) { setTextMessage(success, true) }
                }, true);

                function setTooltip(message) {
                    $(element).parent().append($("<div class='data-tooltip' >" + message + "</div>")).stop().delay(5000).queue(function(next) {
                        $("body .data-tooltip").stop().fadeOut("slow", function() {
                            $(this).remove();
                        });
                    });
                }

                function setTextMessage(message, bol) {
                    if (!$parent.find(".textMessage").length) {
                        $parent.append($("<div class='textMessage' ><p class='" + (!bol ? "dan" : "suc") + "'>" + message + "</p></div>"))
                    } else {
                        $parent.find(".textMessage p").addClass(!bol ? "dan" : "suc").removeClass(bol ? "dan" : "suc").html(message);
                    }
                }
            }
        }
    }

    FrontNewAddress.$inject = ['$scope', '$state', 'W3wSerice', 'AddressesService'];


    FrontAddressesController.$inject = ['$state', 'tableService', 'ngTableParams', '$filter', '$uibModal', 'AddressesService'];

    function FrontNewAddress($scope, $state, W3wSerice, AddressesService) {
        var vm = this;

        angular.extend(vm, {
            geoLocationAddress: geoLocationAddress,
            cardContent: 'origin',
            wizardStep: 2,
            destiny: {
                addressModel: {
                    title: '',
                    address: '',
                    coordinates: {
                        lat: undefined,
                        lng: undefined
                    }
                },
                w3w: ''
            },
            submit: submit
        });

        function geoLocationAddress() {
          navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            W3wSerice.getW3w(location.lat, location.lng).then(function(response) {
              debugger;
              vm.destiny.addressModel.w3w = response.data.words;
              angular.element("#w3w-destiny-input")[0].focus();
            })
          })
        }

        // $scope.$watch('vm.destiny.addressModel.coordinates', function(newValue) {
        //     if (newValue && newValue.lat && newValue.lng) {
        //         W3wSerice.getW3w(newValue.lat, newValue.lng)
        //             .then(function(response) {
        //                 vm.destiny.addressModel.w3w = response.data.words;
        //                 angular.element('#destiny-w3w-container').addClass('fg-toggled');
        //             });
        //     } else {
        //         vm.destiny.addressModel.w3w = '';
        //         angular.element('#destiny-w3w-container').removeClass('fg-toggled');
        //     }
        // }, true);


        function submit() {
            var scheduleOptions = {
                Name: vm.destiny.addressModel.title,
                Comment: vm.destiny.addressModel.comments,
                AddressDetail: vm.destiny.addressModel.address,
                GeoKey: vm.destiny.addressModel.w3w,
                Lat: vm.destiny.addressModel.location.lat,
                Lng: vm.destiny.addressModel.location.lng
            };
            AddressesService.actionsAddress(scheduleOptions)
                .then(function(response) {
                    $state.go('front.addresses');
                });


        }

    }

    function FrontAddressesController($state, tableService, ngTableParams, $filter, $uibModal, AddressesService) {
        var vm = this;

        angular.extend(vm, {
            getAddresses: AddressesService.getAddresses,
            deleteAddress: deleteAddress,
            editAddress: editAddress,
        });

        function deleteAddress(data, index, array) { 
          AddressesService.deleteAddress(data).then(function(){
            vm.tableSorting.data.splice(index, 1);    
          });
        }

        function modalInstances(address, animation, size, backdrop, keyboard, index, data) {
            var modalInstance = $uibModal.open({
                animation: animation,
                templateUrl: 'components/front/addresses/editAddress/editAddress.html',
                controller: 'EditAddressController',
                controllerAs: 'vm',
                size: size,
                backdrop: backdrop,
                keyboard: keyboard,
                resolve: {
                    address: function() {
                        return address;
                    }
                }

            });
            return modalInstance.result;
        }

        function editAddress(address, index, data) {
            modalInstances(address, true, '', 'static', index, data).then(function(exito) {
                data[index] = exito;
                $state.reload();
            }, function(error) {
                console.log(error);
            })
        }
    }

})();
