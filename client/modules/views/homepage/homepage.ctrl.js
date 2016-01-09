angular.module('udo.controllers')
    .controller('HomepageCtrl', ['$timeout', 'principal', 'user', function ($timeout, principal, user) {
        var ctrl = this;
        ctrl.user = user;


        //////////////////////// home page slider
        //.splash-container
        var delay = 15000;
        var images = [
          'assets/img/hp-slides/bg1.jpg',
          'assets/img/hp-slides/bg2.jpg',
          'assets/img/hp-slides/bg3.jpg',
          'assets/img/hp-slides/bg4.jpg'
        ];
        // rand first slide
        var counter = Math.floor((Math.random() * images.length - 1) + 1);
        function increaseCounter() {
          counter++;
          if(counter >= images.length -1) {
            counter = 0;
          }
        }
        $('.splash-container').css('background-image', 'url(' + images[counter] + ')');
        increaseCounter();

        function slide() {
          var img = images[counter];
          $('.splash-container').fadeTo(250, 0.1, function() {
              $(this).css('background-image', 'url(' + img + ')');
          }).fadeTo('slow', 1);
          increaseCounter();
          $timeout(slide,delay);
        }
        $timeout(slide,delay);
        //////////////////////// home page slider end

    }]);
