(function() {
    angular.module('PaQuery')
        .controller('FrontPackagesController', FrontPackagesController);

    FrontPackagesController.$inject = ['$scope', '$state', 'FrontPackageService']

    function FrontPackagesController($scope, $state, FrontPackageService) {
        var vm = this;
        angular.extend(vm, {
            getPackages: FrontPackageService.getPackage,
            isScheduled: false,
            cancelPackage: cancelPackage,
            loadPackage: loadPackage,
            resetTableValues: resetTableValues,
            tabSelected: 'schedule'
        });

        init();

        function init() {
            getPackagesStatus();
            resetTableValues('schedule');
            vm.cardContent = "";

        }

        function cancelPackage(object, index, data) {
            FrontPackageService.cancelPackage(object.id).then(function(response) {
                data = data.splice(index, 1);
            }, function(error) {
                console.log(error);
            });
        }

        function loadPackage(object, bol) {
            var photo = object.avatar;
            FrontPackageService.loadPackage(object.id).then(function(response) {
                response.data.photo = photo;
                $state.go('front.viewPackage', { obj: response.data });
            }, function(error) {
                console.log(error);
            });
        }

        function getPackagesStatus() {
            FrontPackageService.getPackagesStatus()
                .then(function(response) {
                    vm.packagesStatus = response.data.filter(function(item) {
                        return item.name !== 'Cancelado' && item.name !== 'Entregado';
                    });
                    vm.packagesStatus.unshift( { name:"Todos", value: undefined });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function resetTableValues(tabSelected) {
            vm.tabSelected = tabSelected;
            if (tabSelected === 'schedule') {
                vm.isScheduled = true;
            } else {
                vm.isScheduled = false;
            }
        }
    }
})();
