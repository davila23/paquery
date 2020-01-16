(function() {
    'use strict';
    angular
        .module('PaQuery')
        .controller('PaginableSelectorController', PaginableSelectorController)


    PaginableSelectorController.$inject = ['$state', '$uibModalInstance', 'getListFunction', 'attributes', 'elementName', 'statusID', 'params'];

    function PaginableSelectorController($state, $uibModalInstance, getListFunction, attributes, elementName, statusID, params) {
        var vm = this;

        angular.extend(vm, {
            getList: getListFunction,
            filterList: filterList,
            attributes: attributes,
            titles: getTitles(attributes),
            elementName: elementName,
            status: statusID,
            ok: ok,
            cancel: cancel,
            deliveryTerm: params.deliveryTerm,
            status: params.status,
            assigned: params.assigned,
            notExpired: params.notExpired
        });

        function filterList(data) {
            return data.filter(function(item) {
                return item? item.active : false;
            });
        }

        function getTitles(attrs) {
            var retValue = [];
            for (var i = 0; i < attrs.length; i++) {
                retValue.push(attrs[i].title);
            }
            return retValue;
        }
        /*function editElement(element) {
          var editionInformation = {};
          editionInformation[editionState.stateElement] = element;
          $state.go(editionState.stateName, editionInformation);
        }*/

        function ok() {
            $uibModalInstance.close(vm.selectedElement);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();
