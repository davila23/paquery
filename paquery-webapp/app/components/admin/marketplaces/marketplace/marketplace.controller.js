(function() {
    'use strict';

    angular
        .module('PaQuery')
        .controller('AdminMarketplaceController', AdminMarketplaceController);

    AdminMarketplaceController.$inject = ['$state', '$stateParams', 'MarketplaceService', 'LogisticOperatorService'];


    function AdminMarketplaceController($state, $stateParams, MarketplaceService, LogisticOperatorService) {
        var vm = this;

        angular.extend(vm, {
            marketplace: $stateParams.marketplace || {},
            action: $stateParams.marketplace ? 'update' : 'create',
            save: save,
            logisticOperators: [],
            addlogisticOperator:addlogisticOperator,
            removeLO: removeLO
        });

        init();

        function init() {
          getLogisticsOperators();
          if (vm.action === 'create') {
            vm.marketplace.logisticOperators = [];
          }
        }

        function createMarket() {
          var idsMP = [];
          for (var mP of vm.marketplace.logisticOperators) {
            idsMP.push({ID:mP.id});
          }
          //MarketplaceService.create(vm.marketplace.name, vm.marketplace.detail, vm.published, idsMP,  vm.marketplace.photo)
          MarketplaceService.create(vm.marketplace.name, vm.marketplace.detail, vm.marketplace.published, idsMP,vm.marketplace.sendCustomerNotifications,vm.marketplace.stock)
              .then(function(response) {
                $state.go("admin.marketplaces");
              });
        }

        function updateMarket() {
          var idsMP = [];
          for (var mP of vm.marketplace.logisticOperators) {
            idsMP.push({ID:mP.id});
          }
          //MarketplaceService.update(vm.marketplace.id, vm.marketplace.name, vm.marketplace.detail, vm.marketplace.photo)
          MarketplaceService.update(vm.marketplace.id, vm.marketplace.name, vm.marketplace.detail, vm.marketplace.published, idsMP,vm.marketplace.sendCustomerNotifications,vm.marketplace.stock)
              .then(function(response) {
                  $state.go("admin.marketplaces");
              });
        }

        function save(form) {
          vm.checkSubmit = true;
          if (form.$valid) {
              if (vm.action === 'update') {
                updateMarket();
              }
              else {
                createMarket();
              }
          }
        }
        function getLogisticsOperators() {
            LogisticOperatorService.getAll(0, 0, true)
                .then(function(response) {
                  for (var logicOp of response.data) {
                    vm.logisticOperators;
                    vm.logisticOperators.push(logicOp);
                  }
                  vm.marketplace.logisticOperator=vm.logisticOperators[0];
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

        function addlogisticOperator() {
          if (vm.marketplace.logisticOperators.length) {
            for (var i = 0; i < vm.marketplace.logisticOperators.length; i++) {
              if(vm.marketplace.logisticOperator.id !== vm.marketplace.logisticOperators[i].id) {
                vm.errorOL = false;
              }else if(vm.marketplace.logisticOperator.id === vm.marketplace.logisticOperators[i].id) {
                vm.errorOL = "No se pueden ingresar Operadores Logicos iguales";
                return false;
              }
            }
            if (!vm.errorOP && vm.marketplace.logisticOperators.length < vm.logisticOperators.length) {
              vm.marketplace.logisticOperators.push(vm.marketplace.logisticOperator);
            }
          }else {
              vm.marketplace.logisticOperators.push(vm.marketplace.logisticOperator);
          }
        }

        function removeLO(elem) {
          vm.marketplace.logisticOperators.splice(vm.marketplace.logisticOperators.indexOf(elem),1);
        }

    }

})();
