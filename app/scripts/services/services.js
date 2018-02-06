(function( ng, app ){
    'use strict';

    app.factory('CampaignContentService', function($http) {
        return $http.get('/data/data.json');
        
    });

    app.factory('ContactService', function($http) {
        return {
            submit: function(msg) {
              window.location.href = CONTACT_SUBMIT_URL;
            }
        }
    });

    //global variables
    app.factory('global', function(){
        return {
            imgBaseUrl: BASE_IMG_URL,
            pageTitle: '',
            pageMetaDescription: '',
            pageKeywords: ''
        };
    });

})(angular, SPA);

