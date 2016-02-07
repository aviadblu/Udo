angular.module('udo.controllers')
    .controller('SCtrl', ['$scope', '$window', '$timeout', '$state', '$uibModal', 'TasksService', function ($scope, $window, $timeout, $state, $uibModal, TasksService) {
        //console.log(openTasks);
        var ctrl = this;
        var map, autocomplete, markers = [];

        ctrl.loading = true;
        ctrl.radius = 2;
        ctrl.tasks = [];
        ctrl.address = $state.params.address;

        var currLocation = [parseFloat($state.params.latitude), parseFloat($state.params.longitude)];

        function focusTask(taskID) {
            var index = _.findIndex(ctrl.tasks, {'id': taskID});
            var task = ctrl.tasks[index];
            var element = angular.element(".task[task-id=" + taskID + "]");

            element.addClass("highlight");
            $timeout(function () {
                element.removeClass("highlight");
            }, 2000);

        }


        var mapStyles = [
            {
                featureType: "all",
                stylers: [
                    {saturation: -40}
                ]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    {hue: "#00C3BF"},
                    {saturation: 50}
                ]
            }, {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            }
        ];

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

        ctrl.getPrice = function (pricing_rate, pricing_calc) {
            return '<span class="price">$' + pricing_rate + (pricing_calc === "hour" ? '<span class="extraData">(hour)</span>' : '') + '</span>';
        };

        var initMap = function () {
            autocomplete = new google.maps.places.Autocomplete(document.getElementById("mapSearch"), {types: ['geocode']});
            map = new google.maps.Map(document.getElementById("mapContainer"), mapProp);
            // search location
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(currLocation[0], currLocation[1]),
                icon: 'http://www.google.com/mapfiles/arrow.png'
            });
            ctrl.tasks.forEach(function (task) {
                var field = JSON.parse(task.field);
                var marker = new MarkerWithLabel({
                    map: map,
                    position: new google.maps.LatLng(parseFloat(task.location_latitude), parseFloat(task.location_longitude)),
                    icon: field.icon,
                    labelContent: ctrl.getPrice(task.pricing_rate, task.pricing_calc),
                    labelAnchor: new google.maps.Point(22, 0),
                    labelClass: "labels", // the CSS class for the label
                    labelStyle: {opacity: 0.9},

                });

                google.maps.event.addListener(marker, "click", function (e) {
                    focusTask(task.id);
                });
            });
        };

        function initScroll() {
            $(".scroll-body").slimScroll({
                height: 'auto'
            });
        }

        ctrl.initDescScroll = function () {
            $timeout(function () {
                $(".desc-scroll").slimScroll({
                    height: 'auto'
                });
            }, 0);
        };


        ctrl.init = function () {
            $timeout(function () {
                TasksService.getOpenTasks()
                    .then(function (response) {
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

        ctrl.openTask = function(task) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/directives/upload-one/upload-one-modal.tpl.html',
                controller: 'uploadOneModalCtrl',
                controllerAs: 'ctrl',
                size: 'lg'
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                console.warn('Modal dismissed at: ' + new Date());
            });
        };


    }]);
