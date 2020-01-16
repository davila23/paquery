$(function () {

    var connection = $.hubConnection("/websocket", { useDefaultPath: false });

    var packageHub = connection.createHubProxy('packageHub');

    packageHub.on('send', function (message) {
        console.log(message);
    });

    var mainHub = connection.createHubProxy('mainHub');

    mainHub.on('send', function (message) {
        console.log(message);
    });

    //$.connection.hub.url = "/websocket"
    connection.start().done(init).fail(fail);

    // Start the connection
    //$.connection.hub.start()
    //    .then(init)
    //    .then(function () {

    //    })
    //    .done(function (state) {
    //        if (state === 'Open') {

    //        } else {

    //        }
    //    });

    function init() {
        console.log('Conexión ok. ID = ' + connection.id);

        //var packageHub = $.connection.packageHub;

        //packageHub.client.hello = function () {
        //    console.log("hello");
        //};
    }

    function fail() {
        console.log('Error de conexión');
    }
});