(function() {
 'use strict'

require.config({
    baseUrl: "components/front/addresses/module/",
    paths: {
            'factoryservice':'addresses.service',
            'controller':'addresses.controller'
    },
    waitSeconds: 15,
    shim: {

        'factoryservice':{
            exports:"factory"
        },
        'controller':{
            deps:["factoryservice"]
        }
    }
});

define(function(require){
    console.log(require);
    var controller= require(["controller"]);
console.log(controller);
});




})();