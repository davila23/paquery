/*angular
.module('PaQuery')
.directive('newgoogle', googleMap);

googleMap.$inject = ['$timeout', '$window', 'W3wSerice', '$q'];

function googleMap($timeout, $window, W3wSerice, $q) {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/shared/googleMapDirective/googleMap.html',
    link: function(scope, element, attrs) {


  scope.addMarkerDrop= function (marker) {
    var def=$q.defer();
    google.maps.event.addListener(marker,"dragend",function () {
      scope.geocoder.geocode({
        latLng: marker.getPosition()
      }, function(result) {
        console.log(result);
        marker.setPosition(result[0].geometry.location);
        scope.mapa.setCenter(result[0].geometry.location);
        def.resolve({marker:marker,googleResponse:result});
      });
    })
    return def.promise;
  }
  scope.createMarker= function (latLng,title,urlImg) {
    var mrk={
      position: latLng,
      map: scope.mapa,
      draggable:true,
      animation: google.maps.Animation.DROP,
    }
    if (title) {mrk.title=title;}
    if (scope.initconfig.img) {image.url=urlImg;mrk.icon=image;}

    var marker=new google.maps.Marker(mrk)
    scope.mapa.setCenter(marker.getPosition());
    marker.setMap(scope.mapa)

    scope.geocoder.geocode({
      latLng: latLng
    }, function(result) {
      console.log(result);

    });
    return marker;
  }


$timeout(function() {



    scope.initconfig={};
      scope.initconfig.num=1;
      $(element).find('#map').attr("id","map"+scope.initconfig.num);
      scope.initconfig.center= {lat: -38,lng: -57.605};
      scope.initconfig.center2= new google.maps.LatLng(-38,-67.605);
      scope.geocoder = new google.maps.Geocoder();
      scope.markers=[];
      console.log(scope.initconfig.center);
      scope.mapa= new google.maps.Map(document.getElementById("map"+scope.initconfig.num), {
        center: scope.initconfig.center,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var image = {
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };


      var marker=scope.createMarker(scope.initconfig.center,"hola mundo");
  scope.addMarkerDrop(marker).then(function(exito) {
    console.log(exito);
  }, function (error) {

  });

},1000);

}
}
}
*/
