angular.module('udo.controllers')
    .controller('SCtrl', ['$scope','$window', '$timeout', '$state', 'TasksService', function($scope, $window, $timeout, $state, TasksService){
        //console.log(openTasks);
        var ctrl = this;
        var map, autocomplete, markers = [];

        ctrl.loading = true;
        ctrl.radius = 2;
        ctrl.tasks = [];
        ctrl.address = $state.params.address;

        var currLocation = [parseFloat($state.params.latitude), parseFloat($state.params.longitude)];

        function focusTask(taskID){
          console.log(taskID);
        }


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
            mapTypeId: google.maps.MapTypeId.ROADMAP
            //zoomControl: false,
            //scrollwheel: false,
            //disableDoubleClickZoom: true
        };

        //http://maps.google.com/mapfiles/kml/paddle/blu-blank.png

        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        var initMap = function() {
          autocomplete = new google.maps.places.Autocomplete(document.getElementById("mapSearch"),{types: ['geocode']});
          map = new google.maps.Map(document.getElementById("mapContainer"), mapProp);
          // search location
          var marker = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(currLocation[0], currLocation[1]),
              icon: 'http://www.google.com/mapfiles/arrow.png'
          });
          ctrl.tasks.forEach(function(task){
            var field = JSON.parse(task.field);
            console.log(task);
            var marker = new MarkerWithLabel({
                map: map,
                position: new google.maps.LatLng(parseFloat(task.location_latitude), parseFloat(task.location_longitude)),
                icon: field.icon,
                labelContent: "$" + task.pricing_rate + (task.pricing_calc === "hour" ? " (hour)" : ""),
               labelAnchor: new google.maps.Point(22, 0),
               labelClass: "labels", // the CSS class for the label
               labelStyle: {opacity: 0.9},

            });

            google.maps.event.addListener(marker, "click", function (e) { focusTask(task.id);});
          });
        };

        function initScroll() {
          $(".scroll-body").slimScroll({
              height: 'auto'
          });
        }


        ctrl.init = function() {
          $timeout(function(){
            TasksService.getOpenTasks()
            .then(function(response){
              allTasks = response.data;
              ctrl.tasks = TasksService.updateFieldAndDistance(currLocation, allTasks, ctrl.radius);
              initMap();
              initScroll();
              angular.element($window).bind('resize', function () {
                  initScroll();
              });
            });
          }, 1500);
        };







    }]);
