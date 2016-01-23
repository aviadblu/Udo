angular.module('udo.controllers')
    .controller('SCtrl', ['$timeout', '$state', 'TasksService', function($timeout, $state, TasksService){
        //console.log(openTasks);
        var ctrl = this;
        var map, autocomplete, markers = [];

        ctrl.loading = true;
        ctrl.radius = 2;
        ctrl.tasks = [];
        ctrl.address = $state.params.address;

        var currLocation = [parseFloat($state.params.latitude), parseFloat($state.params.longitude)];


        var mapStyles = [{
          featureType: "all",
          stylers: [
            { saturation: -40 }
          ]
        },{
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            { hue: "#00C3BF" },
            { saturation: 50 }
          ]
        },{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }];

        var mapProp = {
            styles: mapStyles,
            zoom: 13,
            center: new google.maps.LatLng($state.params.latitude, $state.params.longitude),
            disableDefaultUI: true,
            draggable: true,
            //zoomControl: false,
            //scrollwheel: false,
            //disableDoubleClickZoom: true
        };

        var initMap = function() {
          autocomplete = new google.maps.places.Autocomplete(document.getElementById("mapSearch"),{types: ['geocode']});
          map = new google.maps.Map(document.getElementById("mapContainer"), mapProp);
          ctrl.tasks.forEach(function(task){
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(parseFloat(task.location_latitude), parseFloat(task.location_longitude)),
                //icon: markerIcon,
                label: {
                  text: 'some text'
                }

            });
          });
        };



        ctrl.init = function() {
          $timeout(function(){
            TasksService.getOpenTasks()
            .then(function(response){
              allTasks = response.data;
              ctrl.tasks = TasksService.updateDistance(currLocation, allTasks, ctrl.radius);
              initMap();
            });
          }, 1500);
        };



    }]);
