(function() {
    'use strict';
    angular
        .module('PaQuery')
        .directive('modalFrime', modalFrime);
        
    modalFrime.$inject = ['$sce'];
    function modalFrime($sce) {
        var directive = {
            restrict: 'E',
            link: function(scope){
                scope.link = $sce.trustAsResourceUrl(scope.url);
                console.log(scope)
            },
            templateUrl: "components/shared/modalFrime/modalFrime.html",
            scope: {
                url: '@'
            }
        };

        return directive;
    }
})();
