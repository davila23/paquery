(function() {
  'use strict';

  require("addresses.service");


  $("body").on("focusout","input[validations]",function() {
    $(".data-tooltip").delay(3000).fadeOut('slow').remove();
    $(".textMessage").delay(1000).fadeOut('slow',function() {
      $(this).remove()
    });
  })

  angular.module('PaQuery')
  .controller('FrontAddressesController', FrontAddressesController)
  .controller('FrontNewAddress', FrontNewAddress)
  .directive('validations', Validation);
  Validation.$inject=["$parse"]
  function Validation($parse){
    return {
      restrict: 'A',
      require: "?ngModel",
      link: function (scope, element, attrs, controller) {
        var ngModelGet = $parse(attrs.ngModel);
        var data=ngModelGet(scope);
        var $parent=$(element).parent();
        scope.$watch(attrs.ngModel, function (uno,dos) {
          uno=uno?uno:"";
          var text=false;
          var bol=0;
          switch(attrs.vtype){
            case "1":
            var message="Solo letras admite este campo";
            ngModelGet.assign(scope,uno.replace(/([0-9])+/g,""));
            bol = uno?uno.search(/([0-9])+/g):0;
            break;
            case "2":
            var message="Solo numeros admite este campo";
            ngModelGet.assign(scope,uno.replace(/[^0-9]/g,""));
            bol = uno?uno.search(/[^0-9]/g):0;
            break;
            case "3":
            var message="El formato ingresado de correo es erroneo";
            var success="Correo electronico valido";
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            text = (re.test(uno));
            break;
          }

          if (attrs.vtype!="3" && bol>0) {setTooltip(message)}
          if (attrs.vtype=="3" && uno && !text) {setTextMessage(message)}
          if (attrs.vtype=="3" && uno && text) {setTextMessage(success,true)}
          },true);
        function setTooltip(message) {
          $(element).parent().append($("<div class='data-tooltip' >"+message+"</div>")).stop().delay(5000).queue(function(next) {
            $("body .data-tooltip").stop().fadeOut("slow",function () {
              $(this).remove();
            });
          });
        }
        function setTextMessage(message,bol) {
          if (!$parent.find(".textMessage").length) {
            $parent.append($("<div class='textMessage' ><p class='"+(!bol?"dan":"suc")+"'>"+message+"</p></div>"))
          }else{
            $parent.find(".textMessage p").addClass(!bol?"dan":"suc").removeClass(bol?"dan":"suc").html(message);
          }
        }
      }
    }
  }

  FrontNewAddress.$inject = ['$scope', '$state', 'SessionService', 'W3wSerice', 'AddressesService'];
  FrontAddressesController.$inject = ['$state', 'SessionService', 'tableService', 'ngTableParams', '$filter', '$uibModal', 'AddressesService'];

  function FrontNewAddress($scope, $state, SessionService, W3wSerice, AddressesService) {
    var vm = this;

    angular.extend(vm, {
      cardContent: 'origin',
      wizardStep: 2,
      destiny: {
        addressModel: {
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

    $scope.$watch('vm.destiny.addressModel.coordinates', function(newValue) {
      if (newValue && newValue.lat && newValue.lng) {
        W3wSerice.getW3w(newValue.lat, newValue.lng)
        .then(function(response) {
          vm.destiny.addressModel.w3w = response.data.words;
          angular.element('#destiny-w3w-container').addClass('fg-toggled');
        });
      } else {
        vm.destiny.addressModel.w3w = '';
        angular.element('#destiny-w3w-container').removeClass('fg-toggled');
      }
    });


    function submit(data) {
      var destiny=angular.copy(data);
      var scheduleOptions = {
        Name: destiny.addressModel.name,
        Comment: destiny.addressModel.comments,
        AddressDetail: destiny.addressModel.address,
        W3w: destiny.addressModel.w3w,
        GeoKey: destiny.addressModel.w3w
      };
      scheduleOptions.Lat=destiny.addressModel.coordinates.lat;
      scheduleOptions.Lng=destiny.addressModel.coordinates.lng;
      AddressesService.actionsAddress({addressModel:scheduleOptions})
      .then(function(response) {
        console.log(response);
      });


    }

  }

  function FrontAddressesController($state, SessionService, tableService, ngTableParams, $filter, $uibModal, AddressesService) {
    var vm = this;

    angular.extend(vm, {
      getList: AddressesService.getAddresses,
      currentPage:1,
      currentCount:10,
      deleteAddress: deleteAddress,
    });
    init();

    function deleteAddress(id) {
      AddressesService.deleteAddress(id).then(function(exito) {
        console.log(exito);  
      }, function(error) {
        console.log(error);  
        
      });
    }

    function init() {
/*      var data = [{
        id: 1,
        comments: 'Timbre rojo',
        w3w: 'XXX',
        addressModel: {
          address: 'Colón 1520, Mar del Plata, Buenos Aires',
          coordinates: {
            lat: undefined,
            lng: undefined
          }
        },
        name: 'Casa'
      }, {
        id: 2,
        comments: '',
        w3w: 'XXX',
        addressModel: {
          address: 'Colón 1520, Mar del Plata, Buenos Aires',
          coordinates: {
            lat: undefined,
            lng: undefined
          }
        },
        name: 'Casa mamá'
      }, {
        id: 3,
        comments: 'Casa de rejas',
        w3w: 'XXX',
        addressModel: {
          address: 'Colón 1520, Mar del Plata, Buenos Aires',
          coordinates: {
            lat: undefined,
            lng: undefined
          }
        },
        name: 'Casa de fin de semana'
      }, {
        id: 1,
        comments: 'Justo en la esquina',
        w3w: 'XXX',
        addressModel: {
          address: 'Colón 1520, Mar del Plata, Buenos Aires',
          coordinates: {
            lat: undefined,
            lng: undefined
          }
        },
        name: 'Casa'
      }, {
        id: 1,
        comments: '',
        w3w: 'XXX',
        addressModel: {
          address: 'Colón 1520, Mar del Plata, Buenos Aires',
          coordinates: {
            lat: undefined,
            lng: undefined
          }
        },
        name: 'Casa'
      }];

      */
    }


    function modalInstances(address, animation, size, backdrop, keyboard,bol) {
      var modalInstance = $uibModal.open({
        animation: animation,
        templateUrl: 'components/front/addresses/'+(bol?"newAddress.html":"editAddress/editAddress.html"),
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
    }

    function editAddress(address) {
      modalInstances(address, true, '', 'static', true);
    }
    function newAddress(address) {
      modalInstances(address, true, '', 'static', true, true);
    }
  }

})();
