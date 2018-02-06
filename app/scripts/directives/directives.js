(function( ng, app ){
    'use strict';

    app.directive('pccresize', function($window) {
        return {
            link: function(scope, elem, attrs) {
                scope.onResize = function() {
                    var bg = scope.getBgImage();
                    $('.full-bleed').css(bg);
                }
                scope.onResize();
                angular.element($window).bind('resize', function() {
                    scope.onResize();
                })
            }
        }
    });
})(angular, SPA);

